import { ServicioEliminarPedido } from 'src/dominio/pedido/servicio/servicio-eliminar-pedido';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioEliminarPedido', () => {

  let servicioEliminarPedido: ServicioEliminarPedido;
  let repositorioPedidoStub: SinonStubbedInstance<RepositorioPedido>;

  beforeEach(() => {

    repositorioPedidoStub = createStubObj<RepositorioPedido>(['existeIdPedido', 'eliminar']);
    servicioEliminarPedido = new ServicioEliminarPedido(repositorioPedidoStub);
  });

  it('si el id de pedido no existe no se puede eliminar y deberia retonar error', async () => {

    repositorioPedidoStub.existeIdPedido.returns(Promise.resolve(false));

    await expect(
      servicioEliminarPedido.ejecutar(100),
    ).rejects.toThrow('El id: '100', no existe en la base de pedidos');
  });

  it('si el id de pedido existe elimina el pedido en el repositorio', async () => {
    repositorioPedidoStub.existeIdPedido.returns(Promise.resolve(true));

    await servicioEliminarPedido.ejecutar(1);

    expect(repositorioPedidoStub.eliminar.getCalls().length).toBe(1);
    expect(repositorioPedidoStub.eliminar.calledWith(1)).toBeTruthy();
  });
});
