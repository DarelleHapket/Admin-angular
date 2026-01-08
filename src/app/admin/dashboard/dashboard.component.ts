import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  // etat de chargement
  // Au chargement du dashboard, on affiche "Chargement…"
  // Quand les données sont prêtes, le dashboard s'affiche
  loading = true;

  // Date actuelle pour l'affichage
  currentDate = new Date();

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
    private dashboardService: DashboardService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      console.log('Dashboard chargé - LocalStorage:', {
        isLoggedIn: localStorage.getItem('isLoggedIn'),
        userEmail: localStorage.getItem('userEmail')
      });
    }

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
            backgroundColor: (context: any) => {
              const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
              gradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');
              return gradient;
            },
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 2,
            borderRadius: 8,
            hoverBackgroundColor: 'rgba(59, 130, 246, 1)',
            hoverBorderColor: 'rgb(37, 99, 235)',
            hoverBorderWidth: 3
          },
          {
            label: 'Livraisons réussies',
            type: 'line',
            data: this.deliveriesData,
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: 'rgb(16, 185, 129)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: 'rgb(5, 150, 105)',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              font: {
                size: 13,
                weight: 'bold',
                family: "'Inter', system-ui, -apple-system, sans-serif"
              },
              color: '#374151'
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(59, 130, 246, 0.5)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            usePointStyle: true,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
            callbacks: {
              label: function(context: any) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toLocaleString('fr-FR');
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            border: {
              display: false
            },
            ticks: {
              font: {
                size: 12
              },
              color: '#6b7280'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(107, 114, 128, 0.1)'
            },
            border: {
              display: false
            },
            ticks: {
              font: {
                size: 12
              },
              color: '#6b7280',
              callback: function(value: any) {
                return value.toLocaleString('fr-FR');
              }
            }
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart'
        }
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
