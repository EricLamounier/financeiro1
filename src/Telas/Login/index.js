import { useState } from 'react'
import axios from 'axios'

import './style.css'

export default function Login({setToken}){

    const [pwd, setPwd] = useState('')
    const [valid, setValid] = useState('')
    const [message, setMessage] = useState('')

    const handlePassword = (e) => {
        setPwd(e.target.value)
    }

    const handleEntrar = async (e) => {

        if(pwd.length === 0){
            setValid('invalid')
            setMessage('Campo vazio!')
            return
        }
        setValid('')

        await axios.get(`http://192.168.3.9:3000/login/${pwd}`)
        .then(res => {
            if(Number(res.data) === 0){
                setMessage('Token inválido!')
                setValid('invalid')
                return
            }
            setToken(true)
        })
        .catch(error => {
          console.error('Erro ao obter itens:', error);
        });
    }

    return (
        <div id="login">
            <div className={`inputBox`}>
                <input 
                    className={`${valid}`}
                    type="password" 
                    placeholder='Token'
                    required
                    onChange={handlePassword}
                />
                <label className={`labelLogin ${valid}`}>{message}</label>
                <button 
                    className='button salvar'
                    onClick={handleEntrar}
                >Entrar</button>
            </div>
        </div>
    )
}