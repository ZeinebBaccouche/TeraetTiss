import { Component, inject, OnInit, signal } from '@angular/core';
import { ProduitService } from '../../services/produit-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../../interfaces/produit';
import { DatePipe } from '@angular/common';
import { StarPipe } from '../../pipes/star-pipe';
import { FormsModule } from '@angular/forms';
import { Avis } from '../../interfaces/avis';
import { DemandeAchat } from '../../interfaces/demande-achat';
import { form, required, pattern, FormField, FormRoot, validate } from '@angular/forms/signals';


interface CommandeModel {
  nomClient: string;
  emailClient: string;
  quantite: number;
}

@Component({
  imports: [DatePipe,  StarPipe, FormsModule,FormField, FormRoot],
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

  onAjouterAvis() {
    const p=this.produit();
    if (!p) return;

    const nouvelAvis : Avis ={
      id: Date.now().toString(),
      nomClient: this.nouveauNom(),
      note: this.nouvelleNote(),
      commentaire: this.nouveauCommentaire(),
      date: new Date().toLocaleDateString('fr-CA')
    };
    const produitModifie: Produit = {
    ...p,
    avis: [...p.avis, nouvelAvis]
  };
    this.produitservice.MettreAJourProduit(produitModifie).subscribe({
      next: (produitSauvegarde) => {
      this.produit.set(produitSauvegarde);
        this.nouveauCommentaire.set('');
        this.nouveauNom.set('');
        this.nouvelleNote.set(5);
      }
    })
  }

  commandeModel = signal<CommandeModel>({
    nomClient: '',
    emailClient: '',
    quantite: 1
  });

  commandeForm = form(this.commandeModel, (path) => {
    required(path.nomClient, { message: 'Le nom est obligatoire' });
    pattern(path.nomClient, /^[a-zA-Z\s-]+$/, { message: 'Le nom ne doit contenir que des lettres' });
    required(path.emailClient, { message: 'L\'email est obligatoire' });
    pattern(path.emailClient, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Format d\'email invalide' });
    required(path.quantite, { message: 'La quantité est obligatoire' });
    validate(path.quantite, (ctx) => {
    const p = this.produit(); 
    if (p && ctx.value() > p.stock) {
      return { kind: 'error', message: `Stock insuffisant (max ${p.stock})` };
    }
    return null; 
  });
  });

  afficherFormulaireCommande = signal<boolean>(false);
  messageSucces = signal<string>('');
  commander() {
    const p = this.produit();
    if (!p) return;

    const donnees = this.commandeModel(); 
     const nouveauStock = p.stock - donnees.quantite;
    const nouvelleDemande: DemandeAchat = {
      nomClient: donnees.nomClient,
      emailClient: donnees.emailClient,
      produitId: p.id,
      nomProduit: p.nom,
      quantite: donnees.quantite,
      prixTotal: p.prix * donnees.quantite,
      dateDemande: new Date().toISOString().split('T')[0],
      statut: 'En attente',
      id: ''
    };

    this.produitservice.ajouterDemande(nouvelleDemande).subscribe(() => {
      this.produitservice.mettreAJourStock(p.id, nouveauStock).subscribe(() => {
      this.produit.set({ ...p, stock: nouveauStock });
      this.messageSucces.set('Votre commande a bien été enregistrée !');
      this.commandeModel.set({ nomClient: '', emailClient: '', quantite: 1 });
      this.afficherFormulaireCommande.set(false);
    });
  });
}
}