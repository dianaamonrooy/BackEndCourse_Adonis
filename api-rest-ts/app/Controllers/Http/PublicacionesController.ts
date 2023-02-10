import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Publicaciones from 'App/Models/Publicaciones'

/*Controlador Publicacion*/
export default class PublicacionesController {
  async setRegistrarPublicacion ({request, response}: HttpContextContract){
    try{
      const dataPublicaciones = request.only(['codigo_publicacion','codigo_usuario', 'titulo','cuerpo'])
      const codigoPublicacion = dataPublicaciones.codigo_publicacion;
      const PublicacionExistente: Number = await this.getValidarPublicacionExistente(codigoPublicacion)
      if (PublicacionExistente === 0){
        await Publicaciones.create(dataPublicaciones)
        response.status(200).json({"msg": "Registro de Publicacion completado"})
      } else {
        response.status(400).json({"msg": "Error, el codigo Publicacion ya se encuentra registrado"})
      }
    }
    catch (error){
      console.log(error)
      response.status(500).json({"msg": "Error en el servidor"})
    }
  }
  /*Método de Validación para Publicacion*/
  private async getValidarPublicacionExistente(codigo_publicacion: Number): Promise <Number> {
    /* Query para grupo */
    const total = await Publicaciones.query().where({"codigo_publicacion": codigo_publicacion}).count('*').from('publicaciones')
    return parseInt(total[0]["count(*)"])
  }
}

