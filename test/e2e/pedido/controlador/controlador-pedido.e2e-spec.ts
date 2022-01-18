import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */

describe('Pruebas al controlador de pedido', () => {

  let app: INestApplication;
  let moduleFixture: TestingModule;

  // ---- Arrange ----
  const pedido1 = {
    numeroPedido: '123456789',
    productosSolicitados: [],
    direccion: '',
    cliente: '',
    estado: 'inicializando'
  };
  let pedido1Id = 0;

  const pedido2 = {
    numeroPedido: '987654321',
    productosSolicitados: [],
    direccion: '',
    cliente: '',
    estado: 'inicializando'
  };
  let pedido2Id = 0;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  
  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async (done) => {
    await app.close();
    done();
  });
    
  it('debería crear un pedido no existente', async () => {
    const response = await request(app.getHttpServer())
      .post('/pedidos').send(pedido1)
      .expect(HttpStatus.CREATED);

    expect(parseInt(response.text)).toBeGreaterThan(0);
    pedido1Id = parseInt(response.text);
  });
    
  it('debería fallar al crear un pedido ya existente', async () => {
    await request(app.getHttpServer())
      .post('/pedidos').send(pedido1)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });
      
  it('debería crear un pedido no existente', async () => {
    const response = await request(app.getHttpServer())
      .post('/pedidos').send(pedido2)
      .expect(HttpStatus.CREATED);

    expect(parseInt(response.text)).toBeGreaterThan(0);
    pedido2Id = parseInt(response.text);
  });

  it('debería listar los pedidos registrados', async () => {
    const response = await request(app.getHttpServer())
      .get('/pedidos')
      .expect(HttpStatus.OK);

    expect(response.body.length).toBe(2);

    expect(response.body[0].id).toBe(pedido1Id);
    expect(response.body[0].numeroPedido).toBe(pedido1.numeroPedido);
    expect(response.body[0].productosSolicitados).toStrictEqual(pedido1.productosSolicitados);
    expect(response.body[0].direccion).toBe(pedido1.direccion);
    expect(response.body[0].cliente).toBe(pedido1.cliente);
    expect(response.body[0].estado).toBe(pedido1.estado);
    expect(response.body[0].costo).toBe(0);
    expect(response.body[0].tiempo).toBe(0);

    expect(response.body[1].id).toBe(pedido2Id);
    expect(response.body[1].numeroPedido).toBe(pedido2.numeroPedido);
    expect(response.body[1].productosSolicitados).toStrictEqual(pedido2.productosSolicitados);
    expect(response.body[1].direccion).toBe(pedido2.direccion);
    expect(response.body[1].cliente).toBe(pedido2.cliente);
    expect(response.body[1].estado).toBe(pedido2.estado);
    expect(response.body[1].costo).toBe(0);
    expect(response.body[1].tiempo).toBe(0);
  });

  
  it('debería fallar al modificar un pedido no existente', async () => {
    await request(app.getHttpServer())
      .patch(`/pedidos/${(pedido2Id + 10)}`).send({
        direccion: 'Avenida Siempre Viva',
        cliente: 'Homer J. Simpson',
        estado: 'finalizado'
      })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('debería fallar al modificar un pedido con propiedades no existentes', async () => {
    await request(app.getHttpServer())
      .patch(`/pedidos/${pedido1Id}`).send({
        direction: 'Avenida Siempre Viva',
        cliente: 'Homer J. Simpson',
        state: 'finalizado'
      })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });
      
  it('debería modificar un pedido', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/pedidos/${pedido1Id}`).send({
        direccion: 'Avenida Siempre Viva',
        cliente: 'Homer J. Simpson',
        estado: 'finalizado'
      })
    .expect(HttpStatus.OK);
  });

  it('debería obtener un pedido por id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/pedidos/${pedido1Id}`)
      .expect(HttpStatus.OK);

    expect(response.body.id).toBe(pedido1Id);
    expect(response.body.numeroPedido).toBe(pedido1.numeroPedido);
    expect(response.body.productosSolicitados).toStrictEqual(pedido1.productosSolicitados);
    expect(response.body.direccion).toBe('Avenida Siempre Viva');
    expect(response.body.cliente).toBe('Homer J. Simpson');
    expect(response.body.estado).toBe('finalizado');
    expect(response.body.costo).toBe(0);
    expect(response.body.tiempo).toBe(0);
  });

  it('debería obtener pedidos por estado', async () => {
    const response = await request(app.getHttpServer())
      .get('/pedidos/estado?estado=inicializando')
      .expect(HttpStatus.OK);

    expect(response.body.length).toBe(1);
      
    expect(response.body[0].id).toBe(pedido2Id);
    expect(response.body[0].numeroPedido).toBe(pedido2.numeroPedido);
    expect(response.body[0].productosSolicitados).toStrictEqual(pedido2.productosSolicitados);
    expect(response.body[0].direccion).toBe(pedido2.direccion);
    expect(response.body[0].cliente).toBe(pedido2.cliente);
    expect(response.body[0].estado).toBe('inicializando');
    expect(response.body[0].costo).toBe(0);
    expect(response.body[0].tiempo).toBe(0);
  });

  it('debería fallar al eliminar un pedido no existente', async () => {
    await request(app.getHttpServer())
      .delete(`/pedidos/${(pedido2Id + 10)}`)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });
    
  it('debería eliminar un pedido', async () => {
    await request(app.getHttpServer())
      .delete(`/pedidos/${pedido1Id}`)
      .expect(HttpStatus.OK);
  });
    
  it('debería eliminar un pedido', async () => {
    await request(app.getHttpServer())
      .delete(`/pedidos/${pedido2Id}`)
      .expect(HttpStatus.OK);
  });
});
