import { Component, inject, OnInit } from '@angular/core';
import { DialogCreateEmpresaComponent } from '../../../../shared/components/dialogs/dialog-create-empresa/dialog-create-empresa.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { DialogConfirmacionComponent } from '../../../../shared/components/dialogs/dialog-confirmacion/dialog-confirmacion.component';
import { UsersService } from '../../../../core/services/modules/users.service';
import { CrudCommonFirebaseService } from '../../../../core/services/modules/crud-common-firebase.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, MenuModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  providers: [DialogService],
})
export class UsuariosComponent implements OnInit {
  ref: DynamicDialogRef | undefined;

  usuarios: any[] = [];

  private _crudCommonFirebaseService = inject(CrudCommonFirebaseService);

  dataEdit = {
    nombre: 'cascasc',
    email: 'casca@gmail.com',
    celular: '(322) 376-1778',
    ciudad: 'Manizales',
    departamento: 'Caldas',
    direccion: 'dasdasdas',
    isActive: true,
  };

  items: MenuItem[] = [];

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Actualizar',
        icon: 'pi pi-refresh',
        command: () => {
          this.show(true, this.dataEdit);
        },
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-times',
        command: () => {
          this.delete();
        },
      },
      // { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      // { separator: true },
      // { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
    ];
    // let user: any = this._userservice.getUsers();
    // this._userservice.getUsers().subscribe((rest:any) => {
    //   console.log("🚀 ~ UsuariosComponent ~ this._userservice.getUsers ~ rest:", rest)
    // });
    // this._userservice.getUsers().subscribe(rest => {
    //   console.log('rest',rest);
    //   this.usuarios = rest;
    // });


    // this._userservice.getCollectionData('').subscribe(rest => {
    //   console.log('rest1',rest);
    //   this.usuarios = rest;
    // })


    this.getUsers();
    
  }

  async getUsers() {
    try {
      // Obtener documentos filtrados de la colección "productos"
      let data = await this._crudCommonFirebaseService.getFilteredDocuments('usersTest', 'UID', '1Sh65lqPmtT4cSgq4nSaHOVYzcl2');
      console.log('data',data);
      data !== undefined ? this.usuarios = data: '';
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }
    

  show(edit?: boolean, data?: any) {
    this.ref = this.dialogService.open(DialogCreateEmpresaComponent, {
      header: 'EMPRESA',
      width: '90%',
      data: { edit, dataEdit: this.dataEdit },
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
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
        txtCancelar: 'Cancelar',
      },
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe((data: any) => {
      if (data) {
        console.log(data);
      }
    });
  }
}
