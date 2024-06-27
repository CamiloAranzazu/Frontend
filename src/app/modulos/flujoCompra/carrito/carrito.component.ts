import { Component } from '@angular/core';
import { Producto } from '../../../core/interfaces/product';
import { LocalStorageService } from '../../../core/services/localStorage.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from '../../../shared/componentes/nav-menu/nav-menu.component';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectButtonModule } from 'primeng/selectbutton';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, NavMenuComponent, TagModule, ButtonModule, RatingModule, ToastModule, ConfirmDialogModule, SelectButtonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss',
  providers: [MessageService]
})
export class CarritoComponent {
  nameCompany: string = '';
  products: Producto[] = [];

  value: number = 0;
    
  paymentOptions: any[] = [
        { name: 'X', value: 1 },
        { name: 'S', value: 2 },
        { name: 'M', value: 3 }
  ];

  constructor(private localStorageService: LocalStorageService,
    private route: ActivatedRoute, 
    private messageService: MessageService,
  ) {
    this.route.params.subscribe(params => {
      this.nameCompany = params['nameCompany'];
      this.products = this.localStorageService.getLocalStorageProductos(this.nameCompany);
      console.log(this.products);
    });
    
  }

  sumarAlCarritoProducto(producto: Producto) {
    this.localStorageService.sumarExistenteProductCarOliSoftLocalStorage(this.nameCompany, producto);
    // refrescar productos
    this.products = this.localStorageService.getLocalStorageProductos(this.nameCompany);
  }

  restarAlCarritoProducto(producto: Producto) {
    this.localStorageService.restarExistenteProductCarOliSoftLocalStorage(this.nameCompany, producto);
    // refrescar productos
    this.products = this.localStorageService.getLocalStorageProductos(this.nameCompany);
  }

  eliminarProductoCar(producto: Producto) {
    this.localStorageService.eliminaExistenteProductCarOliSoftLocalStorage(this.nameCompany, producto);
    // refrescar productos
    this.products = this.localStorageService.getLocalStorageProductos(this.nameCompany);
  }


  getTOTAL(): number {
    let total = 0;
    this.products.forEach((product: Producto) => {
      total = total + ((product.isCombo === true ? product.valueCombo : product.valueUnidad) * product.cantidad);
    })
    return total;
  }


}
