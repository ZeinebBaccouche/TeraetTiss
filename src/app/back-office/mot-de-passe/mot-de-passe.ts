import { Component, inject, signal } from '@angular/core';
import { form, FormRoot, FormField, required, minLength, validate } from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../services/auth';

interface MotDePasseModel {
  ancienMdp: string;
  nouveauMdp: string;
  confirmationMdp: string;
}

@Component({
  selector: 'app-mot-de-passe',
  imports: [FormRoot, FormField],
  templateUrl: './mot-de-passe.html',
})
export class MotDePasse {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private readonly URL = 'http://localhost:3000/admins';

  motDePasseModel = signal<MotDePasseModel>({
    ancienMdp: '',
    nouveauMdp: '',
    confirmationMdp: ''
  });

  motDePasseForm = form(this.motDePasseModel, (path) => {
    required(path.ancienMdp, { message: 'L\'ancien mot de passe est obligatoire' });

    required(path.nouveauMdp, { message: 'Le nouveau mot de passe est obligatoire' });
    minLength(path.nouveauMdp, 4, { message: 'Le mot de passe doit contenir au moins 4 caractères' });

    required(path.confirmationMdp, { message: 'La confirmation est obligatoire' });
    validate(path.confirmationMdp, (ctx) => {
      if (ctx.value() !== this.motDePasseModel().nouveauMdp) {
        return { kind: 'passwordMismatch', message: 'Les mots de passe ne correspondent pas' };
      }
      return undefined;
    });
  });

  messageErreur = signal<string>('');
  messageSucces = signal<string>('');

  changerMotDePasse() {
    this.messageErreur.set('');
    this.messageSucces.set('');

    const donnees = this.motDePasseModel();
    this.http.get<any[]>(`${this.URL}?username=${this.auth.usernameConnecte()}&password=${donnees.ancienMdp}`).subscribe({
      next: (admins) => {
        if (admins.length === 0) {
          this.messageErreur.set('L\'ancien mot de passe est incorrect.');
          return;
        }
        const adminModifie = { ...admins[0], password: donnees.nouveauMdp };

        this.http.put(`${this.URL}/${adminModifie.id}`, adminModifie).subscribe(() => {
          this.messageSucces.set('Votre mot de passe a été modifié avec succès !');
          this.motDePasseModel.set({ ancienMdp: '', nouveauMdp: '', confirmationMdp: '' });
        });
      },
      error: () => this.messageErreur.set('Erreur de communication avec le serveur.')
    });
  }
}