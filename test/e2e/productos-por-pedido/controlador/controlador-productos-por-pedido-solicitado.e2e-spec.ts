import { RepositorioProductoSolicitado } from 'src/dominio/producto-solicitado/puerto/repositorio/repositorio-producto-solicitado';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { RepositorioProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/repositorio/repositorio-productos-por-pedido';
import { DaoProductosPorPedido } from 'src/dominio/productos-por-pedido/puerto/dao/dao-productos-por-pedido';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { ProductosPorPedidoControlador } from 'src/infraestructura/productos-por-pedido/controlador/productos-por-pedido.controlador';
import { ServicioRegistrarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-registrar-productos-por-pedido';
import { servicioRegistrarProductosPorPedidoProveedor } from 'src/infraestructura/productos-por-pedido/proveedor/servicio/servicio-registrar-productos-por-pedido.proveedor';
import { ManejadorRegistrarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/comando/registar-productos-por-pedido.manejador';
import { ManejadorListarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/consulta/listar-productos-por-pedido.manejador';
import { ComandoRegistrarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/comando/registrar-productos-por-pedido.comando';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { ProductoSolicitado } from 'src/dominio/producto-solicitado/modelo/producto-solicitado';
import { ServicioEliminarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-eliminar-productos-por-pedido';
import { servicioEliminarProductosPorPedidoProveedor } from 'src/infraestructura/productos-por-pedido/proveedor/servicio/servicio-eliminar-productos-por-pedido.proveedor';
import { ServicioModificarProductosPorPedido } from 'src/dominio/productos-por-pedido/servicio/servicio-modificar-productos-por-pedido';
import { servicioModificarProductosPorPedidoProveedor } from 'src/infraestructura/productos-por-pedido/proveedor/servicio/servicio-modificar-productos-por-pedido.proveedor';
import { ManejadorEliminarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/comando/eliminar-productos-por-pedido.manejador';
import { ManejadorModificarProductosPorPedido } from 'src/aplicacion/productos-por-pedido/comando/modificar-productos-por-pedido.manejador';
import { ManejadorObtenerProductosPorPedido } from 'src/aplicacion/productos-por-pedido/consulta/obtener-producto-por-pedido.manejador';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { ProductosPorPedido } from 'src/dominio/productos-por-pedido/modelo/productos-por-pedido';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de productos por pedido', () => {

  let app: INestApplication;
  let repositorioProductosPorPedido: SinonStubbedInstance<RepositorioProductosPorPedido>;
  let daoProductosPorPedido: SinonStubbedInstance<DaoProductosPorPedido>;
  let repositorioProductoSolicitado: SinonStubbedInstance<RepositorioProductoSolicitado>;
  let repositorioPedido: SinonStubbedInstance<RepositorioPedido>;

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

  const productoSolicitado = new ProductoSolicitado(
    1,
    producto,
    'PLA',
    'blanco',
      {
        pulido: false,
        pintado: false,
        barnizado: false
      },
      false,
      100,
      10,
      createdAt,
      updatedAt
  );

  const pedido = new Pedido(
    1,
    '123456',
    [],
    'cra 44 55 - 66',
    'davidCortes',
    'inicializando',
    1000,
    15,
    createdAt,
    updatedAt
  );

  const productosPorPedido : ComandoRegistrarProductosPorPedido = {
    id: 1,
    pedido: pedido,
    productoSolicitado: productoSolicitado,
    cantidad: 2,
    createdAt,
    updatedAt
  }
  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioProductosPorPedido = createStubObj<RepositorioProductosPorPedido>(['guardar', 'modificar', 'eliminar', 'existeIdProductosPorPedido', 'existenPropiedadesProductosPorPedido', 'obtenerPorId'], sinonSandbox);
    repositorioProductoSolicitado = createStubObj<RepositorioProductoSolicitado>(['obtenerPorId'], sinonSandbox);
    repositorioPedido = createStubObj<RepositorioPedido>(['obtenerPorId', 'modificar'], sinonSandbox);
    daoProductosPorPedido = createStubObj<DaoProductosPorPedido>(['listar', 'obtenerPorId'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductosPorPedidoControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarProductosPorPedido,
          inject: [RepositorioProductosPorPedido, RepositorioPedido],
          useFactory: servicioRegistrarProductosPorPedidoProveedor,
        },
        {
          provide: ServicioEliminarProductosPorPedido,
          inject: [RepositorioProductosPorPedido, RepositorioPedido],
          useFactory: servicioEliminarProductosPorPedidoProveedor,
        },
        {
          provide: ServicioModificarProductosPorPedido,
          inject: [RepositorioProductosPorPedido],
          useFactory: servicioModificarProductosPorPedidoProveedor,
        },
        { provide: RepositorioProductosPorPedido, useValue: repositorioProductosPorPedido },
        { provide: RepositorioProductoSolicitado, useValue: repositorioProductoSolicitado },
        { provide: RepositorioPedido, useValue: repositorioPedido },
        { provide: DaoProductosPorPedido, useValue: daoProductosPorPedido },
        ManejadorRegistrarProductosPorPedido,
        ManejadorEliminarProductosPorPedido,
        ManejadorModificarProductosPorPedido,
        ManejadorListarProductosPorPedido,
        ManejadorObtenerProductosPorPedido,
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
  
  it('debería crear un producto por pedido', () => {
    repositorioPedido.obtenerPorId.returns(Promise.resolve(pedido));
    repositorioProductosPorPedido.existeIdProductosPorPedido.returns(Promise.resolve(false));
    repositorioProductoSolicitado.obtenerPorId.returns(Promise.resolve(productoSolicitado));
    
    return request(app.getHttpServer())
      .post('/productos-por-pedido').send({
        pedido: productosPorPedido.pedido.id,
        productoSolicitado: productosPorPedido.productoSolicitado.id,
        cantidad: productosPorPedido.cantidad,
      })
      .expect(HttpStatus.CREATED)
  });

  it('debería listar los producto por pedido registrados', () => {

    const productosPorPedidoArray: any[] = [{
      pedido: 1,
      productoSolicitado: 2,
      cantidad: 2
    }];
    daoProductosPorPedido.listar.returns(Promise.resolve(productosPorPedidoArray));

    return request(app.getHttpServer())
      .get('/productos-por-pedido')
      .expect(HttpStatus.OK)
      .expect(productosPorPedidoArray);
  });
  
  it('debería obtener un producto por pedido por id', () => {
    const productosPorPedido : any = {
      id: 1,
      pedido: {},
      productoSolicitado: {},
      cantidad: 2,
      createdAt,
      updatedAt
    };

    daoProductosPorPedido.obtenerPorId.returns(Promise.resolve(productosPorPedido));

    return request(app.getHttpServer())
      .get(`/productos-por-pedido/${productosPorPedido.id}`)
      .expect(HttpStatus.OK)
      .expect({
        id: productosPorPedido.id,
        pedido: productosPorPedido.pedido,
        cantidad: productosPorPedido.cantidad,
        productoSolicitado: productosPorPedido.productoSolicitado,
        createdAt: productosPorPedido.createdAt.toISOString(),
        updatedAt: productosPorPedido.updatedAt.toISOString()
      });
  });

  it('debería fallar al eliminar un productos Por Pedido no existente', async () => {
    
    const mensaje = `El id: ${productosPorPedido.id}, no existe en la base de productos por pedido`;
    repositorioProductosPorPedido.existeIdProductosPorPedido.returns(Promise.resolve(false));

    const response = await request(app.getHttpServer())
      .delete(`/productos-por-pedido/${productosPorPedido.id}`)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  
  it('debería eliminar un producto Por Pedido por id', () => {
    repositorioPedido.obtenerPorId.returns(Promise.resolve(pedido));
    repositorioProductosPorPedido.existeIdProductosPorPedido.returns(Promise.resolve(true));
    repositorioProductosPorPedido.obtenerPorId.returns(Promise.resolve(productosPorPedido as ProductosPorPedido))

    return request(app.getHttpServer())
      .delete(`/productos-por-pedido/${productosPorPedido.id}`)
      .expect(HttpStatus.OK);
  });

  it('debería fallar al modificar un productos Por Pedido no existente', async () => {
    
    const mensaje = `El id: ${productosPorPedido.id}, no existe en la base de productos por pedido`;
    repositorioProductosPorPedido.existeIdProductosPorPedido.returns(Promise.resolve(false));

    const response = await request(app.getHttpServer())
      .patch(`/productos-por-pedido/${productosPorPedido.id}`).send(productosPorPedido)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al modificar un productos Por Pedido con propiedades no existentes', async () => {
    
    const mensaje = `Algunas propiedades enviadas no pertenecen a productos por pedido`;
    repositorioProductosPorPedido.existeIdProductosPorPedido.returns(Promise.resolve(true));
    repositorioProductosPorPedido.existenPropiedadesProductosPorPedido.returns(Promise.resolve(false));

    const response = await request(app.getHttpServer())
      .patch(`/productos-por-pedido/${productosPorPedido.id}`).send(productosPorPedido)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
    
  it('debería modificar un producto Por Pedido por id', () => {

    repositorioProductosPorPedido.existeIdProductosPorPedido.returns(Promise.resolve(true));
    repositorioProductosPorPedido.existenPropiedadesProductosPorPedido.returns(Promise.resolve(true));

    return request(app.getHttpServer())
      .patch(`/productos-por-pedido/${productosPorPedido.id}`).send(productosPorPedido)
      .expect(HttpStatus.OK);
  });
});
