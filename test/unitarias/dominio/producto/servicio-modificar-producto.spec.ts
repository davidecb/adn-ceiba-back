import { ServicioModificarProducto } from 'src/dominio/producto/servicio/servicio-modificar-producto';
import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioModificarProducto', () => {

  let servicioModificarProducto: ServicioModificarProducto;
  let repositorioProductoStub: SinonStubbedInstance<RepositorioProducto>;

  beforeEach(() => {

    repositorioProductoStub = createStubObj<RepositorioProducto>(['existeIdProducto', 'existenPropiedadesProducto', 'modificar']);
    servicioModificarProducto = new ServicioModificarProducto(repositorioProductoStub);
  });

  it('si el id de producto no existe no se puede modificar y deberia retonar error', async () => {

    repositorioProductoStub.existeIdProducto.returns(Promise.resolve(false));
    repositorioProductoStub.existenPropiedadesProducto.returns(Promise.resolve(true));

    await expect(
      servicioModificarProducto.ejecutar(100, { costo: 20000 }),
    ).rejects.toThrow('El id: 100, no existe en la base de productos');
  });

  it('si el id existe pero alguna propiedad no existe no se puede modificar y deberia retonar error', async () => {
    repositorioProductoStub.existeIdProducto.returns(Promise.resolve(true));
    repositorioProductoStub.existenPropiedadesProducto.returns(Promise.resolve(false));

    await expect(
      servicioModificarProducto.ejecutar(1, { material: 'PLA' }),
    ).rejects.toThrow('Algunas propiedades enviadas no pertenecen a producto');
  });

  it('si el id y las propiedades existen deberia modificar el producto', async () => {
    repositorioProductoStub.existeIdProducto.returns(Promise.resolve(true));
    repositorioProductoStub.existenPropiedadesProducto.returns(Promise.resolve(true));

    await servicioModificarProducto.ejecutar(1, { material: 'PLA' });

    expect(repositorioProductoStub.modificar.getCalls().length).toBe(1);
    expect(repositorioProductoStub.modificar.calledWith(1, { material: 'PLA' })).toBeTruthy();
  });
});
