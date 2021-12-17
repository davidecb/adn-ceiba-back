import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';
import { ProductosPorPedido } from 'src/dominio/productos-por-pedido/modelo/productos-por-pedido';
import { Producto } from 'src/dominio/producto/modelo/producto';

describe('ProductosPorPedido', () => {

  const _ProductosPorPedido = ProductosPorPedido as any;
  const createdAt = new Date();
  const updatedAt = new Date();
  const producto = new Producto(1, 'producto-solicitado testing', 10000, 45, 'imagenTest.jpg', new Date, new Date);
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
    15000,
    45,
    new Date,
    new Date
  );
  
  const pedido = new Pedido(
    1,
    '1234abcd321',
    [],
    'Cra 43 16 - 64',
    'david cortes',
    'inicializando',
    12000,
    40,
    new Date,
    new Date
  );

  it('pedido con todos los valores debe crearse correctamente', () => {
    const productosPorPedido = new _ProductosPorPedido(
      1,
      pedido,
      productoSolicitado,
      2,
      createdAt,
      updatedAt
    );

    expect(productosPorPedido.id).toEqual(1);
    expect(productosPorPedido.pedido).toEqual(pedido);
    expect(productosPorPedido.productoSolicitado).toEqual(productoSolicitado);
    expect(productosPorPedido.cantidad).toEqual(2);
    expect(productosPorPedido.createdAt).toEqual(createdAt);
    expect(productosPorPedido.updatedAt).toEqual(updatedAt);
  }); 
});
