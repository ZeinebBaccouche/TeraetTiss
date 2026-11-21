import { Routes } from '@angular/router';
import { ProduitList } from './front-office/produit-list/produit-list';
import { ProduitDetail } from './front-office/produit-detail/produit-detail';
import { FrontLayout } from './front-office/front-layout/front-layout';
import { Apropos } from './front-office/apropos/apropos';
import { AdminLayout } from './back-office/admin-layout/admin-layout';
import { Login } from './back-office/login/login';

export const routes: Routes = [
    {
        path: '', title: 'la partie front', component: FrontLayout,
        children: [
            { path: 'produits', title: 'liste des produit', component: ProduitList },
            { path: 'produit/:id', title: 'Produit choisi', component: ProduitDetail },
            { path: 'apropos' , title:' a propos', component: Apropos},
            { path: '', redirectTo: 'produits', pathMatch: 'full' },
        ]
    },
    {
        path:'admin',title: 'Espace admin', component: AdminLayout,
        children: [
            { path:'login', title: 'sautentifier' , component: Login},
            { path: '' , redirectTo: 'login', pathMatch:'full'}

        ]
    },
    { path: '**', redirectTo: 'produits' }
];
