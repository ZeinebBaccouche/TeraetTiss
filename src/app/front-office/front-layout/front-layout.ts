import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';
@Component({
  imports: [Navbar, RouterOutlet],
  selector: 'app-front-layout',
  styleUrl: './front-layout.css',
  templateUrl: './front-layout.html',
})
export class FrontLayout {}
