import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-admin-navbar',
  styleUrl: './admin-navbar.css',
  templateUrl: './admin-navbar.html',
})
export class AdminNavbar {
  private auth = inject(Auth);
  private router = inject(Router);

  seDeconnecter() {
    this.auth.deconnecter(); 
    this.router.navigate(['/admin/login']); 
  }
}
