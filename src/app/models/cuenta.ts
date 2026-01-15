export interface Cuenta {
    idCuenta: string;
    numeroCuenta: string;
    tipo: string;
    saldoInicial: number;
    estado: boolean;
    idCliente: number;
    cliente?: string;
}
