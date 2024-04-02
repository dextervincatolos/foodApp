import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private titleService: Title) {}

  ngOnInit() {
      // Set the default document title
      this.titleService.setTitle('Snack Point');
  }

}
