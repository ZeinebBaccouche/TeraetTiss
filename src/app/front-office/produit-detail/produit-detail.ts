import { Component, inject, OnInit, signal } from '@angular/core';
import { ProduitService } from '../../services/produit-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../../interfaces/produit';
import { DatePipe } from '@angular/common';
import { StarPipe } from '../../pipes/star-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [DatePipe,  StarPipe, FormsModule],
  selector: 'app-produit-detail',
  styleUrl: './produit-detail.css',
  templateUrl: './produit-detail.html',
})
export class ProduitDetail implements OnInit {
  private produitservice=inject(ProduitService);
  private activatedroute=inject(ActivatedRoute);
  private router = inject(Router);
  produit = signal<Produit | undefined>(undefined);

  ngOnInit(): void {
    let idp=this.activatedroute.snapshot.paramMap.get('id');
    if (idp){
      this.produit.set(this.produitservice.getProduitById(idp));
    }
  }

  retourliste(){
    this.router.navigate(['/produits']);
  }
  nouveauNom = signal<string>('');
  nouvelleNote = signal<number>(5);
  nouveauCommentaire = signal<string>('');

  ajouterAvis() {
    // Logique temporaire (on la fera en semaine 9)
    console.log("Avis ajouté par :", this.nouveauNom());
  }
}
