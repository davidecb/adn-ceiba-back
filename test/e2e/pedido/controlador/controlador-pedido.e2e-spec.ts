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

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de pedidos', () => {

  let app: INestApplication;
  let repositorioPedido: SinonStubbedInstance<RepositorioPedido>;
  let daoPedido: SinonStubbedInstance<DaoPedido>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioPedido = createStubObj<RepositorioPedido>(['guardar'], sinonSandbox);
    daoPedido = createStubObj<DaoPedido>(['listar'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [PedidoControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarPedido,
          inject: [RepositorioPedido],
          useFactory: servicioRegistrarPedidoProveedor,
        },
        { provide: RepositorioPedido, useValue: repositorioPedido },
        { provide: DaoPedido, useValue: daoPedido },
        ManejadorRegistrarPedido,
        ManejadorListarPedido,
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
      numeroPedido: '1234abcd321',
      producto: 1,
      material: 'PLA',
      color: 'blanco',
      cantidad: 1,
      pulido: false,
      pintado: false,
      barnizado: false,
      urgente: false,
    }];
    daoPedido.listar.returns(Promise.resolve(pedidos));

    return request(app.getHttpServer())
      .get('/pedidos')
      .expect(HttpStatus.OK)
      .expect(pedidos);
  });
});
