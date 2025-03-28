import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private theme = "dark";
  private darkThemeCorrect = "#2c7f21";
  private darkThemeIncorrect = "#822311";
  private lightThemeCorrect = "lightgreen";
  private lightThemeIncorrect = "lightcoral";

  constructor() {}

  ngOnInit(): void {
    console.log("started successfully")
  }
}
