import { Component, OnInit } from '@angular/core';
import { DialogCreateEmpresaComponent } from '../../../../shared/components/dialogs/dialog-create-empresa/dialog-create-empresa.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStorageService } from '../../../../core/services/localStorage.service';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [MenuModule],
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
    direccion: "dasdasdas"
};

    items: MenuItem[] = [];
  
  constructor(public dialogService: DialogService,
    private localStorageService: LocalStorageService,) {

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
              this.show(false);
          }
      },
      // { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      // { separator: true },
      // { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
  ];
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

}
