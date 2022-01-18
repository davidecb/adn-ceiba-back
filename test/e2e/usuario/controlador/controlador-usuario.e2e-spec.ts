import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('Pruebas al controlador de usuarios', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  //---- Arrange ----

  const usuario = {
    'nombre': 'testingUser',
    'clave': '123456'
  };
  let usuarioId = 0;

  const usuario2 = {
    'nombre': 'testingUser2',
    'clave': '123456'
  };
  let usuario2Id = 0;

  const usuarioClaveCorta = {
    'nombre': 'testingUser',
    'clave': '123'
  };

  beforeAll(async ()=>{
    moduleFixture = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll( async () => {
    await app.close();
  });

  it('Crear un usuario con clave corta debe marcar error', async () => {
    //const mensaje = `El tamaño mínimo de la clave debe ser 4`;

    const response = await request(app.getHttpServer())
      .post('/usuarios')
      .send(usuarioClaveCorta)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);

    //expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('Creando un usuario con clave mayor a 4 digitos debe crear correctamente', async () => {
    const response = await request(app.getHttpServer())
      .post('/usuarios').send(usuario).expect(HttpStatus.CREATED);

    expect(parseInt(response.text)).toBeGreaterThan(0);
    usuarioId = parseInt(response.text);
  });

  it('Creando otro usuario con clave mayor a 4 digitos debe crear correctamente', async () => {
    const response = await request(app.getHttpServer())
      .post('/usuarios').send(usuario2).expect(HttpStatus.CREATED);

    expect(parseInt(response.text)).toBeGreaterThan(0);
    usuario2Id = parseInt(response.text);
  });

  it('creando un usuario con un nombre ya existente debe marcar error', async () => {
    //const mensaje = `El nombre de usuario ${usuario.nombre} ya existe`;

    const response = await request(app.getHttpServer())
      .post('/usuarios')
      .send(usuario)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    //expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
  
  it('Debe listar los usuarios correctamente', async () => {
    const response = await request(app.getHttpServer())
      .get('/usuarios')
      .expect(HttpStatus.OK);
    expect(response.body.length).toBe(2);
    expect(response.body[0].nombre).toBe(usuario.nombre);
    expect(response.body[1].nombre).toBe(usuario2.nombre);
  });
    
  it('Debe eliminar un usuario por su id', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/usuarios/${usuarioId}`)
      .expect(HttpStatus.OK);
  });
    
  it('Debe eliminar otro usuario por su id', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/usuarios/${usuario2Id}`)
      .expect(HttpStatus.OK);
  });
})