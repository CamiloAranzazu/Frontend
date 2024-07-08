export interface Departamentos {
    id: number;
    departamento: string;
    ciudades: Ciudades[];
}

export interface Ciudades {
    nombre: string;
}
