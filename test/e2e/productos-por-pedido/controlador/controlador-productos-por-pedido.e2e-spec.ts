import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */

describe('Pruebas al controlador de productos por pedido', () => {

  let app: INestApplication;
  let moduleFixture: TestingModule;

  // ---- Arrange ----
  const producto = {
    nombre: 'producto test',
    costo: 10000,
    tiempo: 30,
    imagen: 'testingImage.jpg',
  };
  let productoId = 0;

  const productoSolicitado = { 
    producto: productoId,
    material: 'ABS',
    color: 'madera',
    acabado: {
      pulido: false,
      pintado: false,
      barnizado: true
    },
    urgencia: false
  };
  let productoSolicitadoId = 0;

  const pedido = {
    numeroPedido: '123456789',
    productosSolicitados: [],
    direccion: '',
    cliente: '',
    estado: 'inicializando'
  };
  let pedidoId = 0;
  
  const productoPorPedido = {
    pedido: pedidoId,
    productoSolicitado: productoSolicitadoId,
    cantidad: 2,
  };
  let productoPorPedidoId = 0;
  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const responsePedido = await request(app.getHttpServer())
      .post('/pedidos').send(pedido);

    pedidoId = parseInt(responsePedido.text);
    
    const responseProducto = await request(app.getHttpServer())
      .post('/productos').send(producto);

    productoId = parseInt(responseProducto.text);
    productoSolicitado.producto = productoId;

    const responseProductoSolicitado = await request(app.getHttpServer())
      .post('/productos-solicitados').send(productoSolicitado);

    productoSolicitadoId = parseInt(responseProductoSolicitado.text);
  });

  afterAll(async () => {
    await request(app.getHttpServer())
      .delete(`/productos/${productoId}`);
    
    await request(app.getHttpServer())
      .delete(`/pedidos/${pedidoId}`);

    await app.close();
  });
  
  it('debería crear un producto por pedido', async () => {
    productoPorPedido.pedido = pedidoId;
    productoPorPedido.productoSolicitado = productoSolicitadoId;

    const response = await request(app.getHttpServer())
      .post('/productos-por-pedido').send(productoPorPedido)
      .expect(HttpStatus.CREATED);

    expect(parseInt(response.text)).toBeGreaterThan(0);
    productoPorPedidoId = parseInt(response.text);
  });
  
  it('debería fallar al crear un producto por pedido con el mismo producto solicitado', async () => {
    await request(app.getHttpServer())
      .post('/productos-por-pedido').send(productoPorPedido)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('debería listar los producto por pedido registrados', async () => {
    const response = await request(app.getHttpServer())
      .get('/productos-por-pedido')
      .expect(HttpStatus.OK);

    expect(response.body.length).toBe(1);

    expect(response.body[0].id).toBe(productoPorPedidoId);
    expect(response.body[0].cantidad).toBe(productoPorPedido.cantidad);
  });
  
  it('debería fallar al modificar un productos Por Pedido no existente', async () => {
    await request(app.getHttpServer())
      .patch(`/productos-por-pedido/${(productoPorPedidoId + 1)}`).send({
        cantidad: 5
      })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('debería fallar al modificar un productos Por Pedido con propiedades no existentes', async () => {
    await request(app.getHttpServer())
      .patch(`/productos-por-pedido/${productoPorPedidoId}`).send({
        costo: 5000
      })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });
    
  it('debería modificar un producto Por Pedido por id', async () => {
    await request(app.getHttpServer())
      .patch(`/productos-por-pedido/${productoPorPedidoId}`).send({
        cantidad: 5
      }).expect(HttpStatus.OK);
  });
  
  it('debería obtener un producto por pedido por id', async () => {
    const response =  await request(app.getHttpServer())
      .get(`/productos-por-pedido/${productoPorPedidoId}`)
      .expect(HttpStatus.OK);

    expect(response.body.id).toBe(productoPorPedidoId);
    expect(response.body.cantidad).toBe(5);     
  });

  it('debería fallar al eliminar un productos Por Pedido no existente', async () => {
    await request(app.getHttpServer())
      .delete(`/productos-por-pedido/${(productoPorPedidoId + 1)}`)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });
  
  it('debería eliminar un producto Por Pedido por id', async () => {
    await request(app.getHttpServer())
      .delete(`/productos-por-pedido/${productoPorPedidoId}`)
      .expect(HttpStatus.OK);
  });
});
