import  {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario';


/*Controlador Usuario*/
export default class UsuariosController {
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
    const total = await Usuario.query().where({"codigo_Usuario": codigo_usuario}).count('*').from('usuarios')
    return parseInt(total[0]["count(*)"])
  }
}

