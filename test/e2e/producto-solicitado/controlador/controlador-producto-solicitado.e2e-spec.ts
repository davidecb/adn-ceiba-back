import { RepositorioProducto } from "src/dominio/producto/puerto/repositorio/repositorio-producto";
import { ManejadorObtenerProductoSolicitado } from 'src/aplicacion/producto-solicitado/consulta/obtener-producto-solicitado.manejador';
import { ManejadorEliminarProductoSolicitado } from 'src/aplicacion/producto-solicitado/comando/eliminar-producto-solicitado.manejador';
import { ServicioEliminarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-eliminar-producto-solicitado';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';
import { DaoProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/dao/dao-producto-solicitado';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { ProductoSolicitadoControlador } from 'src/infraestructura/producto-solicitado/controlador/producto-solicitado.controlador';
import { ServicioRegistrarProductoSolicitado } from 'src/dominio/producto-solicitado/servicio/servicio-registrar-producto-solicitado';
import { servicioRegistrarProductoSolicitadoProveedor } from 'src/infraestructura/producto-solicitado/proveedor/servicio/servicio-registrar-producto-solicitado.proveedor';
import { ManejadorRegistrarProductoSolicitado } from 'src/aplicacion/producto-solicitado/comando/registar-producto-solicitado.manejador';
import { ManejadorListarProductoSolicitado } from 'src/aplicacion/producto-solicitado/consulta/listar-productos-solicitados.manejador';
import { ComandoRegistrarProductoSolicitado } from 'src/aplicacion/producto-solicitado/comando/registrar-producto-solicitado.comando';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { servicioEliminarProductoSolicitadoProveedor } from 'src/infraestructura/producto-solicitado/proveedor/servicio/servicio-eliminar-producto-solicitado.proveedor';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de producto-solicitados', () => {

  let app: INestApplication;
  let repositorioProductoSolicitado: SinonStubbedInstance<RepositorioProductoSolicitado>;
  let daoProductoSolicitado: SinonStubbedInstance<DaoProductoSolicitado>;
  let repositorioProducto: SinonStubbedInstance<RepositorioProducto>;

  const createdAt = new Date;
  const updatedAt = new Date;
  const producto = new Producto(
    1,
    'Lorem ipsum',
    10000,
    30,
    'loremIpsum.jpg',
    createdAt,
    updatedAt
  );
  const productoSolicitado: ComandoRegistrarProductoSolicitado = { 
    id: 1,
    producto,
    material: 'PLA',
    color: 'blanco',
    acabado: {
      pulido: false,
      pintado: false,
      barnizado: false
    },
    urgencia: false,
    costo: 100,
    tiempo: 10,
    createdAt,
    updatedAt
  };
  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioProductoSolicitado = createStubObj<RepositorioProductoSolicitado>(['guardar', 'modificar', 'eliminar', 'existeIdProducto', 'existenPropiedadesProducto'], sinonSandbox);
    daoProductoSolicitado = createStubObj<DaoProductoSolicitado>(['listar', 'obtenerPorId'], sinonSandbox);
    repositorioProducto = createStubObj<RepositorioProducto>(['obtenerPorId'], sinonSandbox);
    
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductoSolicitadoControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarProductoSolicitado,
          inject: [RepositorioProductoSolicitado],
          useFactory: servicioRegistrarProductoSolicitadoProveedor,
        },
        {
          provide: ServicioEliminarProductoSolicitado,
          inject: [RepositorioProductoSolicitado],
          useFactory: servicioEliminarProductoSolicitadoProveedor,
        },        
        { provide: RepositorioProductoSolicitado, useValue: repositorioProductoSolicitado },
        { provide: RepositorioProducto, useValue: repositorioProducto },
        { provide: DaoProductoSolicitado, useValue: daoProductoSolicitado },
        ManejadorRegistrarProductoSolicitado,
        ManejadorEliminarProductoSolicitado,
        ManejadorListarProductoSolicitado,
        ManejadorObtenerProductoSolicitado,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería crear un producto solicitado', () => {
    repositorioProductoSolicitado.existeIdProducto.returns(Promise.resolve(false));
    repositorioProducto.obtenerPorId.returns(Promise.resolve(producto));
    
    return request(app.getHttpServer())
      .post('/productos-solicitados').send({
        producto: productoSolicitado.producto.id,
        material: productoSolicitado.material,
        color: productoSolicitado.color,
        acabado: productoSolicitado.acabado,
        urgencia: productoSolicitado.urgencia
      })
      .expect(HttpStatus.CREATED)
  });
 
  it('debería listar los productos solicitados registrados', () => {

    const productosSolicitados: any[] = [{
      id: productoSolicitado.id,
      producto: {},
      material: productoSolicitado.material,
      color: productoSolicitado.color,
      acabado: productoSolicitado.acabado,
      urgencia: productoSolicitado.urgencia,
      costo: productoSolicitado.costo,
      tiempo: productoSolicitado.tiempo,
      createdAt: productoSolicitado.createdAt.toISOString(),
      updatedAt: productoSolicitado.updatedAt.toISOString()
    }]; 
    daoProductoSolicitado.listar.returns(Promise.resolve(productosSolicitados));

    return request(app.getHttpServer())
      .get('/productos-solicitados')
      .expect(HttpStatus.OK)
      .expect(productosSolicitados);
  });

  it('debería obtener un productoSolicitado por id', () => {

    daoProductoSolicitado.obtenerPorId.returns(Promise.resolve(productoSolicitado));

    return request(app.getHttpServer())
      .get(`/productos-solicitados/${productoSolicitado.id}`)
      .expect(HttpStatus.OK)
      .expect({
        id: productoSolicitado.id,
        producto: {},
        material: productoSolicitado.material,
        color: productoSolicitado.color,
        acabado: productoSolicitado.acabado,
        urgencia: productoSolicitado.urgencia,
        costo: productoSolicitado.costo,
        tiempo: productoSolicitado.tiempo,
        createdAt: productoSolicitado.createdAt.toISOString(),
        updatedAt: productoSolicitado.updatedAt.toISOString()
      });
  }); 

  it('debería fallar al eliminar un productoSolicitado no existente', async () => {
    
    const mensaje = `El id: ${productoSolicitado.id}, no existe en la base de productos`;
    repositorioProductoSolicitado.existeIdProducto.returns(Promise.resolve(false));

    const response = await request(app.getHttpServer())
      .delete(`/productos-solicitados/${productoSolicitado.id}`)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería eliminar un producto solicitado', () => {
    repositorioProductoSolicitado.existeIdProducto.returns(Promise.resolve(true));
    
    return request(app.getHttpServer())
      .delete(`/productos-solicitados/${productoSolicitado.id}`)
      .expect(HttpStatus.OK)
  });
  
  it('debería modificar un producto solicitado', () => {
    repositorioProductoSolicitado.existeIdProducto.returns(Promise.resolve(true));
    repositorioProducto.obtenerPorId.returns(Promise.resolve(producto));
    
    return request(app.getHttpServer())
      .post('/productos-solicitados').send({
        id: 1,
        producto: productoSolicitado.producto.id,
        material: productoSolicitado.material,
        color: productoSolicitado.color,
        acabado: productoSolicitado.acabado,
        urgencia: productoSolicitado.urgencia
      })
      .expect(HttpStatus.CREATED)
  });
});
