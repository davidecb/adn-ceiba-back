import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { PedidoControlador } from 'src/infraestructura/pedido/controlador/pedido.controlador';
import { ServicioRegistrarPedido } from 'src/dominio/pedido/servicio/servicio-registrar-pedido';
import { servicioRegistrarPedidoProveedor } from 'src/infraestructura/pedido/proveedor/servicio/servicio-registrar-pedido.proveedor';
import { ManejadorRegistrarPedido } from 'src/aplicacion/pedido/comando/registar-pedido.manejador';
import { ManejadorListarPedido } from 'src/aplicacion/pedido/consulta/listar-pedidos.manejador';
import { ComandoRegistrarPedido } from 'src/aplicacion/pedido/comando/registrar-pedido.comando';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { ServicioEliminarPedido } from 'src/dominio/pedido/servicio/servicio-eliminar-pedido';
import { servicioEliminarPedidoProveedor } from 'src/infraestructura/pedido/proveedor/servicio/servicio-eliminar-pedido.proveedor';
import { ServicioModificarPedido } from 'src/dominio/pedido/servicio/servicio-modificar-pedido';
import { servicioModificarPedidoProveedor } from 'src/infraestructura/pedido/proveedor/servicio/servicio-modificar-pedido.proveedor';
import { ManejadorEliminarPedido } from 'src/aplicacion/pedido/comando/eliminar-pedido.manejador';
import { ManejadorModificarPedido } from 'src/aplicacion/pedido/comando/modificar-pedido.manejador';
import { ManejadorObtenerPedido } from 'src/aplicacion/pedido/consulta/obtener-pedido.manejador';
import { ManejadorObtenerPedidosPorEstado } from 'src/aplicacion/pedido/consulta/obtener-pedidos-por-estado.manejador';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de pedido', () => {

  let app: INestApplication;
  let repositorioPedido: SinonStubbedInstance<RepositorioPedido>;
  let daoPedido: SinonStubbedInstance<DaoPedido>;
/*
  const producto = new Producto(
    1,
    'Lorem ipsum',
    10000,
    30,
    'loremIpsum.jpg',
    new Date(),
    new Date()
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
      new Date,
      new Date
  );

   const productosPorPedido = new ProductosPorPedido(
    1,
    new Pedido(),
    productoSolicitado,
    2,
    new Date,
    new Date
  ); */

  const pedido : ComandoRegistrarPedido = {
    id: 1,
    numeroPedido: '123',
    productosSolicitados: [],
    direccion: 'cra 43 42 41',
    cliente: 'david cortes',
    estado: 'inicializando',
    costo: 1000,
    tiempo: 10,
    createdAt: new Date,
    updatedAt: new Date
  }
  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioPedido = createStubObj<RepositorioPedido>(['guardar', 'existeIdPedido', 'existenPropiedadesPedido'], sinonSandbox);
    daoPedido = createStubObj<DaoPedido>(['listar', 'obtenerPorId', 'obtenerPedidosPorEstado'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [PedidoControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarPedido,
          inject: [RepositorioPedido],
          useFactory: servicioRegistrarPedidoProveedor,
        },
        {
          provide: ServicioEliminarPedido,
          inject: [RepositorioPedido],
          useFactory: servicioEliminarPedidoProveedor,
        },
        {
          provide: ServicioModificarPedido,
          inject: [RepositorioPedido],
          useFactory: servicioModificarPedidoProveedor,
        },
        { provide: RepositorioPedido, useValue: repositorioPedido },
        { provide: DaoPedido, useValue: daoPedido },
        ManejadorRegistrarPedido,
        ManejadorEliminarPedido,
        ManejadorModificarPedido,
        ManejadorListarPedido,
        ManejadorObtenerPedido,
        ManejadorObtenerPedidosPorEstado,
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

  it('debería listar los pedidos registrados', () => {

    const pedidos: any[] = [{
      numeroPedido: '123',
      productosSolicitados: [],
      direccion: 'cra 43 42 41',
      cliente: 'david cortes',
      estado: 'inicializando',
      costo: 1000,
      tiempo: 10
    }];
    daoPedido.listar.returns(Promise.resolve(pedidos));

    return request(app.getHttpServer())
      .get('/pedidos')
      .expect(HttpStatus.OK)
      .expect(pedidos);
  });

  it('debería obtener un pedido por id', () => {

    const pedido: any = {
      numeroPedido: '123',
      productosSolicitados: [],
      direccion: 'cra 43 42 41',
      cliente: 'david cortes',
      estado: 'inicializando',
      costo: 1000,
      tiempo: 10
    };
    daoPedido.obtenerPorId.returns(Promise.resolve(pedido));

    return request(app.getHttpServer())
      .get('/pedidos/1')
      .expect(HttpStatus.OK)
      .expect(pedido);
  });

  it('debería obtener pedidos por estado', () => {

    const pedidos: any[] = [{
      numeroPedido: '123',
      productosSolicitados: [],
      direccion: 'cra 43 42 41',
      cliente: 'david cortes',
      estado: 'inicializando',
      costo: 1000,
      tiempo: 10
    }];
    daoPedido.obtenerPedidosPorEstado.returns(Promise.resolve(pedidos));

    return request(app.getHttpServer())
      .get('/pedidos/estado?estado=inicializando')
      .expect(HttpStatus.OK)
      .expect(pedidos);
  });

  it('debería fallar al eliminar un pedido no existente', async () => {
    
    const mensaje = `El id: ${pedido.id}, no existe en la base de pedidos`;
    repositorioPedido.existeIdPedido.returns(Promise.resolve(false));

    const response = await request(app.getHttpServer())
      .delete(`/pedidos/${pedido.id}`).send(pedido)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al modificar un pedido no existente', async () => {
    
    const mensaje = `El id: ${pedido.id}, no existe en la base de pedidos`;
    repositorioPedido.existeIdPedido.returns(Promise.resolve(false));

    const response = await request(app.getHttpServer())
      .patch(`/pedidos/${pedido.id}`).send(pedido)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al modificar un pedido con propiedades no existentes', async () => {
    
    const mensaje = `Algunas propiedades enviadas no pertenecen a pedido`;
    repositorioPedido.existeIdPedido.returns(Promise.resolve(true));
    repositorioPedido.existenPropiedadesPedido.returns(Promise.resolve(false));

    const response = await request(app.getHttpServer())
      .patch(`/pedidos/${pedido.id}`).send(pedido)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});
