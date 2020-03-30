import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from "../../services/api";
import { toast } from 'react-toastify';


function Logon(){

  const [id, setId] = useState('');
  const history = useHistory();

  const logonNotify = () => toast.success('Você está logado! 😀', {
    position: toast.POSITION.TOP_CENTER,
    className: 'notify'
  });

  const logonErrorNotify = () => toast.warning('❌ Ocorreu um erro no logon, tente novamente.', {
    position: toast.POSITION.TOP_CENTER,
    className: 'notify'
  });


  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const response = await api.post('sessions', { id });
      
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
      logonNotify();
    }catch(err){
      logonErrorNotify();
    }
  }

  return(
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input placeholder='Sua ID' value={id} onChange={e => setId(e.target.value)}  />
          <button className='button' type='submit'>Entrar</button>

          <Link className='back-link' to="/register">
            <FiLogIn size={16} color="E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img className='heroes' src={heroesImg} alt="heroes"/>
    </div>
  )
}

export default Logon;