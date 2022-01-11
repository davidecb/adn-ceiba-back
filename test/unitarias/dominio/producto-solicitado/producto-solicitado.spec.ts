import { ErrorPropiedadesFaltantes } from './../../../../src/dominio/errores/error-propiedades-faltantes';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';
import { Producto } from 'src/dominio/producto/modelo/producto';

describe('ProductoSolicitado', () => {

  const _ProductoSolicitado = ProductoSolicitado as any;
  const createdAt = new Date();
  const updatedAt = new Date();
  const producto = new Producto(1, 'producto-solicitado testing', 10000, 45, 'imagenTest.jpg', createdAt, updatedAt);

  it('producto solicitado con objeto de acabado invalido 1', () => {
    return expect(async () => new _ProductoSolicitado(
      1,
      producto,
      'PLA',
      'negro',
      {
        pulido: true,
        pintado: false,
        urgencia: true
      },
      false,
      15000,
      45,
      createdAt,
      updatedAt
      ))
      .rejects
      .toStrictEqual(new ErrorPropiedadesFaltantes('El objeto: acabado, debe tener las propiedades pulido, pintado y barnizado'));
  });

  it('producto solicitado con objeto de acabado invalido 2', () => {
    return expect(async () => new _ProductoSolicitado(
      1,
      producto,
      'PLA',
      'negro',
      {
        urgencia: true,
        costo: 123,
        tiempo: 15
      },
      false,
      15000,
      45,
      createdAt,
      updatedAt
      ))
      .rejects
      .toStrictEqual(new ErrorPropiedadesFaltantes('El objeto: acabado, debe tener las propiedades pulido, pintado y barnizado'));
  });

  it('producto solicitado con objeto de acabado invalido 3', () => {
    return expect(async () => new _ProductoSolicitado(
      1,
      producto,
      'PLA',
      'negro',
      {
        pulido: true,
        pintado: false,
        barnizado: false,
        urgencia: true
      },
      false,
      15000,
      45,
      createdAt,
      updatedAt
      ))
      .rejects
      .toStrictEqual(new ErrorPropiedadesFaltantes('El objeto: acabado, debe tener las propiedades pulido, pintado y barnizado'));
  });

  it('producto solicitado con todas las propiedades debe crearse correctamente', () => {
    const productoSolicitado = new _ProductoSolicitado(
      1,
      producto,
      'ABS',
      'madera',
      {
        pulido: true,
        pintado: false,
        barnizado: true
      },
      false,
      0,
      0,
      createdAt,
      updatedAt
      );

    expect(productoSolicitado.id).toEqual(1);
    expect(productoSolicitado.producto).toEqual(producto);
    expect(productoSolicitado.material).toEqual('ABS');
    expect(productoSolicitado.color).toEqual('madera');
    expect(productoSolicitado.acabado).toEqual({
        pulido: true,
        pintado: false,
        barnizado: true
      });
    expect(productoSolicitado.urgencia).toEqual(false);
    expect(productoSolicitado.costo).toEqual(0);
    expect(productoSolicitado.tiempo).toEqual(0);
    expect(productoSolicitado.createdAt).toEqual(createdAt);
    expect(productoSolicitado.updatedAt).toEqual(updatedAt);
  });  
});
