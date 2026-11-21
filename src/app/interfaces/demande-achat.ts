export interface DemandeAchat {
    id: string;
    nomClient: string;
    emailClient: string;
    produitId: string;
    nomProduit: string;
    quantite: number;
    prixTotal: number;
    dateDemande: string;
    statut: 'En attente' | 'Traitée' | 'Annulée';
}
