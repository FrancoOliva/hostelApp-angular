export interface Habitacion {
    id: string;
    nombre: string;
    srcImg: string;
    mostrarCamas: boolean;
    
}

export interface Camas{
    id?: string;
    estado: string;
    cliente: string;
    fIngreso: string;
    fPartida: string;
}
