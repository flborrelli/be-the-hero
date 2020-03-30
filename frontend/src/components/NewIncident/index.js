import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import api from "../../services/api";
import { toast } from 'react-toastify';

function NewIncident(){

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  const newIncidentNotify = () => toast.success('✅ Novo incidente cadastrado com sucesso!', {
    position: toast.POSITION.TOP_CENTER,
    className: 'notify'
  });

  const incidentRegisterErrorNotify = () => toast.error('❌ Ocorreu um erro ao cadastrar um novo incidente, tente novamente.', {
    position: toast.POSITION.TOP_CENTER,
    className: 'notify'
  });

  const handleNewIncident = async (e) => {
    e.preventDefault();

    const data = {
      title, description, value
    };

    try{
      await api.post('incidents', data, { headers: {
        Authorization: ongId,
      }});
      history.push('/profile');
      newIncidentNotify();
    }catch(err){
      incidentRegisterErrorNotify();
    }

  }

  return(
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastrar Novo Caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className='back-link' to="/profile">
            <FiArrowLeft size={16} color="E02041" />
            Voltar para Home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input placeholder='Título do Caso' value={title} onChange={e => setTitle(e.target.value)}/>
          <textarea placeholder='Descrição' value={description} onChange={e => setDescription(e.target.value)}/>
          <input placeholder='Valor em R$' value={value} onChange={e => setValue(e.target.value)}/>

          <div className="input-group">
          <input placeholder='Cidade'/>
          <input placeholder='UF' style={{ width: 80 }}/>
          </div>

          <button type='submit' className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewIncident;