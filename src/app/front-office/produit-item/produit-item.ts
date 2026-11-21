import { Component, Input, input } from '@angular/core';
import { Produit } from '../../interfaces/produit';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-produit-item',
  styleUrl: './produit-item.css',
  templateUrl: './produit-item.html',
})
export class ProduitItem {
  produit= input.required<Produit>();
}
