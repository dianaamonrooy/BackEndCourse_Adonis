/** Se importan los modulos necesarios */
import {DateTime} from 'luxon'
import {BaseModel, column, hasOne, HasOne, hasMany, HasMany, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import Perfil from './Perfil'
import Publicaciones from './Publicaciones'
import Grupo from './Grupo'

/** Se definen los campos de usuario */
export default class Usuarios extends BaseModel {
  @column({isPrimary: true}) public codigo_usuario: number
  @column() public nombre_usuario: string 
  @column() public contrasena: string 
  @column() public email: string
  @column() public telefono: string

  /** Se define la relacion de usuarios con Perfil OneToOne (1:1) */
  @hasOne (() => Perfil,{
    localKey: 'codigo_usuario',
    foreignKey: 'codigo_usuario'
  })
  public perfil: HasOne<typeof Perfil>

  /** Se define la relacion de usuarios con Publicaion OneToMany (1:n) */
  @hasMany (() => Publicaciones,{
    localKey: 'codigo_usuario',
    foreignKey: 'codigo_usuario'
  })
  public publicaciones: HasMany<typeof Publicaciones>

  /** Relación ManyToMany */
  @manyToMany (() => Grupo,{
    localKey: 'codigo_usuario', /** Llave primaria de la tabla usuario */
    pivotForeignKey: 'codigo_usuario', /** Llave foranea de la nueva tabla [usuario_grupo] */
    relatedKey: 'codigo_grupo', /** Llave primaria de la tabla de grupo */
    pivotRelatedForeignKey: 'codigo_grupo', /** Llave foranea de la nueva tabla [usuario_grupo] */
    pivotTable: 'usuario_grupos' /** Nombre de nueva tabla N:M [ManyToMany] */
  })
  public usuario_grupos: ManyToMany<typeof Grupo>
  
  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}