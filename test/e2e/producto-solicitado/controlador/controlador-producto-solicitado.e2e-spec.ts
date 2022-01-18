import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */

describe('Pruebas al controlador de producto-solicitados', () => {

  let app: INestApplication;
  let moduleFixture: TestingModule;

  // ---- Arrange ----
  const producto1 = {
    nombre: 'producto test',
    costo: 10000,
    tiempo: 30,
    imagen: 'testingImage.jpg',
  };
  let producto1Id = 0;

  const productoSolicitado = { 
    producto: producto1Id,
    material: 'PLA',
    color: 'blanco',
    acabado: {
      pulido: false,
      pintado: false,
      barnizado: false
    },
    urgencia: false
  };
  let productoSolicitadoId = 0;
  let productoSolicitadoId2 = 0;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    
    const response = await request(app.getHttpServer())
      .post('/productos').send(producto1);
    producto1Id = parseInt(response.text);   
  });

  afterAll(async () => {
    await request(app.getHttpServer())
      .delete(`/productos/${producto1Id}`);

    await app.close();
  });

  it('debería crear un producto solicitado', async () => {
    productoSolicitado.producto = producto1Id;
    
    const response = await request(app.getHttpServer())
      .post('/productos-solicitados').send(productoSolicitado)
      .expect(HttpStatus.CREATED);

    productoSolicitadoId = parseInt(response.text);
  });

  it('no debería fallar al crear un producto solicitado ya existente', async () => {
    const response = await request(app.getHttpServer())
      .post('/productos-solicitados').send(productoSolicitado)
      .expect(HttpStatus.CREATED)

    productoSolicitadoId2 = parseInt(response.text);
  });
 
  it('debería listar los productos solicitados registrados', async () => {
    const response = await request(app.getHttpServer())
      .get('/productos-solicitados')
      .expect(HttpStatus.OK)

    expect(response.body.length).toBe(2);

    expect(response.body[0].id).toBe(productoSolicitadoId);
    expect(response.body[0].material).toBe(productoSolicitado.material);
    expect(response.body[0].color).toBe(productoSolicitado.color);
    expect(response.body[0].acabado.pulido).toBe(productoSolicitado.acabado.pulido);
    expect(response.body[0].acabado.pintado).toBe(productoSolicitado.acabado.pintado);
    expect(response.body[0].acabado.barnizado).toBe(productoSolicitado.acabado.barnizado);
    expect(response.body[0].urgencia).toBe(productoSolicitado.urgencia);
    expect(response.body[0].costo).toBe(10000);
    expect(response.body[0].tiempo).toBe(30);

    expect(response.body[1].id).toBe(productoSolicitadoId2);
    expect(response.body[1].material).toBe(productoSolicitado.material);
    expect(response.body[1].color).toBe(productoSolicitado.color);
    expect(response.body[1].acabado.pulido).toBe(productoSolicitado.acabado.pulido);
    expect(response.body[1].acabado.pintado).toBe(productoSolicitado.acabado.pintado);
    expect(response.body[1].acabado.barnizado).toBe(productoSolicitado.acabado.barnizado);
    expect(response.body[1].urgencia).toBe(productoSolicitado.urgencia);
    expect(response.body[1].costo).toBe(10000);
    expect(response.body[1].tiempo).toBe(30);
  });
  
  it('debería modificar un producto solicitado', () => {
    return request(app.getHttpServer())
      .post('/productos-solicitados').send({
        id: productoSolicitadoId,
        producto: producto1Id,
        material: 'ABS',
        color: 'plata',
        acabado: {
          pulido: true,
          pintado: true,
          barnizado: true
        },
        urgencia: true
      })
      .expect(HttpStatus.CREATED)
  });
  
  it('debería fallar al modificar un producto solicitado con propiedades no existentes', () => {
    return request(app.getHttpServer())
      .post('/productos-solicitados').send({
        id: productoSolicitadoId,
        propiedad: true
      })
      .expect(HttpStatus.BAD_REQUEST)
  });
  
  it('debería obtener un productoSolicitado por id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/productos-solicitados/${productoSolicitadoId}`)
      .expect(HttpStatus.OK)
    
    expect(response.body.id).toBe(productoSolicitadoId);
    expect(response.body.material).toBe('ABS');
    expect(response.body.color).toBe('plata');
    expect(response.body.acabado.pulido).toBe(true);
    expect(response.body.acabado.pintado).toBe(true);
    expect(response.body.acabado.barnizado).toBe(true);
    expect(response.body.urgencia).toBe(true);
    expect(response.body.costo).toBe(26999);
    expect(response.body.tiempo).toBe(81);
  });

  it('debería fallar al eliminar un productoSolicitado no existente', async () => {
    return request(app.getHttpServer())
      .delete(`/productos-solicitados/${(productoSolicitadoId2 + 10)}`)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });
  
  it('debería eliminar un productoSolicitado', async () => {
    return request(app.getHttpServer())
      .delete(`/productos-solicitados/${productoSolicitadoId}`)
      .expect(HttpStatus.OK);
  });
  
  it('debería eliminar un productoSolicitado', async () => {
    return request(app.getHttpServer())
      .delete(`/productos-solicitados/${productoSolicitadoId2}`)
      .expect(HttpStatus.OK);
  });
});
