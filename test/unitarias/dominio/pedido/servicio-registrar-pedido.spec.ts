import { ProductosPorPedido } from "src/dominio/productos-por-pedido/modelo/productos-por-pedido";
import { ProductoSolicitado } from "src/dominio/producto-solicitado/modelo/producto-solicitado";
import { ServicioRegistrarPedido } from 'src/dominio/pedido/servicio/servicio-registrar-pedido';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { Producto } from 'src/dominio/producto/modelo/producto';


describe('ServicioRegistrarPedido', () => {

  let servicioRegistrarPedido: ServicioRegistrarPedido;
  let repositorioPedidoStub: SinonStubbedInstance<RepositorioPedido>;
  const _Pedido = Pedido as any;
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
  const productoPorPedido = new ProductosPorPedido(
    1,
    _Pedido,
    productoSolicitado,
    2,
    new Date,
    new Date
  );

  beforeEach(() => {

    repositorioPedidoStub = createStubObj<RepositorioPedido>(['existeNumeroPedido', 'guardar']);
    servicioRegistrarPedido = new ServicioRegistrarPedido(repositorioPedidoStub);
  });
  
  it('si el numero de pedido ya existe no se puede crear y deberia retonar error', async () => {

    repositorioPedidoStub.existeNumeroPedido.returns(Promise.resolve(true));

    await expect(
      servicioRegistrarPedido.ejecutar(
        new Pedido(
          1,
          '1234abcd321',
          [productoPorPedido],
          'Cra 43 16 - 64',
          'david cortes',
          'inicializando',
          12000,
          40,
          new Date,
          new Date
        ),
      ),
    ).rejects.toThrow('El numero de pedido 1234abcd321 ya existe');
  });

  it('si el numero de pedido no existe guarda el producto en el repositorio', async () => {
    const producto = new Pedido(
      1,
      '1234abcd321',
      [productoPorPedido],
      'Cra 43 16 - 64',
      'david cortes',
      'inicializando',
      12000,
      40,
      new Date,
      new Date
    );
    repositorioPedidoStub.existeNumeroPedido.returns(Promise.resolve(false));

    await servicioRegistrarPedido.ejecutar(producto);

    expect(repositorioPedidoStub.guardar.getCalls().length).toBe(1);
    expect(repositorioPedidoStub.guardar.calledWith(producto)).toBeTruthy();
  });
});
