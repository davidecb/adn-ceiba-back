import { Injectable } from '@nestjs/common';
import { DaoProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/dao/dao-producto-solicitado';
import { ProductoSolicitadoDto } from 'src/aplicacion/producto-solicitado/consulta/dto/producto-solicitado.dto';

@Injectable()
export class ManejadorListarProductoSolicitado {
  constructor(private _daoProductoSolicitado: DaoProductoSolicitado) {}

  async ejecutar(): Promise<ProductoSolicitadoDto[]> {
    return this._daoProductoSolicitado.listar();
  }
}
