import { ProductosPorPedido } from 'src/dominio/productos-por-pedido/modelo/productos-por-pedido';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';
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
          [],
          '',
          '',
          'inicializando',
          0,
          0,
          new Date,
          new Date
        ),
      ),
    ).rejects.toThrow('El numero de pedido 1234abcd321 ya existe');
  });

  it('si el numero de pedido no existe guarda el pedido en el repositorio', async () => {
    const pedido = new Pedido(
      1,
      '1234abcd321',
      [],
      '',
      '',
      'inicializando',
      0,
      0,
      new Date,
      new Date
    );
    repositorioPedidoStub.existeNumeroPedido.returns(Promise.resolve(false));

    await servicioRegistrarPedido.ejecutar(pedido);
    
    expect(repositorioPedidoStub.guardar.getCalls().length).toBe(1);
    expect(repositorioPedidoStub.guardar.calledWith(pedido)).toBeTruthy();
  });
});
