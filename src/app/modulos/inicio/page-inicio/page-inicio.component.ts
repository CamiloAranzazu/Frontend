import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NavMenuComponent } from '../../../shared/componentes/nav-menu/nav-menu.component';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LocalStorageService } from '../../../core/services/localStorage.service';
import { Producto } from '../../../core/interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, NavMenuComponent, CarouselModule, TagModule, ButtonModule, RatingModule, ToastModule, ConfirmDialogModule],
  templateUrl: './page-inicio.component.html',
  styleUrl: './page-inicio.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class PageInicioComponent implements OnInit {
  menu1: boolean = false;
  nameCompany: string = '';

  estrellas: number = 5;
  localStorage: any;

  products: Producto[] = [];

    responsiveOptions: any[] = [];

    constructor(private route: ActivatedRoute, 
      private router: Router, 
      private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.nameCompany = params['nameCompany'];
        this.localStorageService.exitCarOliSoftLocalStorage(this.nameCompany);
     });
     this.products = [
      {
        id: 1,
        company: 'maycloset',
        nombre: 'SUDADERA X3 BOTA RECTA',
        descripcion: '(BLANCO, VERDE MILITAR, AZUL CIELO)',
        photo: '',
        fecha: '',
        resenas:  [''],
        isCombo: true,
        valueAntes: 200000,
        valueCombo: 109000,
        valueUnidad: 30000,
        tallaUnica: false,
        tallas: ['XS','S','N'],
        cantidad: 1
      },
      {
        id: 2,
        company: 'maycloset',
        nombre: 'SUDADERA X3',
        descripcion: '(VERDE MILITAR, AZUL CIELO)',
        photo: '',
        fecha: '',
        resenas:  [''],
        isCombo: true,
        valueAntes: 200000,
        valueCombo: 109000,
        valueUnidad: 30000,
        tallaUnica: false,
        tallas: ['XS','N'],
        cantidad: 1
      },
      {
        id: 3,
        company: 'maycloset',
        nombre: 'SUDADERA X3 ENTUVADA',
        descripcion: '(VERDE MILITAR, AZUL CIELO)',
        photo: '',
        fecha: '',
        resenas:  [''],
        isCombo: true,
        valueAntes: 200000,
        valueCombo: 109000,
        valueUnidad: 30000,
        tallaUnica: false,
        tallas: ['XS','N', 'M'],
        cantidad: 1
      },
      {
        id: 4,
        company: 'maycloset',
        nombre: 'SUDADERA X3 BOTA RECTA',
        descripcion: '(BLANCO, VERDE MILITAR, AZUL CIELO)',
        photo: '',
        fecha: '',
        resenas:  [''],
        isCombo: true,
        valueAntes: 200000,
        valueCombo: 109000,
        valueUnidad: 30000,
        tallaUnica: false,
        tallas: ['XS','S','N'],
        cantidad: 1
      },
      {
        id: 5,
        company: 'maycloset',
        nombre: 'SUDADERA X3',
        descripcion: '(VERDE MILITAR, AZUL CIELO)',
        photo: '',
        fecha: '',
        resenas:  [''],
        isCombo: true,
        valueAntes: 200000,
        valueCombo: 109000,
        valueUnidad: 30000,
        tallaUnica: false,
        tallas: ['XS','N'],
        cantidad: 1
      },
      {
        id: 6,
        company: 'maycloset',
        nombre: 'SUDADERA X3 ENTUVADA',
        descripcion: '(VERDE MILITAR, AZUL CIELO)',
        photo: '',
        fecha: '',
        resenas:  [''],
        isCombo: true,
        valueAntes: 200000,
        valueCombo: 109000,
        valueUnidad: 30000,
        tallaUnica: false,
        tallas: ['XS','N', 'M'],
        cantidad: 1
      }
    ];
    }

  // Agregar a carrito
  addProductoCar(product: any) {
    this.localStorageService.addProductCarOliSoftLocalStorage(this.nameCompany, product);
    this.router.navigate(['/company/'+this.nameCompany+'/carrito']);
  }

  // Ejemplo de dialogo confgurmación
  confirm() {
    this.confirmationService.confirm({
        message: 'Quieres agregar mas productos? o continuar con tu pedido seleccionado',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
        },
        reject: () => { }
    });
  }

}
