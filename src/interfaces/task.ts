export interface ITask {
    titulo: string
    descripcion: string
    fechaVencimiento: string
    usuarioId: number | null
    etiquetaId: number | null
    columnaId: number
}