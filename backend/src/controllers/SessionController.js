const connection = require('../database/connection');

module.exports = {
  
  async create(req, res){

    //Pegar o ID do corpo
    const { id } = req.body;
    
    //Buscando a ONG pelo ID, verificar se ela realmente existe
    const ong = await connection('ongs')
    .where('id', id)
    .select('name')
    .first();

    if (!ong){
      return res.status(400).json({ error: 'No ONG found with this ID' });
    }
    return res.json(ong)
  }
}