import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntidad } from '../../entidad/usuario.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioUsuarioMysql implements RepositorioUsuario {
  constructor(
    @InjectRepository(UsuarioEntidad)
    private readonly repositorio: Repository<UsuarioEntidad>,
  ) {}

  async existeNombreUsuario(nombre: string): Promise<boolean> {
    return (await this.repositorio.count({ nombre })) > 0;
  }

  async existeIdUsuario(id: number): Promise<boolean> {
    return (await this.repositorio.count({ id })) > 0;
  }

  async guardar(usuario: Usuario): Promise<number> {
    const entidad = new UsuarioEntidad();
    entidad.clave = usuario.clave;
    entidad.nombre = usuario.nombre;
    return (await this.repositorio.save(entidad)).id;
  }
  
  async eliminar(id: number) {
    await this.repositorio.delete(id);
  }
}
