import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { LoadingService } from '../core/services/utils/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading$ | async" class="loader-overlay">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
  `]
})
export class LoaderComponent implements OnInit {
  isLoading$ = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {}
}