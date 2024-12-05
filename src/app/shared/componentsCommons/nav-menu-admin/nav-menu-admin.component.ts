import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BehaviorSubject, debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-menu-admin',
  standalone: true,
  imports: [CommonModule, MenuModule],
  templateUrl: './nav-menu-admin.component.html',
  styleUrl: './nav-menu-admin.component.scss'
})
export class NavMenuAdminComponent {
  private _unsubscriber$: Subject<any> = new Subject();
  public screenWidth$: BehaviorSubject<any> = new BehaviorSubject(null);

  toglle: boolean = false;
  public innerWidth: any;
  @Output() clickOpcion = new EventEmitter();

  items: MenuItem[] = [];
  
  constructor(private router: Router) {
    // fromEvent(window, 'resize')
    // .pipe(
    //   debounceTime(1000),
    //   takeUntil(this._unsubscriber$)
    // ).subscribe((evt: any) => {
    //   this._setScreenWidth(evt.target.innerWidth);
    //   // this._setMediaBreakpoint(evt.target.innerWidth);
    // });
  }

  private _setScreenWidth(width: number): void {
    this.screenWidth$.next(width);
    console.log('this.screenWidth$',this.screenWidth$);
    console.log('width',width);
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
              this.cerrarSesion();
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

  cerrarSesion() {
    this.router.navigate(['page/login']);
  }

}
