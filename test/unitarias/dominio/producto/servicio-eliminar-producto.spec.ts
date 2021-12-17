import { ServicioEliminarProducto } from 'src/dominio/producto/servicio/servicio-eliminar-producto';
import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioEliminarProducto', () => {

  let servicioEliminarProducto: ServicioEliminarProducto;
  let repositorioProductoStub: SinonStubbedInstance<RepositorioProducto>;

  beforeEach(() => {

    repositorioProductoStub = createStubObj<RepositorioProducto>(['existeIdProducto', 'eliminar']);
    servicioEliminarProducto = new ServicioEliminarProducto(repositorioProductoStub);
  });

  it('si el id de producto no existe no se puede eliminar y deberia retonar error', async () => {

    repositorioProductoStub.existeIdProducto.returns(Promise.resolve(false));

    await expect(
      servicioEliminarProducto.ejecutar(100),
    ).rejects.toThrow('El id: 100, no existe en la base de productos');
  });

  it('si el id de producto existe elimina el producto en el repositorio', async () => {
    repositorioProductoStub.existeIdProducto.returns(Promise.resolve(true));

    await servicioEliminarProducto.ejecutar(1);

    expect(repositorioProductoStub.eliminar.getCalls().length).toBe(1);
    expect(repositorioProductoStub.eliminar.calledWith(1)).toBeTruthy();
  });
});
