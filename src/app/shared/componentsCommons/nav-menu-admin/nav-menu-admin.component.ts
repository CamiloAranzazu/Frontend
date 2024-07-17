import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-menu-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-menu-admin.component.html',
  styleUrl: './nav-menu-admin.component.scss'
})
export class NavMenuAdminComponent {

  toglle: boolean = false;
  @Output() clickOpcion = new EventEmitter();
  
  addToggle() {
    this.toglle = !this.toglle;
    this.clickOpcion.emit();
  }
}
