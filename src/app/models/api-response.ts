export interface ApiResponse<T> {
    procesoCorrecto: boolean;
    error: number;
    mensaje: string | null;
    retorno: T;
}
