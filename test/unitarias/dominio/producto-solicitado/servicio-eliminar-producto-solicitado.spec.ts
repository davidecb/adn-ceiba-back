import { ServicioEliminarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-eliminar-producto-solicitado';
import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioEliminarProductoSolicitado', () => {

  let servicioEliminarProductoSolicitado: ServicioEliminarProductoSolicitado;
  let repositorioProductoSolicitadoStub: SinonStubbedInstance<RepositorioProductoSolicitado>;

  beforeEach(() => {

    repositorioProductoSolicitadoStub = createStubObj<RepositorioProductoSolicitado>(['existeIdProducto', 'eliminar']);
    servicioEliminarProductoSolicitado = new ServicioEliminarProductoSolicitado(repositorioProductoSolicitadoStub);
  });

  it('si el id de producto no existe no se puede eliminar y deberia retonar error', async () => {

    repositorioProductoSolicitadoStub.existeIdProducto.returns(Promise.resolve(false));

    await expect(
      servicioEliminarProductoSolicitado.ejecutar(100),
    ).rejects.toThrow('El id: "100", no existe en la base de productos');
  });

  it('si el id de producto existe elimina el producto en el repositorio', async () => {
    repositorioProductoSolicitadoStub.existeIdProducto.returns(Promise.resolve(true));

    await servicioEliminarProductoSolicitado.ejecutar(1);

    expect(repositorioProductoSolicitadoStub.eliminar.getCalls().length).toBe(1);
    expect(repositorioProductoSolicitadoStub.eliminar.calledWith(1)).toBeTruthy();
  });
});
