import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProduitService } from '../../services/produit-service';
import { ProduitItem } from '../produit-item/produit-item';
import { FormsModule } from '@angular/forms';
@Component({
  imports: [ProduitItem, FormsModule],
  selector: 'app-produit-list',
  styleUrl: './produit-list.css',
  templateUrl: './produit-list.html',
})
export class ProduitList implements OnInit {
  private produitservice = inject(ProduitService);
  
  rechercheNom = signal<string>('');
  recherchePrix = signal<string>('');

  produitsAffiches = computed(() => {
    const nom = this.rechercheNom().trim();
    const prixTexte = this.recherchePrix();
    let prixNombre: number | null = null;

    if (prixTexte !== '' && prixTexte !== null) {
      prixNombre = Number(prixTexte);
    }

    if (nom === '' && prixNombre === null) {
      return this.produitservice.produits().filter(p => p.disponible === true);
    }

    return this.produitservice.rechercher(nom, prixNombre);
  });

  ngOnInit(): void {
    if (this.produitservice.produits().length === 0) {
      this.produitservice.getProduits().subscribe();
    }
  }
}
