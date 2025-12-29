import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Article {
  produit: string;
  quantite: number;
  prix: number;
}

interface Client {
  nom: string;
  telephone: string;
  email?: string;
}

interface Livreur {
  id: number;
  nom: string;
  telephone: string;
}

interface Order {
  id: number;
  numero: string;
  statut: 'Réservée' | 'À livrer' | 'Livrée' | 'Échec';
  date: string;
  montant: number;
  paiement?: string;
  adresseLivraison: string;
  zone?: string;
  notes?: string;
  client: Client;
  livreur?: Livreur;
  articles: Article[];
}


@Component({
  selector: 'app-commandes-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commandes-detail.component.html',
  styleUrl: './commandes-detail.component.css'
})
export class CommandesDetailComponent implements OnInit {

  order: Order | null = null;
  loading = false; // Pas de vrai chargement puisque données simulées

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // On récupère l'ID depuis l'URL (ex: /commandes/123)
    const idParam = this.route.snapshot.paramMap.get('id');
    const orderId = idParam ? +idParam : 1;

    // Données simulées (mock data) - tu peux changer les valeurs comme tu veux
    this.order = {
      id: orderId,
      numero: `CMD-${orderId}025`,
      statut: 'À livrer', // Change ici pour tester les différents statuts
      date: '2025-12-29T14:30:00',
      montant: 18500,
      paiement: 'Orange Money',
      adresseLivraison: 'Cocody Angré, près de la pharmacie Saint Jean',
      zone: 'Cocody',
      notes: 'Client veut livraison avant 18h. Appeler 10 min avant arrivée.',
      client: {
        nom: 'Kouadio Amenan',
        telephone: '07 77 88 99 00',
        email: 'amenan@example.com'
      },
      livreur: {
        id: 5,
        nom: 'Traoré Moussa',
        telephone: '01 02 03 04 05'
      },
      // Si tu veux tester sans livreur, commente la ligne ci-dessus et décommente celle-ci :
      // livreur: undefined,

      articles: [
        { produit: 'Riz parfumé 5kg', quantite: 2, prix: 4500 },
        { produit: 'Huile végétale 1L', quantite: 1, prix: 1800 },
        { produit: 'Tomates en boîte', quantite: 3, prix: 800 },
        { produit: 'Poulet frais 1kg', quantite: 1, prix: 5000 }
      ]
    };
  }

  goBack(): void {
    this.router.navigate(['/admin/commandes']);
  }

  // Simulation de changement de statut (seulement en front pour l'instant)
  updateStatus(newStatus: 'Livrée' | 'Échec'): void {
    if (!this.order) return;

    if (confirm(`Passer la commande au statut "${newStatus}" ?`)) {
      this.order.statut = newStatus;
      alert(`Statut changé en : ${newStatus} (simulation)`);
    }
  }

  openAssignLivreurDialog(): void {
    alert('Quand tu auras l\'API, on connectera l\'assignation ici !\nPour l\'instant, simulation OK.');
  }

  unassignLivreur(): void {
    if (!this.order || !this.order.livreur) return;

    if (confirm('Retirer le livreur de cette commande ?')) {
      this.order.livreur = undefined;
      alert('Livreur retiré (simulation)');
    }
  }
}
