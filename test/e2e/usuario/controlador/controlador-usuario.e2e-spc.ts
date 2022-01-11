import { UsuarioModule } from "./../../../../src/infraestructura/usuario/usuario.module";
import { repositorioUsuarioProvider } from './../../../../src/infraestructura/usuario/proveedor/repositorio/repositorio-usuario.proveedor';
import * as request from 'supertest';
import connection from '../../configuracion/connections';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { UsuarioControlador } from 'src/infraestructura/usuario/controlador/usuario.controlador';
import { ServicioRegistrarUsuario } from 'src/dominio/usuario/servicio/servicio-registrar-usuario';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { servicioRegistrarUsuarioProveedor } from 'src/infraestructura/usuario/proveedor/servicio/servicio-registrar-usuario.proveedor';
import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { daoUsuarioProvider } from 'src/infraestructura/usuario/proveedor/dao/dao-usuario.proveedor';
import { ManejadorRegistrarUsuario } from 'src/aplicacion/usuario/comando/registar-usuario.manejador';
import { ManejadorListarUsuario } from 'src/aplicacion/usuario/consulta/listar-usuarios.manejador';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntidad } from 'src/infraestructura/usuario/entidad/usuario.entidad';
import { EntityManager } from "typeorm";

describe('Pruebas al controlador de usuarios', () => {
  let app: INestApplication;

  beforeAll(async ()=>{
    await connection.create();
    const moduleRef = await Test.createTestingModule({
      controllers: [UsuarioControlador],
      imports: [UsuarioModule],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarUsuario,
          inject: [RepositorioUsuario],
          useFactory: servicioRegistrarUsuarioProveedor,
        }, 
        { provide: RepositorioUsuario, useValue: repositorioUsuarioProvider },
        { provide: DaoUsuario, useValue: daoUsuarioProvider },
        ManejadorRegistrarUsuario,
        ManejadorListarUsuario,
        EntityManager
      ],
    }).compile();

    app = moduleRef.createNestApplication();    
    const logger = await app.resolve(AppLogger);
    await app.init();
  });

  afterAll(async ()=>{
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  it('creates a user', async () => {
    const response = await request(app.getHttpServer())
    .get('/usuarios')
    .expect(HttpStatus.OK)
  });
})