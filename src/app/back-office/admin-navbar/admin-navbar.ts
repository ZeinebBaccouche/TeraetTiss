import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-admin-navbar',
  styleUrl: './admin-navbar.css',
  templateUrl: './admin-navbar.html',
})
export class AdminNavbar {}
