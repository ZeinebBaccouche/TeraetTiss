import { Avis } from "./avis";

export interface Produit {
    id: string;
    nom: string;
    description: string;
    prix: number;
    categorie: string;
    imageUrl: string;
    artisan: string;
    regionOrigine: string;
    stock: number;
    disponible: boolean;
    dateAjout: string;
    avis: Avis[];
}
