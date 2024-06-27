import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Producto } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

    constructor(@Inject(DOCUMENT) private document: Document) { }

    //Trae el local storage
    getLocalStorage(): any {
        return this.document.defaultView?.localStorage;
    }

    //Si no exite el carrito de compras en localStorage lo crea
    exitCarOliSoftLocalStorage(nameCompany: string) {
        const carOliSoftLocalStorage = this.getLocalStorage()?.getItem(nameCompany+'CarOliSoftLocalStorage');
        if (!carOliSoftLocalStorage) {
            this.getLocalStorage()?.setItem(nameCompany+'CarOliSoftLocalStorage', '[]');
        }
    }

    // devuelve los productos del carrido de compras
    getLocalStorageProductos(nameCompany: string): Producto[] {
        let products: any[] = [];
        const carOliSoftLocalStorage = this.getLocalStorage()?.getItem(nameCompany+'CarOliSoftLocalStorage');
        if (carOliSoftLocalStorage) {
            products = JSON.parse(carOliSoftLocalStorage);
        }
        return products;
    }

    //Agregar un producto al carrito desde el inicio de la app
    addProductCarOliSoftLocalStorage(nameCompany: string, prod: Producto) {
        let products: any[] = this.getLocalStorageProductos(nameCompany);
        let dataProducto = products.find((producto: Producto) => producto.id === prod.id)
        dataProducto !== undefined ? null: products.push(prod);
        this.getLocalStorage()?.setItem(nameCompany+'CarOliSoftLocalStorage', JSON.stringify(products));
    }

    //Agregar un producto en el carrito exitente +
    sumarExistenteProductCarOliSoftLocalStorage(nameCompany: string, prod: Producto) {
        let products: any[] = this.getLocalStorageProductos(nameCompany);
        products.forEach((producto: Producto, index) => {
            if(producto.id === prod.id) {
                producto.cantidad = producto.cantidad+1;
            }
            if(index === products.length-1) {
                this.getLocalStorage()?.setItem(nameCompany+'CarOliSoftLocalStorage', JSON.stringify(products));
            }
        })
    }

    //se resta un producto en el carrito exitente - mas no se elimina
    restarExistenteProductCarOliSoftLocalStorage(nameCompany: string, prod: Producto) {
        let products: any[] = this.getLocalStorageProductos(nameCompany);
        products.forEach((producto: Producto, index) => {
            if(producto.id === prod.id) {
                producto.cantidad = producto.cantidad-1;
                if(producto.cantidad === 0) {
                    products.splice(index, 1);
                }
            }
            if(index === products.length-1) {
                this.getLocalStorage()?.setItem(nameCompany+'CarOliSoftLocalStorage', JSON.stringify(products));
            }
        });
    }

    //Se elimiona el producto del carrito
    eliminaExistenteProductCarOliSoftLocalStorage(nameCompany: string, prod: Producto) {
        let products: Producto[] = this.getLocalStorageProductos(nameCompany);
        let newProducts: Producto[] = products.filter((producto: Producto) => producto.id !== prod.id);
        this.getLocalStorage()?.setItem(nameCompany+'CarOliSoftLocalStorage', JSON.stringify(newProducts));
    }

}

