import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsuarioGrupos extends BaseSchema {
  protected tableName = 'usuario_grupos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('codigo_usuario').unsigned().index('usuario_grupos_codigo_usuario') // llave primaria
      table.integer('codigo_grupo').unsigned().index('usuario_grupos_codigo_grupo') // llave primaria
      table.date('fecha_inicio').notNullable()
      table.foreign('codigo_usuario').references('usuarios.codigo_usuario').onDelete('cascade')
      table.foreign('codigo_grupo').references('grupos.codigo_grupo').onDelete('cascade')
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
