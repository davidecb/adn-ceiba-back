import { ProductosPorPedido } from 'src/dominio/productos-por-pedido/modelo/productos-por-pedido';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { Producto } from 'src/dominio/producto/modelo/producto';

describe('Pedido', () => {

  const _Pedido = Pedido as any;
  const createdAt = new Date();
  const updatedAt = new Date();
  const producto = new Producto(1, 'producto testing', 10000, 45, 'imagenTest.jpg', createdAt, updatedAt);
  const productoSolicitado = new ProductoSolicitado(
    1,
    producto,
    'PLA',
    'negro',
    {
      pulido: true,
      pintado: false,
      barnizado: false
    },
    false,
    0,
    0,
    createdAt,
    updatedAt
  );
  const productoPorPedido = new ProductosPorPedido(
    1,
    _Pedido,
    productoSolicitado,
    2,
    createdAt,
    updatedAt
  );

  it('pedido con todos los valores debe crearse correctamente', () => {
    const pedido = new _Pedido(
      1,
      '1234abcd321',
      [productoPorPedido],
      'Cra 43 16 - 64',
      'david cortes',
      'inicializando',
      12000,
      40,
      createdAt,
      updatedAt
    );

    expect(pedido.id).toEqual(1);
    expect(pedido.numeroPedido).toEqual('1234abcd321');
    expect(pedido.productosSolicitados).toEqual([productoPorPedido]);
    expect(pedido.direccion).toEqual('Cra 43 16 - 64');
    expect(pedido.cliente).toEqual('david cortes');
    expect(pedido.estado).toEqual('inicializando');
    expect(pedido.costo).toEqual(12000);
    expect(pedido.tiempo).toEqual(40);
    expect(pedido.createdAt).toEqual(createdAt);
    expect(pedido.updatedAt).toEqual(updatedAt);
  }); 
});
