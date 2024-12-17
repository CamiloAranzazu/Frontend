import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordenes-de-envio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ordenes-de-envio.component.html',
  styleUrl: './ordenes-de-envio.component.scss'
})
export class OrdenesDeEnvioComponent implements OnInit {
 
  tabEstado: string = 'ordenes';

  constructor() {

  }

  ngOnInit(): void {
    
  }


  changeTabEstado(estado: string) {
    this.tabEstado = estado;
  }

}
