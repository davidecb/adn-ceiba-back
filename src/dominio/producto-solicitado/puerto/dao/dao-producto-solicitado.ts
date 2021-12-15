import { ProductoSolicitadoDto } from 'src/aplicacion/producto-solicitado/consulta/dto/producto-solicitado.dto';

export abstract class DaoProductoSolicitado {
  abstract async listar(): Promise<ProductoSolicitadoDto[]>;
  abstract async obtenerPorId(id: number): Promise<ProductoSolicitadoDto>;
}
