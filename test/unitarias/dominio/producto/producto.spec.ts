import { ErrorImagenInvalida } from './../../../../src/dominio/errores/error-imagen-invalida';
import { Producto } from 'src/dominio/producto/modelo/producto';

describe('Producto', () => {

  const _Producto = Producto as any;

  it('producto con imagen invalida(int) debe retornar error', () => {
    return expect(async () => new _Producto('producto testing', 10000, 45, 123))
      .rejects
      .toStrictEqual(new ErrorImagenInvalida('La imagen debe estar en formato jpg, jpeg o png'));
  });

  it('producto con imagen invalida(bool) debe retornar error', () => {
    return expect(async () => new _Producto('producto testing', 10000, 45, true))
      .rejects
      .toStrictEqual(new ErrorImagenInvalida('La imagen debe estar en formato jpg, jpeg o png'));
  });

  it('producto con imagen invalida(otro formato) debe retornar error', () => {
    return expect(async () => new _Producto('producto testing', 10000, 45, 'imagenTest.svg'))
      .rejects
      .toStrictEqual(new ErrorImagenInvalida('La imagen debe estar en formato jpg, jpeg o png'));
  });

  it('producto con imagen valida debe crearse correctamente', () => {
    const producto = new _Producto('producto testing', 10000, 45, 'imagenTest.jpg');

    expect(producto.nombre).toEqual('producto testing');
    expect(producto.costo).toEqual(10000);
    expect(producto.tiempo).toEqual(45);
    expect(producto.imagen).toEqual('imagenTest.jpg');
  });

  it('producto sin imagen debe tener imagen por defecto sin marcar error', () => {
    const producto = new _Producto('producto testing', 10000, 45);

    expect(producto.nombre).toEqual('producto testing');
    expect(producto.costo).toEqual(10000);
    expect(producto.tiempo).toEqual(45);
    expect(producto.imagen).toEqual('defaultImagen.jpg');
  });
  
  //validar costo y tiempo no sea cero?? no sea otro tipo de dato(str, bool, etc)
 
});
