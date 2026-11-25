import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { form, minLength, required } from '@angular/forms/signals';
import { FormRoot,FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
interface Identifiants {
  username: string;
  password: string;
}

@Component({
  imports: [FormRoot,FormField],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private authservice = inject(Auth);
   private router = inject(Router); 
   
  readonly loginModel = signal<Identifiants>({
    username: '',
    password: ''
  });
  readonly loginForm = form(this.loginModel, (path) => {
    required(path.username, { message: "Le nom d'utilisateur est obligatoire" });
    minLength(path.username, 3, { message: "Minimum 3 caractères" });

    required(path.password, { message: "Le mot de passe est obligatoire" });
    minLength(path.password, 4, { message: "Minimum 4 caractères" });
  });
  messageErreur = signal<string>('');
  messageSucces = signal<string>('');

   onSubmit() {
    this.messageErreur.set('');
    this.messageSucces.set('');
    const donnees = this.loginModel(); 
    this.authservice.seConnecter(donnees.username, donnees.password).subscribe({
      next:(adminsTrouves)=>{
        if(adminsTrouves.length>0){
          this.authservice.estConnecte.set(true);
          this.messageSucces.set('connexion reussie');
          this.router.navigate(['/admin/dashboard']);
        }else {
          this.messageErreur.set('Nom d\'utilisateur ou mot de passe incorrect.');
        }
      }
    });
  }

}
