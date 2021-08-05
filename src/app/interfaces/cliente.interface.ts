export interface DatosCliente {
    nombre: string;
    apellido: string;
    edad: number;
    fNacimiento: Date;
    dniPasaporte: string;
    pais: string;
    fIngreso: Date;
    fPartida: Date;
    genero: string;
    email: string;
  
    // Por si lo necesito para algo
    flag?: string;
  }