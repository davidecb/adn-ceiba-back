import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */

describe('Pruebas al controlador de productos', () => {

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

  const producto2 = {
    nombre: 'producto2 test',
    costo: 20000,
    tiempo: 45,
    imagen: 'testingImage.png',
  };
  let producto2Id = 0;

  const productoSinImagen = {
    nombre: 'producto sin imagen test',
    costo: 20000,
    tiempo: 45
  };
  let productoSinImagenId = 0;

  const productoImagenErronea = {
    nombre: 'producto2 test',
    costo: 20000,
    tiempo: 45,
    imagen: 'testingImage.ico',
  };

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
    
  it('debería registrar un producto no existente', async () => {
    const response = await request(app.getHttpServer())
      .post('/productos').send(producto1)
      .expect(HttpStatus.CREATED);

    expect(parseInt(response.text)).toBeGreaterThan(0);
    producto1Id = parseInt(response.text);
  });
    
  it('debería registrar otro producto no existente', async () => {
    const response = await request(app.getHttpServer())
      .post('/productos').send(producto2)
      .expect(HttpStatus.CREATED);

    expect(parseInt(response.text)).toBeGreaterThan(0);
    producto2Id = parseInt(response.text);
  });
    
  it('debería registrar un producto con imagen por defecto', async () => {
    const response = await request(app.getHttpServer())
      .post('/productos').send(productoSinImagen)
      .expect(HttpStatus.CREATED);

    expect(parseInt(response.text)).toBeGreaterThan(0);
    productoSinImagenId = parseInt(response.text);
  });
  
  it('debería fallar al registar un producto ya existente', async () => {
    const response = await request(app.getHttpServer())
      .post('/productos').send(producto1)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
      
    expect(response.body.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
  
  it('debería fallar al registar un producto con imagen erronea', async () => {
    const response = await request(app.getHttpServer())
      .post('/productos').send(productoImagenErronea)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
      
    expect(response.body.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('debería listar los productos registrados', async () => {
    const response = await request(app.getHttpServer())
      .get('/productos')
      .expect(HttpStatus.OK);

    expect(response.body.length).toBe(3);

    expect(response.body[0].id).toBe(producto1Id);
    expect(response.body[0].nombre).toBe(producto1.nombre);
    expect(response.body[0].costo).toBe(producto1.costo);
    expect(response.body[0].tiempo).toBe(producto1.tiempo);
    expect(response.body[0].imagen).toBe(producto1.imagen);

    expect(response.body[1].id).toBe(producto2Id);
    expect(response.body[1].nombre).toBe(producto2.nombre);
    expect(response.body[1].costo).toBe(producto2.costo);
    expect(response.body[1].tiempo).toBe(producto2.tiempo);
    expect(response.body[1].imagen).toBe(producto2.imagen);

    expect(response.body[2].id).toBe(productoSinImagenId);
    expect(response.body[2].nombre).toBe(productoSinImagen.nombre);
    expect(response.body[2].costo).toBe(productoSinImagen.costo);
    expect(response.body[2].tiempo).toBe(productoSinImagen.tiempo);
    expect(response.body[2].imagen).toBe("defaultImagen.jpg");
  });

  it('debería obtener un producto por id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/productos/${producto1Id}`)
      .expect(HttpStatus.OK);

    expect(response.body.id).toBe(producto1Id);
    expect(response.body.nombre).toBe(producto1.nombre);
    expect(response.body.costo).toBe(producto1.costo);
    expect(response.body.tiempo).toBe(producto1.tiempo);
    expect(response.body.imagen).toBe(producto1.imagen);
  });

  it('debería fallar al modificar un producto no existente', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/productos/${(productoSinImagenId + 10)}`).send({
        nombre: 'nuevo Producto test',
        costo: 15000
      })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);

    expect(response.body.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('debería fallar al modificar un producto con propiedades no existentes', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/productos/${producto1Id}`).send({
        name: 'nuevo Producto test',
        cost: 15000
      })
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);

    expect(response.body.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
    
  it('debería modificar un producto existente por id', async () => {
    await request(app.getHttpServer())
      .patch(`/productos/${producto1Id}`).send({
        nombre: 'nuevo Producto test',
        costo: 15000
      })
      .expect(HttpStatus.OK);
  });

  
  it('debería obtener un producto por id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/productos/${producto1Id}`)
      .expect(HttpStatus.OK);

    expect(response.body.id).toBe(producto1Id);
    expect(response.body.nombre).toBe('nuevo Producto test');
    expect(response.body.costo).toBe(15000);
    expect(response.body.tiempo).toBe(producto1.tiempo);
    expect(response.body.imagen).toBe(producto1.imagen);
  });
  
  it('debería fallar al eliminar un producto no existente', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/productos/${(productoSinImagenId + 10)}`)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);

    expect(response.body.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
  
  it('debería eliminar un producto existente por id', async () => {
    await request(app.getHttpServer())
      .delete(`/productos/${producto1Id}`)
      .expect(HttpStatus.OK);
  });
  
  it('debería eliminar un producto existente por id', async () => {
    await request(app.getHttpServer())
      .delete(`/productos/${producto2Id}`)
      .expect(HttpStatus.OK);
  });
  
  it('debería eliminar un producto existente por id', async () => {
    await request(app.getHttpServer())
      .delete(`/productos/${productoSinImagenId}`)
      .expect(HttpStatus.OK);
  });

  it('debería listar los productos registrados', async () => {
    const response = await request(app.getHttpServer())
      .get('/productos')
      .expect(HttpStatus.OK);

    expect(response.body.length).toBe(0);
  });
});
