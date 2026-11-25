import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ProduitService } from '../../services/produit-service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, FormsModule], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private produitService = inject(ProduitService);
  
  produits = this.produitService.produits; 

 
  texteRecherche: string = '';

  ngOnInit(): void {
    this.produitService.getProduits().subscribe();
  }

  // 👇 La méthode classique de filtrage
  getProduitsFiltres() {
    const recherche = this.texteRecherche.toLowerCase().trim();
    if (!recherche) {
      return this.produits(); // Si c'est vide, on renvoie tout
    }
    
    // Sinon on filtre
    return this.produits().filter(p => 
      (p.nom).toLowerCase().includes(recherche) || 
      (p.categorie).toLowerCase().includes(recherche)
    );
  }

  onDelete(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.produitService.deleteProduit(id).subscribe();
    }
  }
}