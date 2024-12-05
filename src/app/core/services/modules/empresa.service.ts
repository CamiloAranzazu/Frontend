import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

    private readonly baseUrl?: string;

    constructor(
        private _http: HttpClient
    ) { 
        this.baseUrl = environment!.api!.url;
    }

    public getUrl(endpoint: string) {
        return this.baseUrl + (endpoint || ''); 
    }

    /**
     * Permite traer la lista de empresas
     * @param Id
     */
    async getEmployers(){
        return await this._http.get(this.getUrl('api/Empresa/Lista'));
    }

    getEmployer(){
        return this._http.get(this.getUrl('api/Empresa/Lista'));
    }


}




