export class TareaModel {
  codigo: string;
  nombre: string;
  descripcion_corta: string;
  prioridad: string;
  estado: string;
  fecha_creacion: Date;
  usuario_creacion: string;
  proyecto: string;
  usuarios_asignados?: string;
  descripcion_larga?: string;
  fecha_final?: Date;
  id?: number;
}
