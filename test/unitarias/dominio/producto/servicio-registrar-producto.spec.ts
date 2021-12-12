import { ServicioRegistrarProducto } from 'src/dominio/producto/servicio/servicio-registrar-producto';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioRegistrarProducto', () => {

  let servicioRegistrarProducto: ServicioRegistrarProducto;
  let repositorioProductoStub: SinonStubbedInstance<RepositorioProducto>;

  beforeEach(() => {

    repositorioProductoStub = createStubObj<RepositorioProducto>(['existeNombreProducto', 'guardar']);
    servicioRegistrarProducto = new ServicioRegistrarProducto(repositorioProductoStub);
  });

  it('si el nombre de producto ya existe no se puede crear y deberia retonar error', async () => {

    repositorioProductoStub.existeNombreProducto.returns(Promise.resolve(true));

    await expect(
      servicioRegistrarProducto.ejecutar(
        new Producto('llavero marvel', 12000, 40, "llaveroMarvel.jpg"),
      ),
    ).rejects.toThrow('El nombre de producto llavero marvel ya existe');
  });

  it('si el nombre no existe guarda el producto en el repositorio', async () => {
    const producto = new Producto('llavero marvel', 12000, 40, "llaveroMarvel.jpg");
    repositorioProductoStub.existeNombreProducto.returns(Promise.resolve(false));

    await servicioRegistrarProducto.ejecutar(producto);

    expect(repositorioProductoStub.guardar.getCalls().length).toBe(1);
    expect(repositorioProductoStub.guardar.calledWith(producto)).toBeTruthy();
  });
});
