import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BehaviorSubject, debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../core/services/modules/auth.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-nav-menu-admin',
  standalone: true,
  imports: [CommonModule, MenuModule],
  templateUrl: './nav-menu-admin.component.html',
  styleUrl: './nav-menu-admin.component.scss'
})
export class NavMenuAdminComponent {

  private authService = inject(AuthService);
  private _unsubscriber$: Subject<any> = new Subject();
  public screenWidth$: BehaviorSubject<any> = new BehaviorSubject(null);

  toglle: boolean = false;
  public innerWidth: any;
  @Output() clickOpcion = new EventEmitter();

  items: MenuItem[] = [];
  
  constructor(private router: Router) {
  }


  ngOnInit(): void {
    this.items = [
      {
          label: 'Configuracion',
          icon: 'bx bxs-cog',
          command: () => {
              // this.show(true, this.dataEdit);
          }
      },
      {
          label: 'Cerrar Sesion',
          icon: 'bx bxs-log-out-circle',
          command: () => {
              this.onSignUp();
          }
      },
      // { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      // { separator: true },
      // { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
  ];
  }
  
  addToggle() {
    this.toglle = !this.toglle;
    this.clickOpcion.emit();
  }

  onSignUp(): void {
    this.authService
      .signOut()
      .then(() => {
        this.router.navigate(['page/login']);
        toast.success('Sesion cerrada!');
      })
      .catch((error) => {
        console.error(error);
        // this.errorMessage = error.message;
      });
  }


}
