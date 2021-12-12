import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';
import { DaoProducto } from 'src/dominio/producto/puerto/dao/dao-producto';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { ProductoControlador } from 'src/infraestructura/producto/controlador/producto.controlador';
import { ServicioRegistrarProducto } from 'src/dominio/producto/servicio/servicio-registrar-producto';
import { servicioRegistrarProductoProveedor } from 'src/infraestructura/producto/proveedor/servicio/servicio-registrar-producto.proveedor';
import { ManejadorRegistrarProducto } from 'src/aplicacion/producto/comando/registar-producto.manejador';
import { ManejadorListarProducto } from 'src/aplicacion/producto/consulta/listar-productos.manejador';
import { ComandoRegistrarProducto } from 'src/aplicacion/producto/comando/registrar-producto.comando';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de productos', () => {

  let app: INestApplication;
  let repositorioProducto: SinonStubbedInstance<RepositorioProducto>;
  let daoProducto: SinonStubbedInstance<DaoProducto>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioProducto = createStubObj<RepositorioProducto>(['existeNombreProducto', 'guardar'], sinonSandbox);
    daoProducto = createStubObj<DaoProducto>(['listar'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductoControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarProducto,
          inject: [RepositorioProducto],
          useFactory: servicioRegistrarProductoProveedor,
        },
        { provide: RepositorioProducto, useValue: repositorioProducto },
        { provide: DaoProducto, useValue: daoProducto },
        ManejadorRegistrarProducto,
        ManejadorListarProducto,
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

  it('debería listar los productos registrados', () => {

    const productos: any[] = [{
      nombre: 'Lorem ipsum',
      costo: 10000,
      tiempo: 30,
      imagen: 'loremIpsum.jpg'
    }];
    daoProducto.listar.returns(Promise.resolve(productos));

    return request(app.getHttpServer())
      .get('/productos')
      .expect(HttpStatus.OK)
      .expect(productos);
  });

  it('debería fallar al registar un producto ya existente', async () => {
    const producto: ComandoRegistrarProducto = {
      nombre: 'Lorem ipsum',
      costo: 10000,
      tiempo: 30,
      imagen: 'loremIpsum.jpg',
    };
    const mensaje = `El nombre de producto ${producto.nombre} ya existe`;
    repositorioProducto.existeNombreProducto.returns(Promise.resolve(true));

    const response = await request(app.getHttpServer())
      .post('/productos').send(producto)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});
