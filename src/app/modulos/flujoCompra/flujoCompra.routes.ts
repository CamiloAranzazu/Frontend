import { Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { DetalleCompraComponent } from './detalle-compra/detalle-compra.component';
import { PagoExitosoComponent } from './pago-exitoso/pago-exitoso.component';

export const FLUJO_COMPRA_ROUTES: Routes = [
    {
        path: 'carrito', component: CarritoComponent
    }, 
    {
        path: 'detalleCompra', component: DetalleCompraComponent
    },
    {
        path: 'PagoExitoso', component: PagoExitosoComponent
    }
];