export interface Habitacion {
    id: string;
    nombre: string;
    estado: string;
    srcImg: string;
    camas: Camas[];
    mostrarCamas: boolean;
    
}

export interface Camas{
    estado: string;
    cliente: string;
    fIngreso: Date;
    fPartida: Date;
}
