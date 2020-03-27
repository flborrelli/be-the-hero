const connection = require('../database/connection');

module.exports = {

  //FOR GET
  async index(req, res){

    const { page= 1 } = req.query;

    //contador de todos incidentes que são retornados em uma array com um único index com o count: numero de incidents, assim, com a desconstrução, pegamos somente o primeiro
    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

    res.header('X-Total-Count', count['count(*)'])

    return res.json(incidents);
  },

  //FOR POST
  async create(req, res){
    const { title, description, value } = req.body;

    //id da ong logada que está criando o incident
    const ong_id = req.headers.authorization;

    //Criando um incident e para pegarmos o ID desse incident que é criado automaticamente, desconstruimos o array passando id
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    //retornando o id do incident
    return res.json({ id })
  },

  //FOR DELETE
  async delete(req, res){
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first();

    if (incident.ong_id !== ong_id){
      return res.status(401).json({ error: 'Operation not permitted.' });
    }
    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}