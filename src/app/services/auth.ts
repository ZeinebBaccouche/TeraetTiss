import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Admin } from '../interfaces/admin';
import { Observable, tap } from 'rxjs';
const URL = 'http://localhost:3000/admins';
@Service()
export class Auth {
    private readonly _http = inject(HttpClient);
    estConnecte = signal<boolean>(false);
    usernameConnecte = signal<string>('');

    seConnecter(username: string, password: string): Observable<Admin[]> {
        return this._http.get<Admin[]>(
            `${URL}?username=${username}&password=${password}`
        ).pipe(
            tap(adminsTrouves => {
                if (adminsTrouves.length > 0) {
                    this.estConnecte.set(true);
                    this.usernameConnecte.set(adminsTrouves[0].username);
                } else {
                    this.estConnecte.set(false);
                }
            })
        );
    }
    deconnecter() {
        this.estConnecte.set(false);
        this.usernameConnecte.set('');
    }



}
