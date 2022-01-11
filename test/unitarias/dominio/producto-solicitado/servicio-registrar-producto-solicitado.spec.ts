import { ServicioRegistrarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-registrar-producto-solicitado';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';
import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { Producto } from 'src/dominio/producto/modelo/producto';


describe('ServicioRegistrarProductoSolicitado', () => {

  let servicioRegistrarProductoSolicitado: ServicioRegistrarProductoSolicitado;
  let repositorioProductoSolicitadoStub: SinonStubbedInstance<RepositorioProductoSolicitado>;
  const producto = new Producto(1, 'producto-solicitado testing', 10000, 30, 'imagenTest.jpg', new Date, new Date);

  beforeEach(() => {

    repositorioProductoSolicitadoStub = createStubObj<RepositorioProductoSolicitado>(['guardar', 'existeIdProducto', 'modificar']);
    servicioRegistrarProductoSolicitado = new ServicioRegistrarProductoSolicitado(repositorioProductoSolicitadoStub);
  });

  it('Al guardar un producto solicitado si el id no existe debe guardarlo y calcular costo y tiempo', async () => {
    const productoSolicitado = new ProductoSolicitado(
      1,
      producto,
      'ABS',
      'madera',
      {
        pulido: true,
        pintado: false,
        barnizado: true
      },
      false,
      0,
      0,
      new Date,
      new Date
    );
    repositorioProductoSolicitadoStub.existeIdProducto.returns(Promise.resolve(false));
    
    await servicioRegistrarProductoSolicitado.ejecutar(productoSolicitado);
    expect(productoSolicitado.costo).toBe(20000);
    expect(productoSolicitado.tiempo).toBe(66);
    expect(repositorioProductoSolicitadoStub.guardar.getCalls().length).toBe(1);
    expect(repositorioProductoSolicitadoStub.guardar.calledWith(productoSolicitado)).toBeTruthy();
  });

  it('Al guardar un producto solicitado si el id existe debe modificarlo y recalcular costo y tiempo', async () => {
    const productoSolicitado = new ProductoSolicitado(
      1,
      producto,
      'ABS',
      'plata',
      {
        pulido: true,
        pintado: false,
        barnizado: false
      },
      false,
      0,
      0,
      new Date,
      new Date
    );
    repositorioProductoSolicitadoStub.existeIdProducto.returns(Promise.resolve(true));
    await servicioRegistrarProductoSolicitado.ejecutar(productoSolicitado);
    expect(productoSolicitado.costo).toBe(18000);
    expect(productoSolicitado.tiempo).toBe(48);
    expect(repositorioProductoSolicitadoStub.modificar.getCalls().length).toBe(1);
    expect(repositorioProductoSolicitadoStub.modificar.calledWith(productoSolicitado)).toBeTruthy();
  });
});
