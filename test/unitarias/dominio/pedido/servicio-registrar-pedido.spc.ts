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
});
