
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table) {
    //Campos que nossa ONG terá
    table.increments(); //Criará IDs continuos

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable(); //qual ong registrou esse incidente, pelo ID
    table.foreign('ong_id').references('id').inTable('ongs') //dado ID relacionado da tabela Ongs 

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
  
};
