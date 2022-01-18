import { Usuario } from '../../modelo/usuario';

export abstract class RepositorioUsuario {
  abstract existeNombreUsuario(nombre: string): Promise<boolean>;
  abstract existeIdUsuario(id: number): Promise<boolean>;
  abstract guardar(usuario: Usuario): Promise<number>;
  abstract eliminar(id: number);
}
