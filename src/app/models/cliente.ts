export interface Cliente {
    id: string;
    nombre: string;
    genero?: string;
    edad: number;
    identificacion: string;
    direccion: string;
    telefono: string;
    contrasenia: string;
    estado: boolean;
}
