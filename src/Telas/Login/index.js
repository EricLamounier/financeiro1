import { useState } from 'react'
import './style.css'

export default function Login({setLogin, setToken}){

    const [pwd, setPwd] = useState('')

    const handlePassword = (e) => {
        setPwd(e.target.value)
    }

    const handleEntrar = (e) => {
        e.preventDefault()
        //setToken(pwd)
        console.log(pwd)
        setLogin(pwd == '123')
    }

    return (
        <div id="login">
            <div className='inputBox'>
                <input 
                    type="password" 
                    placeholder='Token'
                    required
                    onChange={handlePassword}
                />
                <button 
                    className='button salvar'
                    onClick={handleEntrar}
                >Entrar</button>
            </div>
        </div>
    )
}