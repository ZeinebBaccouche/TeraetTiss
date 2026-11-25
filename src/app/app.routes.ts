import { Routes } from '@angular/router';
import { ProduitList } from './front-office/produit-list/produit-list';
import { ProduitDetail } from './front-office/produit-detail/produit-detail';
import { FrontLayout } from './front-office/front-layout/front-layout';
import { Apropos } from './front-office/apropos/apropos';
import { AdminLayout } from './back-office/admin-layout/admin-layout';
import { Login } from './back-office/login/login';
import { Dashboard } from './back-office/dashboard/dashboard';
import { ProduitForm } from './back-office/produit-form/produit-form';
import { authGuard } from './guards/auth-guard';
import { DemandeList } from './back-office/demande-list/demande-list';
import { MotDePasse } from './back-office/mot-de-passe/mot-de-passe';

export const routes: Routes = [
    {
        path: '', title: 'la partie front', component: FrontLayout,
        children: [
            { path: 'produits', title: 'liste des produit', component: ProduitList },
            { path: 'produit/:id', title: 'Produit choisi', component: ProduitDetail },
            { path: 'apropos', title: ' a propos', component: Apropos },
            { path: '', redirectTo: 'produits', pathMatch: 'full' },
        ]
    },
    {
        path: 'admin', title: 'Espace admin', component: AdminLayout,
        children: [
            { path: 'login', title: 'sautentifier', component: Login },
            { path: 'dashboard', title: 'tableau de bord', component: Dashboard, canActivate: [authGuard] },
            { path: 'edit-produit/:id', title: 'Modifier produit', component: ProduitForm, canActivate: [authGuard] },
            { path: 'add-produit', title: 'Ajouter produit', component: ProduitForm, canActivate: [authGuard] },
            { path: 'demandes', title: 'Demandes d\'achat', component: DemandeList, canActivate: [authGuard] },
            {path: 'mot-de-passe', title: 'Modifier mot de passe', component: MotDePasse, canActivate: [authGuard]
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' }

        ]
    },
    { path: '**', redirectTo: 'produits' }
];
