import { ServicioModificarPedido } from 'src/dominio/pedido/servicio/servicio-modificar-pedido';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioModificarPedido', () => {

  let servicioModificarPedido: ServicioModificarPedido;
  let repositorioPedidoStub: SinonStubbedInstance<RepositorioPedido>;

  beforeEach(() => {

    repositorioPedidoStub = createStubObj<RepositorioPedido>(['existeIdPedido', 'existenPropiedadesPedido', 'modificar']);
    servicioModificarPedido = new ServicioModificarPedido(repositorioPedidoStub);
  });

  it('si el id de pedido no existe no se puede modificar y deberia retonar error', async () => {

    repositorioPedidoStub.existeIdPedido.returns(Promise.resolve(false));
    repositorioPedidoStub.existenPropiedadesPedido.returns(Promise.resolve(true));

    await expect(
      servicioModificarPedido.ejecutar(100, { cliente: 'david' }),
    ).rejects.toThrow('El id: 100, no existe en la base de pedidos');
  });

  it('si el id existe pero alguna propiedad no existe no se puede modificar y deberia retonar error', async () => {
    repositorioPedidoStub.existeIdPedido.returns(Promise.resolve(true));
    repositorioPedidoStub.existenPropiedadesPedido.returns(Promise.resolve(false));

    await expect(
      servicioModificarPedido.ejecutar(1, { material: 'PLA' }),
    ).rejects.toThrow('Algunas propiedades enviadas no pertenecen a pedido');
  });

  it('si el id y las propiedades existen deberia modificar el pedido', async () => {
    repositorioPedidoStub.existeIdPedido.returns(Promise.resolve(true));
    repositorioPedidoStub.existenPropiedadesPedido.returns(Promise.resolve(true));

    await servicioModificarPedido.ejecutar(1, { cliente: 'david' });

    expect(repositorioPedidoStub.modificar.getCalls().length).toBe(1);
    expect(repositorioPedidoStub.modificar.calledWith(1, { cliente: 'david' })).toBeTruthy();
  });
});
