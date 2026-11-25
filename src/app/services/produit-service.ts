import { computed, inject, Service, signal } from '@angular/core';
import { Produit } from '../interfaces/produit';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DemandeAchat } from '../interfaces/demande-achat';
const URL = 'http://localhost:3000/produits'
const URL_demandes = 'http://localhost:3000/demandesAchat'
@Service()
export class ProduitService {
    //private produitssignal = signal<Produit[]>([
    //     {
    //       id: 'p1',
    //       nom: 'Vase en poterie de Nabeul',
    //       description: 'Vase artisanal en terre cuite, peint à la main par des artisans de Nabeul.',
    //       prix: 45.5,
    //       categorie: 'Poterie',
    //       imageUrl: '/images/vase.avif',
    //       artisan: 'Mohamed Ben Salem',
    //       regionOrigine: 'Nabeul',
    //       stock: 12,
    //       disponible: true,
    //       dateAjout: '2026-01-10',
    //       avis: [
    //         { id: 'a1', nomClient: 'Sarra', note: 5, commentaire: 'Magnifique vase, très bien emballé !', date: '2026-01-15' },
    //         { id: 'a2', nomClient: 'Yassine', note: 4, commentaire: 'Très belle finition, un peu petit.', date: '2026-01-20' }
    //       ]
    //     },
    //     {
    //       id: 'p5',
    //       nom: 'Set de 6 bols en céramique',
    //       description: 'Petits bols artisanaux émaillés à la main, parfaits pour le café ou le thé',
    //       prix: 40,
    //       categorie: 'Poterie',
    //       imageUrl: '/images/bol.jfif',
    //       artisan: 'Hassan Mabrouk',
    //       regionOrigine: 'Tunis',
    //       stock: 8,
    //       disponible: true,
    //       dateAjout: '2026-03-05',
    //       avis: []
    //     },
    //     {
    //       id: 'p9',
    //       nom: 'Assiette décorative peinte',
    //       description: 'Assiette en céramique ornée de motifs géométriques colorés.',
    //       prix: 15,
    //       categorie: 'Poterie',
    //       imageUrl: '/images/assiette.jfif',
    //       artisan: 'Nizar Jaziri',
    //       regionOrigine: 'Nabeul',
    //       stock: 0,
    //       disponible: false,
    //       dateAjout: '2026-03-15',
    //       avis: []
    //     },

    //     {
    //       id: 'p2',
    //       nom: 'Tapis tissé berbère',
    //       description: 'Tapis traditionnel tissé main en laine naturelle, motifs berbères.',
    //       prix: 180,
    //       categorie: 'Tissage',
    //       imageUrl: '/images/tapis.jfif',
    //       artisan: 'Fatma Trabelsi',
    //       regionOrigine: 'Kairouan',
    //       stock: 5,
    //       disponible: true,
    //       dateAjout: '2026-02-03',
    //       avis: [
    //         { id: 'a3', nomClient: 'Leila', note: 5, commentaire: 'Superbe tapis, couleurs vives.', date: '2026-02-10' }
    //       ]
    //     },
    //     {
    //       id: 'p6',
    //       nom: 'Foulard tissé en soie',
    //       description: 'Foulard léger aux motifs traditionnels, tissé à la main.',
    //       prix: 65,
    //       categorie: 'Tissage',
    //       imageUrl: '/images/foulard.jfif',
    //       artisan: 'Monia Belhaj',
    //       regionOrigine: 'Mahdia',
    //       stock: 15,
    //       disponible: true,
    //       dateAjout: '2026-03-08',
    //       avis: []
    //     },
    //     {
    //       id: 'p10',
    //       nom: 'Coussin brodé main',
    //       description: 'Coussin en lin avec une broderie traditionnelle tunisienne.',
    //       prix: 40,
    //       categorie: 'Tissage',
    //       imageUrl: '/images/coussin.jpg',
    //       artisan: 'Salma Trabelsi',
    //       regionOrigine: 'Kairouan',
    //       stock: 20,
    //       disponible: true,
    //       dateAjout: '2026-03-18',
    //       avis: []
    //     },
    //     {
    //       id: 'p3',
    //       nom: 'Bracelet en argent fait main',
    //       description: 'Bracelet en argent ciselé, fabriqué artisanalement.',
    //       prix: 100,
    //       categorie: 'Bijoux',
    //       imageUrl: '/images/baracelet.webp',
    //       artisan: 'Ali Gharbi',
    //       regionOrigine: 'Sfax',
    //       stock: 0,
    //       disponible: false,
    //       dateAjout: '2026-02-18',
    //       avis: []
    //     },
    //     {
    //       id: 'p7',
    //       nom: 'Boucles d\'oreilles en corail',
    //       description: 'Boucles d\'oreilles artisanales en argent et corail naturel.',
    //       prix: 120,
    //       categorie: 'Bijoux',
    //       imageUrl: '/images/boucle.jpg',
    //       artisan: 'Rym Khelifi',
    //       regionOrigine: 'Bizerte',
    //       stock: 3,
    //       disponible: true,
    //       dateAjout: '2026-03-10',
    //       avis: []
    //     },
    //     {
    //       id: 'p11',
    //       nom: 'Bague en argent massif',
    //       description: 'Bague minimaliste en argent, forgée à la main.',
    //       prix: 90,
    //       categorie: 'Bijoux',
    //       imageUrl: '/images/bague.avif',
    //       artisan: 'Karim Gharbi',
    //       regionOrigine: 'Sousse',
    //       stock: 10,
    //       disponible: true,
    //       dateAjout: '2026-03-20',
    //       avis: []
    //     },
    //     {
    //       id: 'p4',
    //       nom: 'Savon naturel à l\'huile d\'olive',
    //       description: 'Savon artisanal à l\'huile d\'olive et à la lavande.',
    //       prix: 12,
    //       categorie: 'Cosmétiques',
    //       imageUrl: '/images/savon.png',
    //       artisan: 'Salma Bouazizi',
    //       regionOrigine: 'Sousse',
    //       stock: 40,
    //       disponible: true,
    //       dateAjout: '2026-03-01',
    //       avis: [
    //         { id: 'a4', nomClient: 'Nour', note: 4, commentaire: 'Très doux pour la peau.', date: '2026-03-05' }
    //       ]
    //     },
    //     {
    //       id: 'p8',
    //       nom: 'Huile d\'argan pure',
    //       description: 'Flacon d\'huile d\'argan 100% naturelle, pressée à froid.',
    //       prix: 35,
    //       categorie: 'Cosmétiques',
    //       imageUrl: '/images/huile.webp',
    //       artisan: 'Amel Ben Ammar',
    //       regionOrigine: 'Sfax',
    //       stock: 50,
    //       disponible: true,
    //       dateAjout: '2026-03-12',
    //       avis: []
    //     },
    //     {
    //       id: 'p12',
    //       nom: 'Savon à la rose',
    //       description: 'Savon artisanal à l\'eau de rose, doux pour la peau.',
    //       prix: 15,
    //       categorie: 'Cosmétiques',
    //       imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400',
    //       artisan: 'Nour Bouazizi',
    //       regionOrigine: 'Nabeul',
    //       stock: 30,
    //       disponible: true,
    //       dateAjout: '2026-03-22',
    //       avis: []
    //     }
    //   ]);
    // getProduitById(id: string): Produit | undefined {
    //     return this.produitssignal().find(p => p.id === id);
    // }

    private readonly _http = inject(HttpClient);
    private readonly _produitssignal = signal<Produit[]>([]);
    produits = this._produitssignal.asReadonly();
    getProduits(): Observable<Produit[]> {
        return this._http.get<Produit[]>(URL).pipe(
            tap(p => this._produitssignal.set(p))
        );
    }
    getProduitById(id: string): Produit | undefined {
        return this._produitssignal().find(p => p.id === id);
    }

    rechercher(nomRecherche: string, prixMax: number | null): Produit[] {
        return this._produitssignal().filter(p => {
            const matchNom = p.nom.toLowerCase().includes(nomRecherche.toLowerCase());
            const matchPrix = prixMax === null || p.prix <= prixMax;
            return matchNom && matchPrix;
        });
    }

    ajouterDemande(demande: DemandeAchat): Observable<DemandeAchat> {
        return this._http.post<DemandeAchat>(URL_demandes, demande);
    }

    getDemandes(): Observable<DemandeAchat[]> {
        return this._http.get<DemandeAchat[]>(URL_demandes);
    }

    mettreAJourStatutDemande(demande: DemandeAchat, nouveauStatut: string): Observable<DemandeAchat> {
        const demandeModifiee = { ...demande, statut: nouveauStatut };
        return this._http.put<DemandeAchat>(`${URL_demandes}/${demande.id}`, demandeModifiee);
    }

    MettreAJourProduit(produit: Produit): Observable<Produit> {
        return this._http.put<Produit>(`${URL}/${produit.id}`, produit).pipe(
            tap(data => {
                this._produitssignal.update(produits => produits.map(p => p.id === data.id ? data : p)
                );
            })
        );
    }

    deleteProduit(id: string): Observable<void> {
        return this._http.delete<void>(`${URL}/${id}`).pipe(
            tap(() => this._produitssignal.update(allProducts =>
                allProducts.filter(p => p.id !== id)
            ))
        );
    }

    ajouterProduit(produit: Produit): Observable<Produit> {
        return this._http.post<Produit>(URL, produit).pipe(
            tap(data => {
                this._produitssignal.update(produits => [...produits, data]);
            })
        );
    }

    mettreAJourStock(produitId: string, nouvelleQuantite: number): Observable<Produit> {
        const produit = this._produitssignal().find(p => p.id === produitId);
        const produitModifie = { ...produit, stock: nouvelleQuantite };
        return this._http.put<Produit>(`${URL}/${produitId}`, produitModifie).pipe(
            tap(data => {
                this._produitssignal.update(produits =>
                    produits.map(p => p.id === produitId ? data : p)
                );
            })
        );
    }



}


