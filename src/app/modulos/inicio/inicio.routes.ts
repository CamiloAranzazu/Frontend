import { Routes } from '@angular/router';
import { PageInicioComponent } from './page-inicio/page-inicio.component';

export const INICIO_ROUTES: Routes = [
    {
        path: 'category/:category', component: PageInicioComponent
    }
];