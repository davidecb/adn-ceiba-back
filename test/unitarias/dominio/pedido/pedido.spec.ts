import { ProductoSolicitado } from "src/dominio/producto-solicitado/modelo/producto-solicitado";
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { Producto } from 'src/dominio/producto/modelo/producto';

describe('Pedido', () => {

  const _Pedido = Pedido as any;
  const producto = new Producto('producto-solicitado testing', 10000, 45, 'imagenTest.jpg');
  const productoSolicitado = new ProductoSolicitado(
    producto,
    'PLA',
    'negro',
    {
      pulido: true,
      pintado: false,
      barnizado: true
    },
    false,
    15000,
    45
    );

  it('pedido con todos los valores debe crearse correctamente', () => {
    const pedido = new _Pedido(
      '1234abcd321',
      [productoSolicitado],
      'Cra 43 16 - 64',
      'david cortes',
      12000,
      40
    );

    expect(pedido.numeroPedido).toEqual('1234abcd321');
    expect(pedido.productosSolicitados).toEqual([productoSolicitado]);
    expect(pedido.direccion).toEqual('Cra 43 16 - 64');
    expect(pedido.cliente).toEqual('david cortes');
    expect(pedido.costo).toEqual(12000);
    expect(pedido.tiempo).toEqual(40);
  }); 
});
