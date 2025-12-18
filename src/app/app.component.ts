import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-angular';
   testLocalStorage() {
    console.log('=== TEST LocalStorage ===');
    localStorage.setItem('test', 'valeur de test');
    console.log('test:', localStorage.getItem('test'));
    console.log('Tous les items:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      console.log(`${key}: ${localStorage.getItem(key || '')}`);
    }
  }
}
