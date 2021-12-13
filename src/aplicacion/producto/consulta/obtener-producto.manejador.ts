import { Injectable } from '@nestjs/common';
import { DaoProducto } from 'src/dominio/producto/puerto/dao/dao-producto';
import { ProductoDto } from 'src/aplicacion/producto/consulta/dto/producto.dto';

@Injectable()
export class ManejadorObtenerProducto {
  constructor(private _daoProducto: DaoProducto) {}

  async ejecutar(id: string): Promise<ProductoDto> {
    return this._daoProducto.obtener(id);
  }
}
