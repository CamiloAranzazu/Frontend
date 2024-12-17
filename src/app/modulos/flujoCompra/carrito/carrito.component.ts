import { Component } from '@angular/core';
import { Producto } from '../../../core/interfaces/product';
import { LocalStorageService } from '../../../core/services/localStorage.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { NavMenuComponent } from '../../../shared/componentsCommons/nav-menu/nav-menu.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogCreateSolicitudComponent } from '../../../shared/components/dialogs/dialog-create-solicitud/dialog-create-solicitud.component';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, NavMenuComponent, TagModule, ButtonModule, RatingModule, ToastModule, ConfirmDialogModule, SelectButtonModule, SidebarModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss',
  providers: [MessageService, DialogService]
})
export class CarritoComponent {
  nameCompany: string = '';
  products: Producto[] = [];

  ref: DynamicDialogRef | undefined;

  value: number = 0;

  confirmacionTallas: boolean = false;
    
  paymentOptions: any[] = [
        { name: 'X', value: 1 },
        { name: 'S', value: 2 },
        { name: 'M', value: 3 }
  ];

  constructor(public dialogService: DialogService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.nameCompany = params['nameCompany'];
      this.products = this.localStorageService.getLocalStorageProductos(this.nameCompany);
      console.log(this.products);
    });
    
  }

  solicitar() {
    if(this.validacionDeTallas() === true) {
      this.confirmacionTallas = true;
    } else {
      this.show();
    }
  }

  validacionDeTallas(): boolean {
    let exitUnoSinTalla = false;
    let data = this.products.find((producto: Producto) => producto.tallaUnica === false && (producto.tallaSeleccionada === '' || producto.tallaSeleccionada === null ));
    console.log(data);
    if(data !== undefined) {
      exitUnoSinTalla = true;
    }
    return exitUnoSinTalla;
  }

  show() {
    this.ref = this.dialogService.open(DialogCreateSolicitudComponent, {
        header: 'PAGO CONTRAENTREGA',
        width: '90%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true
    });

    this.ref.onClose.subscribe((data: any) => {
        if (data) {
            console.log(data);
        }
    });
  }


  changeTalla(product: Producto, valueTalla: any) {
    this.localStorageService.agregarTallaProductCarOliSoftLocalStorage(this.nameCompany, product, valueTalla);
    // refrescar productos
    this.products = this.localStorageService.getLocalStorageProductos(this.nameCompany);
  }

  // Metodo que suma un producto en carrito
  sumarAlCarritoProducto(producto: Producto) {
    this.localStorageService.sumarExistenteProductCarOliSoftLocalStorage(this.nameCompany, producto);
    // refrescar productos
    this.products = this.localStorageService.getLocalStorageProductos(this.nameCompany);
  }

  // Metodo que resta un producto en carrito
  restarAlCarritoProducto(producto: Producto) {
    this.localStorageService.restarExistenteProductCarOliSoftLocalStorage(this.nameCompany, producto);
    // refrescar productos
    this.products = this.localStorageService.getLocalStorageProductos(this.nameCompany);
  }

  // Metodo que elimina un producto en carrito
  eliminarProductoCar(producto: Producto) {
    this.localStorageService.eliminaExistenteProductCarOliSoftLocalStorage(this.nameCompany, producto);
    // refrescar productos
    this.products = this.localStorageService.getLocalStorageProductos(this.nameCompany);
  }


  // Metodo que trae el total de todos los productos en el carrito
  getTOTAL(): number {
    let total = 0;
    this.products.forEach((product: Producto) => {
      total = total + ((product.isCombo === true ? product.valueCombo : product.valueUnidad) * product.cantidad);
    })
    return total;
  }


}
