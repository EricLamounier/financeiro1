import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';

import Home from '../../Telas/Home';
import Receitas from '../../Telas/Receitas';
import Despesas from '../../Telas/Despesas';
import Graficos from '../../Telas/Graficos';
import Login from '../../Telas/Login';
import Menu from '../Menu';
import FiltroData from '../FiltroData';
import ReceitaConsulta from '../../Telas/ReceitaConsulta';

export default function Rotas() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState('')
  const [token, setToken] = useState(false)

  useEffect(()=>{
    console.log(token)
  }, [token])
  return (
    <>
      {token ? (
        <>
        <button onClick={()=>setAuthenticated(false)}> sair </button>
          <FiltroData />
          <PrivateRoutes />
          <Menu />
        </>
      ) : <Login 
            setToken={setToken} 
            setLogin={(setAuthenticated)} 
          />}
    </>
  );
}

const PrivateRoutes = () => {
  return (
      <Routes>
          <Route path='/' element={<Navigate to="/receitas" />} />
          <Route path='/home' element={<Home />} />
          <Route path='/receitas' element={<Receitas />} />
          <Route path='/despesas' element={<Despesas />} />
          <Route path='/graficos' element={<Graficos />} />
          <Route path='/receitas/consultas' element={<ReceitaConsulta />} />
      </Routes>
  )
}