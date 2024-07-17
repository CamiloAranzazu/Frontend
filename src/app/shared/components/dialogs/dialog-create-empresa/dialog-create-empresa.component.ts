import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DepartamentosListService } from '../../../../core/services/ciudadesList.service';
import { Ciudades, Departamentos } from '../../../../core/interfaces/commonsInsterface';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dialog-create-empresa',
  standalone: true,
  imports: [CommonModule, InputTextModule, InputMaskModule ,FormsModule, ReactiveFormsModule, DropdownModule, AutoCompleteModule, ButtonModule],
  templateUrl: './dialog-create-empresa.component.html',
  styleUrl: './dialog-create-empresa.component.scss'
})
export class DialogCreateEmpresaComponent {
  products: any[] = [];

  formSolicitud: FormGroup | any;

  departamentos: Departamentos[] = [];
  filteredDepartamentos: Departamentos[] = [];


  ciudades: Ciudades[] = [];
  filteredCiudades: Ciudades[] = [];

  solicitdado = false;

  constructor(public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private departamentosListService: DepartamentosListService
  ) {
    this.departamentos = this.departamentosListService.departamentos;
  }

  ngOnInit() {
    this.formSolicitud = this.fb.group({
      nombre: new FormControl('',Validators.required),
      celular: new FormControl('',Validators.required),
      celularConfirm: new FormControl('',Validators.required),
      ciudad: new FormControl('',Validators.required),
      direccion: new FormControl('',Validators.required)
    });
  }

  selectProduct(product: any) {
      this.ref.close(product);
  }

  createSolicitud(){
    // console.log(this.formSolicitud.value)
  }

  changeDepartamento(departamento: any) {
    console.log(departamento);
    this.ciudades = departamento?.value?.ciudades;
  }

  filterDepartamentos(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    console.log(query);
    for (let i = 0; i < this.departamentos.length; i++) {
        let depart = this.departamentos[i];
        if (depart.departamento.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(depart);
        }
    }
    this.filteredDepartamentos = filtered;
  }

  filterCiudades(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.ciudades.length; i++) {
        let ciudad = this.ciudades[i];
        if (ciudad.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(ciudad);
        }
    }
    this.filteredCiudades = filtered;
  }


  solicitar() {
    this.solicitdado = true;
    console.log(this.formSolicitud)
  }
}
