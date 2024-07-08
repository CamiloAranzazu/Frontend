import { CommonModule, DOCUMENT } from '@angular/common';
import { afterNextRender, Component, Inject, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../core/services/localStorage.service';


@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, TagModule, BadgeModule, MenuModule, ToastModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss',
  providers: [MessageService]
})
export class NavMenuComponent implements OnInit {
  menu1: boolean = false;
  nameCompany: string = '';

  productsCar: any[] = [];
  categories: any[] = [];

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private messageService: MessageService,
    @Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService
  ) { 

    this.categories = [ 
      {id: 1, nombre: 'TODOS LOS PRODUCTOS', nombrePegado: 'TODOS-LOS-PRODUCTOS'},
      {id: 1, nombre: 'CAMISETAS', nombrePegado: 'CAMISETAS'},
      {id: 2, nombre: 'SUDADERAS', nombrePegado: 'SUDADERAS'},
      {id: 3, nombre: 'COMBO X3 SUDADERAS PREMIUM', nombrePegado: 'COMBO-X3-SUDADERAS-PREMIUM'} 
    ]
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nameCompany = params['nameCompany'];
      // metodo pára traer compania datos 
      this.getCompany(this.nameCompany);
    });
  }

  getCompany(nameCompany: string) {

  }

  getProductsLocalStorage(nameCompany: string): number {
    let count: number = 0;
    let products = this.localStorageService.getLocalStorageProductos(nameCompany);
    this.productsCar = products;
    count = products?.length;
    return count;
  }

  update() {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Producto', detail: 'Agregado Correctamente!' });
  }

  goCar() {
    if(this.productsCar.length === 0) {
      this.messageService.add({ key: 'tc', severity: 'info', summary: '', detail: 'Debes agregar minimo un producto' });
    } else {
      this.router.navigate(['/company/'+this.nameCompany+'/carrito']);
    }
  }

  gotHome(nombrePegado?: string) {
    if(nombrePegado) this.menu1 = !this.menu1;
    this.router.navigate(['/company/'+this.nameCompany+'/category/'+(nombrePegado !== undefined ? nombrePegado: 'TODOS-LOS-PRODUCTOS')]);
  }

}
