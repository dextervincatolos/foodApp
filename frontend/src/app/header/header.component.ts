import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'Snack Point| Dashboard';
  appLogo: string = 'assets/images/logo2.jpg';
}
