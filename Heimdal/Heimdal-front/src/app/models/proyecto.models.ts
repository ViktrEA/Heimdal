export class ProyectoModel{
    id: number;
    codigo: string;
    nombre: string;
    // tslint:disable-next-line: variable-name
    descripcion_corta: string;
    // tslint:disable-next-line: variable-name
    usuario_creacion: string;
    // tslint:disable-next-line: variable-name
    fecha_creacion: string;
    // tslint:disable-next-line: variable-name
    usuarios_asignados?: string;
    // tslint:disable-next-line: variable-name
    fecha_final?: string;
    // tslint:disable-next-line: variable-name
    descripcion_larga?: string;
    estado?: string;
}
