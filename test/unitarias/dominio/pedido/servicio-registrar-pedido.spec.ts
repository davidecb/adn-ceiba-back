import { ServicioRegistrarPedido } from 'src/dominio/pedido/servicio/servicio-registrar-pedido';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioRegistrarPedido', () => {

  let servicioRegistrarPedido: ServicioRegistrarPedido;
  let repositorioPedidoStub: SinonStubbedInstance<RepositorioPedido>;

  beforeEach(() => {

    repositorioPedidoStub = createStubObj<RepositorioPedido>(['guardar']);
    servicioRegistrarPedido = new ServicioRegistrarPedido(repositorioPedidoStub);
  });

/*   it('si el nombre de pedido ya existe no se puede crear y deberia retonar error', async () => {

    repositorioPedidoStub.existeNombrePedido.returns(Promise.resolve(true));

    await expect(
      servicioRegistrarPedido.ejecutar(
        new Pedido('llavero marvel', 12000, 40, "llaveroMarvel.jpg"),
      ),
    ).rejects.toThrow('El nombre de pedido llavero marvel ya existe');
  });

  it('si el nombre no existe guarda el pedido en el repositorio', async () => {
    const pedido = new Pedido('llavero marvel', 12000, 40, "llaveroMarvel.jpg");
    repositorioPedidoStub.existeNombrePedido.returns(Promise.resolve(false));

    await servicioRegistrarPedido.ejecutar(pedido);

    expect(repositorioPedidoStub.guardar.getCalls().length).toBe(1);
    expect(repositorioPedidoStub.guardar.calledWith(pedido)).toBeTruthy();
  }); */
});
