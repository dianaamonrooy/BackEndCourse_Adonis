import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Publicaciones extends BaseModel {
  @column({isPrimary: true}) public codigo_publicacion: number
  @column() public codigo_usuario: number /* Llave foránea */
  @column() public titulo: string
  @column() public cuerpo: Date

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}