import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  // etat de chargement
  // Au chargement du dashboard, on affiche “Chargement…”
  // Quand les données sont prêtes, le dashboard s’affiche
  loading = true;

  // statistiques
  totalOrders = 0;
  pendingOrders = 0;
  successfulDeliveries = 0;
  failedDeliveries = 0;
  successRate = 0;

  activeCouriers = 0;
  ongoingDeliveries = 0;
  cancelledOrders = 0;
  todayTotal = 0;

  // donnee pour le graphique
  chartLabels: string[] = [];
  ordersData: number[] = [];
  deliveriesData: number[] = [];

  // pour pouvoir détruire l'ancien chart si besoin
  private chart: Chart | null = null;

  @ViewChild('activityChart')
  chartRef!: ElementRef<HTMLCanvasElement>;

  // période sélectionnée par l’utilisateur
  period: 'week' | 'month' = 'week';

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {

    console.log('Dashboard chargé - LocalStorage:', {
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      userEmail: localStorage.getItem('userEmail')
    });

    // Récupération des statistiques depuis le service
    this.dashboardService.getStats().subscribe(stats => {

      // Affectation des données aux variables du composant
      // Ces variables sont ensuite affichées dans le HTML
      this.totalOrders = stats.totalOrders;
      this.pendingOrders = stats.pendingOrders;
      this.successfulDeliveries = stats.successfulDeliveries;
      this.failedDeliveries = stats.failedDeliveries;
      this.successRate = stats.successRate;

      this.activeCouriers = stats.activeCouriers;
      this.ongoingDeliveries = stats.ongoingDeliveries;
      this.cancelledOrders = stats.cancelledOrders;
      this.todayTotal = stats.todayTotal;

      // données prêtes
      this.loading = false;

      // Une fois les données chargées, on charge le graphique
      this.loadChartData();
    });
  }

  /**
   * Charge les données du graphique
   * selon la période actuelle (week / month)
   */
  loadChartData(): void {

    // On demande les données au service
    const activity = this.dashboardService.getActivityStats(this.period);

    // On stocke les données reçues
    this.chartLabels = activity.labels;
    this.ordersData = activity.orders;
    this.deliveriesData = activity.deliveries;

    // On (re)dessine le graphique
    this.initChart();
  }

  /**
   * Initialisation du graphique Chart.js
   */
  initChart(): void {

    if (!this.chartRef || !this.chartRef.nativeElement) {
      console.warn('Canvas non disponible pour le chart');
      return;
    }

    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    // Détruire l'ancien chart s'il existe (bonnes pratiques)
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Commandes',
            data: this.ordersData,
            backgroundColor: 'rgba(59, 130, 246, 0.5)'
          },
          {
            label: 'Livraisons réussies',
            type: 'line',
            data: this.deliveriesData,
            borderColor: 'rgb(34, 197, 94)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  /**
   * Changement de période (semaine / mois)
   */
  changePeriod(period: 'week' | 'month'): void {
    this.period = period;
    this.loadChartData();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
