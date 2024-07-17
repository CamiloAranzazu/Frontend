import { Component, OnInit } from '@angular/core';
import { DialogCreateEmpresaComponent } from '../../../../shared/components/dialogs/dialog-create-empresa/dialog-create-empresa.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStorageService } from '../../../../core/services/localStorage.service';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.scss',
  providers: [DialogService]

})
export class EmpresasComponent implements OnInit {

  ref: DynamicDialogRef | undefined;

  
  constructor(public dialogService: DialogService,
    private localStorageService: LocalStorageService,) {

  }

  ngOnInit(): void {
    
  }

  show() {
    this.ref = this.dialogService.open(DialogCreateEmpresaComponent, {
        header: 'CREAR EMPRESA',
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

}
