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
  const _ProductosPorPedido = ProductosPorPedido as any;
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

  beforeEach(() => {

    repositorioProductosPorPedidoStub = createStubObj<RepositorioProductosPorPedido>(['guardar']);
    servicioRegistrarProductosPorPedido = new ServicioRegistrarProductosPorPedido(repositorioProductosPorPedidoStub);
  });
  
  it('crear producto por pedido en el repositorio', async () => {
    const productosPorPedido = new _ProductosPorPedido(
      1,
      pedido,
      productoSolicitado,
      2,
      new Date,
      new Date
    );

    await servicioRegistrarProductosPorPedido.ejecutar(productosPorPedido);

    expect(repositorioProductosPorPedidoStub.guardar.getCalls().length).toBe(1);
    expect(repositorioProductosPorPedidoStub.guardar.calledWith(productosPorPedido)).toBeTruthy();
  });
});
