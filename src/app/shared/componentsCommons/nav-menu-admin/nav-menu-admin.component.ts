import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-menu-admin',
  standalone: true,
  imports: [],
  templateUrl: './nav-menu-admin.component.html',
  styleUrl: './nav-menu-admin.component.scss'
})
export class NavMenuAdminComponent {

  @Output() clickOpcion = new EventEmitter();
  
  addToggle() {
    this.clickOpcion.emit();
  }
}
