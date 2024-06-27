import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'company/:nameCompany',
        loadChildren: () => import('./modulos/inicio/inicio.routes').then(m => m.INICIO_ROUTES),
        canActivate: []
    },
    {
        path: 'company/:nameCompany',
        loadChildren: () => import('./modulos/flujoCompra/flujoCompra.routes').then(m => m.FLUJO_COMPRA_ROUTES)
    },
    {
        path: 'page/login',
        loadChildren: () => import('./modulos/autenticacion/autenticacion.routes').then(m => m.AUTENTICACION_ROUTES)
    }
];