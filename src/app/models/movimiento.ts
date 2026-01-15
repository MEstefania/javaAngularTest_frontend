export interface Movimiento {
    idMovimiento: number;
    fecha: Date;
    tipo: string;
    valorMovimiento: number;
    saldo?: number;
    idCuenta: number;
}
