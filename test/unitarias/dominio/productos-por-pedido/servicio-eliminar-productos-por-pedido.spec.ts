import { ServicioEliminarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-eliminar-productos-por-pedido';
import { RepositorioProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/repositorio/repositorio-productos-por-pedido';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioEliminarProductosPorPedido', () => {

  let servicioEliminarProductosPorPedido: ServicioEliminarProductosPorPedido;
  let repositorioProductosPorPedidoStub: SinonStubbedInstance<RepositorioProductosPorPedido>;

  beforeEach(() => {

    repositorioProductosPorPedidoStub = createStubObj<RepositorioProductosPorPedido>(['existeIdProductosPorPedido', 'eliminar']);
    servicioEliminarProductosPorPedido = new ServicioEliminarProductosPorPedido(repositorioProductosPorPedidoStub);
  });

  it('si el id de pedido no existe no se puede eliminar y deberia retonar error', async () => {

    repositorioProductosPorPedidoStub.existeIdProductosPorPedido.returns(Promise.resolve(false));

    await expect(
      servicioEliminarProductosPorPedido.ejecutar(100),
    ).rejects.toThrow('El id: "100", no existe en la base de productos por pedido');
  });

  it('si el id de pedido existe elimina el pedido en el repositorio', async () => {
    repositorioProductosPorPedidoStub.existeIdProductosPorPedido.returns(Promise.resolve(true));

    await servicioEliminarProductosPorPedido.ejecutar(1);

    expect(repositorioProductosPorPedidoStub.eliminar.getCalls().length).toBe(1);
    expect(repositorioProductosPorPedidoStub.eliminar.calledWith(1)).toBeTruthy();
  });
});
