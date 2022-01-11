import { ProductoSolicitado } from "src/dominio/producto-solicitado/modelo/producto-solicitado";
import { ServicioEliminarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-eliminar-productos-por-pedido';
import { RepositorioProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/repositorio/repositorio-productos-por-pedido';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { ProductosPorPedidoDto } from 'src/aplicacion/productos-por-pedido/consulta/dto/productos-por-pedido.dto';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { ProductosPorPedido } from "src/dominio/productos-por-pedido/modelo/productos-por-pedido";


describe('ServicioEliminarProductosPorPedido', () => {

  let servicioEliminarProductosPorPedido: ServicioEliminarProductosPorPedido;
  let repositorioProductosPorPedidoStub: SinonStubbedInstance<RepositorioProductosPorPedido>;
  let repositorioPedidoStub: SinonStubbedInstance<RepositorioPedido>;
  const createdAt = new Date;
  const updatedAt = new Date;
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
  const productosPorPedido = new ProductosPorPedido(
    1,
    pedido.id as unknown as Pedido,
    1 as unknown as ProductoSolicitado,
    1,
    createdAt,
    updatedAt
  );

  beforeEach(() => {
    repositorioProductosPorPedidoStub = createStubObj<RepositorioProductosPorPedido>(['existeIdProductosPorPedido', 'eliminar', 'obtenerPorId']);
    repositorioPedidoStub = createStubObj<RepositorioPedido>(['modificar', 'obtenerPorId']);
    servicioEliminarProductosPorPedido = new ServicioEliminarProductosPorPedido(
      repositorioProductosPorPedidoStub,
      repositorioPedidoStub,
    );
  });

  it('si el id del producto por pedido no existe no se puede eliminar y deberia retonar error', async () => {

    repositorioProductosPorPedidoStub.existeIdProductosPorPedido.returns(Promise.resolve(false));

    await expect(
      servicioEliminarProductosPorPedido.ejecutar(100),
    ).rejects.toThrow('El id: 100, no existe en la base de productos por pedido');
  });

  it('si el id del producto por pedido existe elimina el pedido en el repositorio', async () => {
    repositorioProductosPorPedidoStub.existeIdProductosPorPedido.returns(Promise.resolve(true));
    repositorioProductosPorPedidoStub.obtenerPorId.returns(Promise.resolve([productosPorPedido] as unknown as ProductosPorPedido));
    repositorioPedidoStub.obtenerPorId.returns(Promise.resolve(pedido));

    await servicioEliminarProductosPorPedido.ejecutar(1);

    expect(repositorioProductosPorPedidoStub.eliminar.getCalls().length).toBe(1);
    expect(repositorioProductosPorPedidoStub.eliminar.calledWith(1)).toBeTruthy();
    expect(repositorioPedidoStub.modificar.getCalls().length).toBe(1);
  });
});
