import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../../services/produit-service';
import { Produit } from '../../interfaces/produit';
import { form, FormRoot, FormField, required, minLength, min, maxLength } from '@angular/forms/signals';

@Component({
  imports: [FormField,FormRoot],
  selector: 'app-produit-form',
  styleUrl: './produit-form.css',
  templateUrl: './produit-form.html',
})
export class ProduitForm implements OnInit{
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private produitservice = inject(ProduitService);
  produit = signal<Produit | undefined>(undefined);

  readonly produitModel = signal<Produit>({
    id: '',
    nom: '',
    description: '',
    prix: 0,
    categorie: '',
    imageUrl: '',
    artisan: '',
    regionOrigine: '',
    stock: 0,
    disponible: true,
    dateAjout: '',
    avis: []
  });

  readonly produitForm = form(this.produitModel, (path) => {
  required(path.nom, { message: 'Le nom est obligatoire' });
  minLength(path.nom, 3, { message: 'Le nom doit contenir au moins 3 caractères' });
  maxLength(path.nom, 50, { message: 'Le nom ne doit pas dépasser 50 caractères' });
  required(path.prix, { message: 'Le prix est obligatoire' });
  min(path.prix, 0.1, { message: 'Le prix doit être supérieur à 0' });
  required(path.categorie, { message: 'La catégorie est obligatoire' });
  min(path.stock, 0, { message: 'Le stock ne peut pas être négatif' });
});


  messageErreur = signal<string>('');
  isEditMode = signal<boolean>(false);

  ngOnInit(): void {
  const id = this.activatedRoute.snapshot.paramMap.get('id');
  if (id) {
    this.isEditMode.set(true);
    const p = this.produitservice.getProduitById(id);
    if (p) {
      this.produitModel.set(p);
    } else {
      this.messageErreur.set('Produit introuvable.');
        } 
    }
  }

onSubmit() {
    const data = this.produitModel();
    if (this.isEditMode()) {
      this.produitservice.MettreAJourProduit(data).subscribe(() => {
        this.router.navigate(['/admin/dashboard']);
      });
    } else {
      data.dateAjout = new Date().toDateString();
      this.produitservice.ajouterProduit(data).subscribe(() => {
        this.router.navigate(['/admin/dashboard']);
      });
    }
  }

onCancel() {
    this.router.navigate(['/admin/dashboard']);
  }
}
