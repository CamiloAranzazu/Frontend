import { Routes } from '@angular/router';
import { OrdenesDeEnvioComponent } from './modulos/ordenes-de-envio/ordenes-de-envio.component';
import { ContabilidadDeEnviosComponent } from './modulos/contabilidad-de-envios/contabilidad-de-envios.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { DasboardDeEnviosComponent } from './modulos/dasboard-de-envios/dasboard-de-envios.component';
export const ADMINISTRADOR_ROUTES: Routes = [
    {
        path: '',
        component: AdministradorComponent,
            children: [
                {path: 'ordenDeEnvio', component: OrdenesDeEnvioComponent},
                {path: 'contabilidadDeEnvio', component: ContabilidadDeEnviosComponent},
                {path: 'dasboardDeEnvio', component: DasboardDeEnviosComponent}
            ]
    }
];