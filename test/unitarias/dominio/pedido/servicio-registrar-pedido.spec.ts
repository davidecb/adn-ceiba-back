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

  it('si el nombre no existe guarda el pedido en el repositorio', async () => {
    const pedido = new Pedido(
      '1234abcd321', {
      id: 1,
      nombre: 'Lorem ipsum',
      costo: 10000,
      tiempo: 30,
      imagen: 'loremIpsum.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    'ABS',
    'negro',
    1,
    true,
    false,
    true,
    false
    );

    await servicioRegistrarPedido.ejecutar(pedido);

    expect(repositorioPedidoStub.guardar.getCalls().length).toBe(1);
    expect(repositorioPedidoStub.guardar.calledWith(pedido)).toBeTruthy();
  }); 
});
