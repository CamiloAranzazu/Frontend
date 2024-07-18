import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
  styleUrl: './dialog-create-empresa.component.scss',
  providers: [DynamicDialogRef]
})
export class DialogCreateEmpresaComponent {
  products: any[] = [];

  formEmpresa: FormGroup | any;

  departamentos: Departamentos[] = [];
  filteredDepartamentos: Departamentos[] = [];


  ciudades: Ciudades[] = [];
  filteredCiudades: Ciudades[] = [];

  solicitdado = false;

  constructor(public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private departamentosListService: DepartamentosListService,
    public config: DynamicDialogConfig
  ) {
    console.log(config);
    
  }

  ngOnInit() {
    this.departamentos = this.departamentosListService.departamentos;
    this.formEmpresa = this.fb.group({
      nombre: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      celular: new FormControl('',Validators.required),
      ciudad: new FormControl('',Validators.required),
      departamento: new FormControl('',Validators.required),
      direccion: new FormControl('',Validators.required)
    });
    if(this.config.data.edit === true) {
      console.log(this.config);
      this.formEmpresa.controls.nombre.setValue(this.config.data?.dataEdit?.nombre);
      this.formEmpresa.controls.email.setValue(this.config.data?.dataEdit?.email);
      this.formEmpresa.controls.celular.setValue(this.config.data?.dataEdit?.celular);
      this.formEmpresa.controls.ciudad.setValue(this.config.data?.dataEdit?.ciudad);
      this.formEmpresa.controls.departamento.setValue(this.config.data?.dataEdit?.departamento);
      if(this.config.data?.dataEdit?.departamento) {
        this.getRefrestCiudades(this.config.data?.dataEdit?.departamento);
      }
      this.formEmpresa.controls.direccion.setValue(this.config.data?.dataEdit?.direccion);
    }
  }

  selectProduct(product: any) {
      this.ref.close(product);
  }

  createSolicitud(){
    // console.log(this.formSolicitud.value)
  }

  changeDepartamento(departamento: any) {
    this.ciudades = departamento?.value?.ciudades;
  }

  getRefrestCiudades(departamento: string) {
    this.departamentos.forEach((depart: any) => {
      if(depart.departamento === departamento) {
        this.ciudades = depart?.ciudades;
      }
    })
  }

  filterDepartamentos(event: any) {
    let filtered: any[] = [];
    let query = event.query;
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
    console.log(this.formEmpresa)
  }
}
