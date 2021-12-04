export interface CarritoItem{
    producto_id: number;
    usuario_id?: number,
    nombre?: string;
    precio?: number;
    count: number;
    subtotal?: number;
}