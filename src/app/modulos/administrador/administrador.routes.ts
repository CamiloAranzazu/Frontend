import { Routes } from '@angular/router';
import { OrdenesDeEnvioComponent } from './modulos/ordenes-de-envio/ordenes-de-envio.component';
import { ContabilidadDeEnviosComponent } from './modulos/contabilidad-de-envios/contabilidad-de-envios.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { DasboardDeEnviosComponent } from './modulos/dasboard-de-envios/dasboard-de-envios.component';
import { EmpresasComponent } from './modulos/empresas/empresas.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
export const ADMINISTRADOR_ROUTES: Routes = [
    {
        path: '',
        component: AdministradorComponent,
            children: [
                {path: 'ordenDeEnvio', component: OrdenesDeEnvioComponent},
                {path: 'contabilidadDeEnvio', component: ContabilidadDeEnviosComponent},
                {path: 'dasboardDeEnvio', component: DasboardDeEnviosComponent},
                {path: 'empresas', component: EmpresasComponent},
                {path: 'usuarios', component: UsuariosComponent},
            ]
    }
];