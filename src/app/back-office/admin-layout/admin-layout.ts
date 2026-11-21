import { Component } from '@angular/core';
import { AdminNavbar } from '../admin-navbar/admin-navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [AdminNavbar, RouterOutlet],
  selector: 'app-admin-layout',
  styleUrl: './admin-layout.css',
  templateUrl: './admin-layout.html',
})
export class AdminLayout {}
