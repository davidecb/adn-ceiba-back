import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { ProductosPorPedido } from 'src/dominio/productos-por-pedido/modelo/productos-por-pedido';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';
import { ServicioRegistrarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-registrar-productos-por-pedido';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { RepositorioProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/repositorio/repositorio-productos-por-pedido';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { Producto } from 'src/dominio/producto/modelo/producto';


describe('ServicioRegistrarProductosPorPedido', () => {

  let servicioRegistrarProductosPorPedido: ServicioRegistrarProductosPorPedido;
  let repositorioProductosPorPedidoStub: SinonStubbedInstance<RepositorioProductosPorPedido>;
  let repositorioPedidoStub: SinonStubbedInstance<RepositorioPedido>;
  const _ProductosPorPedido = ProductosPorPedido as any;
  const createdAt = new Date;
  const updatedAt = new Date;
  const producto = new Producto(1, 'producto-solicitado testing', 10000, 45, 'imagenTest.jpg', createdAt, updatedAt);
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
    createdAt,
    updatedAt
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
    createdAt,
    updatedAt
  );

  beforeEach(() => {

    repositorioProductosPorPedidoStub = createStubObj<RepositorioProductosPorPedido>(['guardar', 'obtenerPorId']);
    repositorioPedidoStub = createStubObj<RepositorioPedido>(['modificar', 'obtenerPorId']);
    servicioRegistrarProductosPorPedido = new ServicioRegistrarProductosPorPedido(
      repositorioProductosPorPedidoStub,
      repositorioPedidoStub,
    );
  });
  
  it('crear producto por pedido en el repositorio', async () => {
    const productosPorPedido = new _ProductosPorPedido(
      1,
      12,
      productoSolicitado,
      1,
      createdAt,
      updatedAt
    );

    repositorioPedidoStub.obtenerPorId.returns(Promise.resolve(pedido));
    await servicioRegistrarProductosPorPedido.ejecutar(productosPorPedido);

    expect(repositorioProductosPorPedidoStub.guardar.getCalls().length).toBe(1);
    expect(repositorioProductosPorPedidoStub.guardar.calledWith(productosPorPedido)).toBeTruthy();
    expect(repositorioPedidoStub.modificar.getCalls().length).toBe(1);
  });
});
