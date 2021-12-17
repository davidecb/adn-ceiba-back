import { ServicioRegistrarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-registrar-producto-solicitado';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';
import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { Producto } from 'src/dominio/producto/modelo/producto';


describe('ServicioRegistrarProductoSolicitado', () => {

  let servicioRegistrarProductoSolicitado: ServicioRegistrarProductoSolicitado;
  let repositorioProductoSolicitadoStub: SinonStubbedInstance<RepositorioProductoSolicitado>;
  const producto = new Producto(1, 'producto-solicitado testing', 10000, 45, 'imagenTest.jpg', new Date, new Date);

  beforeEach(() => {

    repositorioProductoSolicitadoStub = createStubObj<RepositorioProductoSolicitado>(['calcularCostoTiempo', 'guardar']);
    servicioRegistrarProductoSolicitado = new ServicioRegistrarProductoSolicitado(repositorioProductoSolicitadoStub);
  });

  it('guardar un producto en el repositorio', async () => {
    const productoSolicitado = new ProductoSolicitado(
      1,
      producto,
      'PLA',
      'negro',
      {
        pulido: true,
        pintado: false,
        barnizado: true
      },
      false,
      15000,
      45,
      new Date,
      new Date
      );

    repositorioProductoSolicitadoStub.calcularCostoTiempo.returns(Promise.resolve({ costo: 22500, tiempo: 90 }));

    await servicioRegistrarProductoSolicitado.ejecutar(productoSolicitado);

    expect(repositorioProductoSolicitadoStub.guardar.getCalls().length).toBe(1);
    expect(repositorioProductoSolicitadoStub.guardar.calledWith(productoSolicitado)).toBeTruthy();
  });
});
