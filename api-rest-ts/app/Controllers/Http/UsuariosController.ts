import  {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario';


/*Controlador Usuario*/
export default class UsuariosController {
  
  public async setRegistrarUsuarios ({request, response}: HttpContextContract){
    try {
      const dataUsuario = request.only(['codigo_usuario', 'nombre_usuario', 'contrasena', 'email', 'telefono', 'perfil'])
      const codigoUsuario = dataUsuario.codigo_usuario;
      const UsuarioExistente: Number = await this.getValidarUsuarioExistente(codigoUsuario)
      if (UsuarioExistente === 0){
        await Usuario.create(dataUsuario)
        response.status(200).json({"msg": "Registro completado con éxito"})
      } else {
        response.status(400).json({"msg": "Error, el codigo usuario ya se encuentra registrado"})
      }
    }
    catch (error){
      console.log(error)
      response.status(500).json({"msg": "Error en el servidor"})
    }
  }
  /*Método de Validación para Usuario*/
  private async getValidarUsuarioExistente(codigo_usuario: Number): Promise <Number> {
    /* Query para grupo */
    const total = await Usuario.query().where({"codigo_usuario": codigo_usuario}).count('*').from('usuarios')
    // return parseInt(total[0]["count(*)"]) // --> MySQL
    return parseInt(total[0].count) // --> Postgres
  }

  // Listar usuarios
  public async getListarUsuarios(): Promise <Usuario[]>{
    const user = await Usuario.all()
    return user;
}
  public async getListarUsuariosYPublicacion(): Promise <Usuario[]>{
      const user = await Usuario 
      .query()
      .preload('publicaciones')
      return user;
    } 
  public async getListarUsuariosYPerfil(): Promise <Usuario[]>{
      const user = await Usuario
      .query()
      .preload('perfil')
      return user;
    }
  public async getListarUsuariosGrupos(): Promise <Usuario[]>{
      const user = await Usuario
      .query()
      .preload('usuario_grupos')
      return user;
    }

  public async buscarPorId({request}: HttpContextContract){
    const id = request.param('id');
    const user = await Usuario.find(id);
    return user;

  }

  public async actualizarUsuario({request}: HttpContextContract) {
    const id = request.param('id');
    const UpdatedUserData = request.all();
    // Opción 1: Actualizar desde la base (raw query)
    // await Usuario.query().where('codigo_usuario',id).update({
    //   nombre_usuario: UpdatedUserData.nombre_nuevo,
    //   contrasena: UpdatedUserData.contrasena_nueva,
    //   email: UpdatedUserData.email_nuevo,
    //   telefono: UpdatedUserData.telefono_nuevo
    // });

    // Opción 2: Actualizar desde el Modelo
    const usuario = await Usuario.findOrFail(id)
    usuario.nombre_usuario = UpdatedUserData.nombre_nuevo
    usuario.contrasena = UpdatedUserData.contrasena_nueva
    usuario.email = UpdatedUserData.email_nuevo
    usuario.telefono = UpdatedUserData.telefono_nuevo
    await usuario.save()

    return{"mensaje":"Usuario Actualizado correctamente", "estado": 200};

  }

  public async eliminarUsuario({request}:HttpContextContract){
    const id = request.param('id');
    await Usuario.query().where("codigo_usuario",id).delete();
    return{"mensaje":"Usuario Eliminado correctamente", "estado": 200};
  }

  public async filtroPorNombre({request}: HttpContextContract){
    const {search} = request.all();
    const users = await Usuario.query().where('nombre_usuario','like', `${search}%`)
    return users;
  }

}

