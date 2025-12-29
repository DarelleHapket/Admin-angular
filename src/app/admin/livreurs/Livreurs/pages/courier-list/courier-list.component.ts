import { Component, OnInit } from '@angular/core';
import { couriers } from '../../../../../core/models/courier.model';
import { CourierService } from '../../../../../core/services/courier.service';

@Component({
  selector: 'app-courier-list',
  templateUrl: './courier-list.component.html',
  styleUrls:['./courier-list.component.css']
})
export class CourierListComponent implements OnInit {

  // Tableau affiché dans le HTML
  couriers: couriers[] = [];

  // Injection du service
  constructor(private courierService: CourierService) {}

  // Appelé automatiquement au chargement du composant
  ngOnInit(): void {

    // On récupère les livreurs depuis le service
    this.couriers = this.courierService.getCouriers();
  }

  // Bouton SUPPRIMER
  deleteCourier(id: number) {

    // Appel de la logique métier
    this.courierService.deleteCourier(id);
  }

  // Bouton MODIFIER
  editCourier(courier: couriers) {

    // Exemple simple (plus tard → vrai formulaire)
    const newName = prompt('Nouveau nom', courier.name);

    if (newName) {
      courier.name = newName;
      this.courierService.updateCourier(courier);
    }
  }

  // Bouton DISPONIBILITÉ
  toggleAvailability(courier: couriers) {

    // Change disponible ↔ indisponible
    this.courierService.toggleAvailability(courier);
  }
}
