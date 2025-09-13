

import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  collapsed = true;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  closeSidebarOnMobile() {
    if (window.innerWidth <= 768) {
      this.collapsed = true;
    }
  }
}
