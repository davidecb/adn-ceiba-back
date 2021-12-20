import { DaoProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/dao/dao-producto-solicitado';
import { ServicioModificarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-modificar-producto-solicitado';
import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioModificarProductoSolicitado', () => {

  let servicioModificarProductoSolicitado: ServicioModificarProductoSolicitado;
  let repositorioProductoSolicitadoStub: SinonStubbedInstance<RepositorioProductoSolicitado>;
  let daoProductoSolicitadoStub: SinonStubbedInstance<DaoProductoSolicitado>;

  beforeEach(() => {

    repositorioProductoSolicitadoStub = createStubObj<RepositorioProductoSolicitado>(['existeIdProducto', 'existenPropiedadesProducto', 'modificar', 'calcularCostoTiempo']);
    daoProductoSolicitadoStub = createStubObj<DaoProductoSolicitado>(['obtenerPorId']);
    servicioModificarProductoSolicitado = new ServicioModificarProductoSolicitado(repositorioProductoSolicitadoStub, daoProductoSolicitadoStub);
  });

  it('si el id de producto no existe no se puede modificar y deberia retonar error', async () => {

    repositorioProductoSolicitadoStub.existeIdProducto.returns(Promise.resolve(false));
    repositorioProductoSolicitadoStub.existenPropiedadesProducto.returns(Promise.resolve(true));

    await expect(
      servicioModificarProductoSolicitado.ejecutar(100, { costo: 20000 }),
    ).rejects.toThrow('El id: 100, no existe en la base de productos');
  });

  it('si el id existe pero alguna propiedad no existe no se puede modificar y deberia retonar error', async () => {
    repositorioProductoSolicitadoStub.existeIdProducto.returns(Promise.resolve(true));
    repositorioProductoSolicitadoStub.existenPropiedadesProducto.returns(Promise.resolve(false));
    
    await expect(
      servicioModificarProductoSolicitado.ejecutar(1, { material: 'PLA' }),
    ).rejects.toThrow('Algunas propiedades enviadas no pertenecen a producto');
  });
/* 
  it('si el id y las propiedades existen deberia modificar el producto', async () => {
    repositorioProductoSolicitadoStub.existeIdProducto.returns(Promise.resolve(true));
    repositorioProductoSolicitadoStub.existenPropiedadesProducto.returns(Promise.resolve(true));
    daoProductoSolicitadoStub.obtenerPorId.returns(Promise.resolve(new ProductoSolicitadoDto()))
    await servicioModificarProductoSolicitado.ejecutar(1, { material: 'PLA' });

    expect(repositorioProductoSolicitadoStub.modificar.getCalls().length).toBe(1);
    expect(repositorioProductoSolicitadoStub.modificar.calledWith(1, { material: 'PLA' })).toBeTruthy();
  }); */
});
