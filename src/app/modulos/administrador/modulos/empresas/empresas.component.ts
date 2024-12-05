import { Component, OnInit } from '@angular/core';
import { DialogCreateEmpresaComponent } from '../../../../shared/components/dialogs/dialog-create-empresa/dialog-create-empresa.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { DialogConfirmacionComponent } from '../../../../shared/components/dialogs/dialog-confirmacion/dialog-confirmacion.component';
import { EmpresaService } from '../../../../core/services/modules/empresa.service';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, MenuModule],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.scss',
  providers: [DialogService]

})
export class EmpresasComponent implements OnInit {
 
  ref: DynamicDialogRef | undefined;

  dataEdit = {
    nombre: "cascasc",
    email: "casca@gmail.com",
    celular: "(322) 376-1778",
    ciudad: "Manizales",
    departamento: "Caldas",
    direccion: "dasdasdas",
    isActive: true
};

    items: MenuItem[] = [];
  
  constructor(
    public dialogService: DialogService,
    private empresaService: EmpresaService
  ) {
    this.getEmployer();
  }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Actualizar',
          icon: 'pi pi-refresh',
          command: () => {
              this.show(true, this.dataEdit);
          }
      },
      {
          label: 'Eliminar',
          icon: 'pi pi-times',
          command: () => {
              this.delete();
          }
      },
      // { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      // { separator: true },
      // { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
    ];
  }

  getEmployer() {
    console.log('getEmpresas',this.empresaService.getEmployer());
    this.empresaService.getEmployer().subscribe(empresa => {
      console.log(empresa);
    })
  }

  show(edit?: boolean, data?: any) {
    this.ref = this.dialogService.open(DialogCreateEmpresaComponent, {
        header: 'EMPRESA',
        width: '90%',
        data: {edit, dataEdit: this.dataEdit },
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


  delete() {
    this.ref = this.dialogService.open(DialogConfirmacionComponent, {
        header: 'ELIMINAR',
        width: '90%',
        data: { 
          mensaje: 'Esta seguro de eliminarlo?',
          pregunta: undefined,
          btnConfirmar: true,
          btnCancelar: true,
          txtConfirmar: 'Eliminar',
          txtCancelar: 'Cancelar'
        },
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

}
