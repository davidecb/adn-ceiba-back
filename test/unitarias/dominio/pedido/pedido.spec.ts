import { ErrorImagenInvalida } from "./../../../../src/dominio/errores/error-imagen-invalida";
import { Pedido } from 'src/dominio/pedido/modelo/pedido';

describe('Pedido', () => {

  const _Pedido = Pedido as any;

  /* it('pedido con imagen invalida(int) debe retornar error', () => {
    return expect(async () => new _Pedido('pedido testing', 10000, 45, 123))
      .rejects
      .toStrictEqual(new ErrorImagenInvalida('La imagen debe estar en formato jpg, jpeg o png'));
  });  */ 

  it('pedido con todos los valores debe crearse correctamente', () => {
    const pedido = new _Pedido('1234abcd321', 1, 'ABS', 'negro', 1, true, false, true, false);

    expect(pedido.numeroPedido).toEqual('1234abcd321');
    expect(pedido.producto).toEqual(1);
    expect(pedido.material).toEqual('ABS');
    expect(pedido.color).toEqual('negro');
    expect(pedido.cantidad).toEqual(1);
    expect(pedido.pulido).toEqual(true);
    expect(pedido.pintado).toEqual(false);
    expect(pedido.barnizado).toEqual(true);
    expect(pedido.urgente).toEqual(false);
  }); 

  it('pedido puede crearse correctamente con numero de pedido y producto', () => {
    const pedido = new _Pedido('1234abcd321', 1);

    expect(pedido.numeroPedido).toEqual('1234abcd321');
    expect(pedido.producto).toEqual(1);
    expect(pedido.material).toEqual('PLA');
    expect(pedido.color).toEqual('blanco');
    expect(pedido.cantidad).toEqual(1);
    expect(pedido.pulido).toEqual(false);
    expect(pedido.pintado).toEqual(false);
    expect(pedido.barnizado).toEqual(false);
    expect(pedido.urgente).toEqual(false);
  }); 
});
