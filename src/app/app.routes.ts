import { Routes } from '@angular/router';
import { AuthGuardService } from './core/guards/AuthGuardService';

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
        path: 'page/auth',
        loadChildren: () => import('./modulos/autenticacion/autenticacion.routes').then(m => m.AUTENTICACION_ROUTES)
    },
    {
        path: 'page/administrador',
        loadChildren: () => import('./modulos/administrador/administrador.routes').then(m => m.ADMINISTRADOR_ROUTES),  
        canActivate: [AuthGuardService]
    },
    {
        path: '**',
        redirectTo: '/page/auth/login'
    }

];