import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavMenuAdminComponent } from '../../../shared/componentsCommons/nav-menu-admin/nav-menu-admin.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, NavMenuAdminComponent, RouterOutlet],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss'
})
export class AdministradorComponent implements OnInit, OnDestroy {

  menu: any[] = [
    {nombre: 'DASBOARD', url: '/page/administrador/dasboardDeEnvio', icon: 'bx bxs-dashboard', permiso: 'dasboardDeEnvio'},
    {nombre: 'ORDENES DE ENVIO', url: '/page/administrador/ordenDeEnvio', icon: 'bx bxs-shopping-bag-alt', permiso: 'dasboardDeEnvio'},
    {nombre: 'CONTABILIDAD DE ENVIO', url: '/page/administrador/contabilidadDeEnvio', icon: 'bx bxs-doughnut-chart', permiso: 'dasboardDeEnvio'}
  ]

  status = false;

  public subscriber: Subscription | any;

  urlRouter: string = '';

  constructor(private router: Router, private ar: ActivatedRoute) {
    this.urlRouter = router.url;
  }
  
  ngOnInit () {
    this.subscriber = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
       this.urlRouter = event['url'];
    });
  }

  ngOnDestroy () {
    this.subscriber?.unsubscribe();
 }

  addToggle() {
    this.status = !this.status;       
  }


  goRouter(ruta: string) {
    this.router.navigate([ruta]);
  }

  
}
