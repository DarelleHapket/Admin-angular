import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DashboardService } from '../admin/dashboard/dashboard.service';
import { Chart } from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,                    // ← Obligatoire pour utiliser "imports"
  imports: [CommonModule],             // ← CommonModule inclut DatePipe, ngIf, ngFor...
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, AfterViewInit {

  loading = true;
  today = new Date();

  // Stats (mêmes que dashboard)
  totalOrders = 0;
  pendingOrders = 0;
  successfulDeliveries = 0;
  failedDeliveries = 0;
  successRate = 0;
  activeCouriers = 0;
  ongoingDeliveries = 0;
  cancelledOrders = 0;
  todayTotal = 0;

  private chart!: Chart;

  @ViewChild('activityChart') chartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe(stats => {
      this.totalOrders = stats.totalOrders;
      this.pendingOrders = stats.pendingOrders;
      this.successfulDeliveries = stats.successfulDeliveries;
      this.failedDeliveries = stats.failedDeliveries;
      this.successRate = stats.successRate;
      this.activeCouriers = stats.activeCouriers;
      this.ongoingDeliveries = stats.ongoingDeliveries;
      this.cancelledOrders = stats.cancelledOrders;
      this.todayTotal = stats.todayTotal;

      this.loading = false;

      // Initialiser le graphique après que le canvas soit disponible
      setTimeout(() => this.initChart(), 100);
    });
  }

  ngAfterViewInit(): void {
    // Rien de spécial ici pour l'instant
  }

  initChart(): void {
    if (!this.chartRef || !this.chartRef.nativeElement) return;

    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [
          {
            label: 'Commandes',
            data: [120, 190, 300, 250, 220, 170, 200],
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1
          },
          {
            label: 'Livraisons réussies',
            type: 'line',
            data: [100, 160, 260, 210, 200, 150, 180],
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  exportPDF(): void {
    const element = document.querySelector('.max-w-7xl') as HTMLElement;

    if (!element) {
      console.error('Zone à exporter non trouvée (.max-w-7xl)');
      return;
    }

    // Petit délai pour laisser Chart.js terminer son rendu
    setTimeout(() => {
      html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = pdfWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save(`rapport-logistique-${this.today.toISOString().split('T')[0]}.pdf`);
      }).catch(err => {
        console.error('Erreur html2canvas :', err);
      });
    }, 600);
  }

  exportExcel(): void {
    const data = [
      ["Indicateur", "Valeur", "Date de génération"],
      ["Commandes totales", this.totalOrders, this.today.toLocaleDateString()],
      ["Commandes à livrer", this.pendingOrders, ""],
      ["Livraisons réussies", this.successfulDeliveries, ""],
      ["Livraisons échouées", this.failedDeliveries, ""],
      ["Taux de réussite", `${this.successRate}%`, ""],
      ["Livreurs actifs", this.activeCouriers, ""],
      ["Livraisons en cours", this.ongoingDeliveries, ""],
      ["Commandes annulées", this.cancelledOrders, ""],
      ["Total aujourd’hui", this.todayTotal, ""]
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rapport Logistique");
    XLSX.writeFile(wb, `rapport-logistique-${this.today.toISOString().split('T')[0]}.xlsx`);
  }
}