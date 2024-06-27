export interface Producto {
    id: number;
    company: string;
    nombre: string;
    descripcion: string;
    photo: string;
    fecha: string;
    resenas: string[];
    isCombo: boolean;
    valueAntes: number;
    valueCombo: number;
    valueUnidad: number;
    tallaUnica: boolean;
    tallas: string[];
    cantidad: number;
    tallaSeleccionada?: string;
}