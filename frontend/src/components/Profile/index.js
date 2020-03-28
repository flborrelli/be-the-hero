import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from "../../services/api";


function Profile(){

  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', { headers: {
      Authorization: ongId,
    }}).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  const handleDeleteIncident = async (id) => {
    try{
      await api.delete(`incidents/${id}`, { headers: {
        Authorization: ongId,
      }});
      //filtrar os incidents que nao foram deletados para não termos erro
      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch(err){
      alert('Erro ao deletar caso, tente novamente.')
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  }

  return(
    <div className="profile-container">
      <header>

        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link className='button new-incident-button' to='/incidents/new'>
          Cadastrar novo caso
        </Link>
        <button type='button' onClick={handleLogout}>
          <FiPower size={18} color='E02041' />
        </button>

      </header>

      <h1>Casos cadastrados</h1>

      <ul>

      {incidents.map(incidents => (
        <li key={incidents.id}>
        <strong>CASO</strong>
        <p>{incidents.title}</p>

        <strong>DESCRIÇÃO</strong>
        <p>{incidents.description}</p>

        <strong>VALOR</strong>
        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidents.value)}</p>

        <button type='button' onClick={() => handleDeleteIncident(incidents.id)}><FiTrash2 size={20} color='#a8a8b3'/></button>
        </li>
      ))}

        
      </ul>
    </div>
  )
}


export default Profile;