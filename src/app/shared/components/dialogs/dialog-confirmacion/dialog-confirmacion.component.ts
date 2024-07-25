import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

export interface DataConfirmacion {
  mensaje: string;
  pregunta?: string
  btnConfirmar?: boolean;
  btnCancelar?: boolean;
  txtConfirmar?: string;
  txtCancelar?: string;
}

@Component({
  selector: 'app-dialog-confirmacion',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './dialog-confirmacion.component.html',
  styleUrl: './dialog-confirmacion.component.scss'
})
export class DialogConfirmacionComponent {
  products: any[] = [];

  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    console.log(config);
    
  }


  confirmacion() {
    this.ref.close(true);
  }

  cancelar() {
    this.ref.close(false);
  }


  
}
