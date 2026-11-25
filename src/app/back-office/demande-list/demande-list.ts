import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common'; // Pour formater la date
import { ProduitService } from '../../services/produit-service';
import { DemandeAchat } from '../../interfaces/demande-achat';

@Component({
  selector: 'app-demande-list',
  imports: [DatePipe], 
  templateUrl: './demande-list.html',
})
export class DemandeList implements OnInit {
  private produitService = inject(ProduitService);
  demandes = signal<DemandeAchat[]>([]);

  ngOnInit(): void {
    this.produitService.getDemandes().subscribe(data => {
      this.demandes.set(data);
    });
  }

  changerStatut(demande: DemandeAchat) {
    const nouveauStatut = demande.statut === 'En attente' ? 'Traitée' : 'En attente';
    this.produitService.mettreAJourStatutDemande(demande, nouveauStatut).subscribe(() => {
      this.demandes.update(liste => 
        liste.map(d => d.id === demande.id ? { ...d, statut: nouveauStatut } : d)
      );
    });
  }
}