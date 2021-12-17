import { ServicioModificarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-modificar-productos-por-pedido';
import { RepositorioProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/repositorio/repositorio-productos-por-pedido';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioModificarProductosPorPedido', () => {

  let servicioModificarProductosPorPedido: ServicioModificarProductosPorPedido;
  let repositorioProductosPorPedidoStub: SinonStubbedInstance<RepositorioProductosPorPedido>;

  beforeEach(() => {

    repositorioProductosPorPedidoStub = createStubObj<RepositorioProductosPorPedido>(['existeIdProductosPorPedido', 'existenPropiedadesProductosPorPedido', 'modificar']);
    servicioModificarProductosPorPedido = new ServicioModificarProductosPorPedido(repositorioProductosPorPedidoStub);
  });

  it('si el id de pedido no existe no se puede modificar y deberia retonar error', async () => {

    repositorioProductosPorPedidoStub.existeIdProductosPorPedido.returns(Promise.resolve(false));
    repositorioProductosPorPedidoStub.existenPropiedadesProductosPorPedido.returns(Promise.resolve(true));

    await expect(
      servicioModificarProductosPorPedido.ejecutar(100, { costo: 20000 }),
    ).rejects.toThrow('El id: '100', no existe en la base de productos por pedido');
  });

  it('si el id existe pero alguna propiedad no existe no se puede modificar y deberia retonar error', async () => {
    repositorioProductosPorPedidoStub.existeIdProductosPorPedido.returns(Promise.resolve(true));
    repositorioProductosPorPedidoStub.existenPropiedadesProductosPorPedido.returns(Promise.resolve(false));

    await expect(
      servicioModificarProductosPorPedido.ejecutar(1, { material: 'PLA' }),
    ).rejects.toThrow('Algunas propiedades enviadas no pertenecen a productos por pedido');
  });

  it('si el id y las propiedades existen deberia modificar el pedido', async () => {
    repositorioProductosPorPedidoStub.existeIdProductosPorPedido.returns(Promise.resolve(true));
    repositorioProductosPorPedidoStub.existenPropiedadesProductosPorPedido.returns(Promise.resolve(true));

    await servicioModificarProductosPorPedido.ejecutar(1, { cantidad: 3 });

    expect(repositorioProductosPorPedidoStub.modificar.getCalls().length).toBe(1);
    expect(repositorioProductosPorPedidoStub.modificar.calledWith(1, { cantidad: 3 })).toBeTruthy();
  });
});
