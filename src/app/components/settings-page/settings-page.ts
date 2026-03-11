import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './settings-page.html',
  styleUrls: ['./settings-page.scss']
})
export class SettingsPageComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    
    // Globally update the app theme via attribute injection
    const htmlEl = document.documentElement;
    if (this.isDarkMode) {
      htmlEl.setAttribute('data-theme', 'dark');
    } else {
      htmlEl.removeAttribute('data-theme');
    }
  }
}
