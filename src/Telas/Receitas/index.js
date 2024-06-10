import CaixaOpcao from '../../Components/CaixaOpcao'
import Principal from '../Principal'
import DataPicker from '../../Components/DataPicker';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import './style.css'
import { useEffect, useState } from 'react';
import Modal from '../../Components/Modal';
import InputBox from '../../Components/InputBox'
import api from '../../api'

export default function Receitas(){

    const [pessoas, setPessoas] = useState([])

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await api.get('http://localhost:3000/pessoas');
                setPessoas(res.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, [])

    const [modal, setModal] = useState(false)

    return (
        <Principal className='receitas'>
            {modal && (
            <Modal
                titulo='Adicionar nova pessoa'    
            >
                <ModalAddReceitas setModal={setModal}/>
            </Modal>
            )}
            {
                pessoas.map((pessoa, index)=>(
                    <CaixaOpcao key={index} path={`/receitas/consultas?pessoa=${JSON.stringify(pessoa)}`} pessoa={pessoa} />
                ))
            }
            
            <div className='caixaOpcao adicionaNovaConta' onClick={()=>{setModal(true)}}>
                <p>Adicionar Nova Pessoa/Conta</p>
                <AddCircleOutlineIcon className='addContaIcon'/>
            </div>
        </Principal>
    )
}

function ModalAddReceitas ({setModal}) {

    const [nome, setNome] = useState('')
    const [valor, setValor] = useState('')
    const [data, setDataAdicionaReceita] = useState('')
    const [selectedOption, setSelectedOption] = useState('individual');

    const handleName = (e) => {
        setNome(e.target.value)
        console.log(e.target.value)
    }

    const handleValor = (e) => {
        setValor(e.target.value)
        console.log(e.target.value)
    }

    const handleTipoConta = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSalvar = () => {
        console.log(data)
    }

    return (
        <>
            <InputBox className='text'>
                <input 
                    id="nomePessoa" 
                    type='text'
                    value={nome}
                    required 
                    onChange={handleName}
                />
                <label htmlFor="nomePessoa">Nome Pessoa</label>
            </InputBox>
            <InputBox className='number'>
                <input 
                    id="valorInicial"
                    type='number'
                    value={valor}
                    required
                    onChange={handleValor}
                />
                <label htmlFor="valorInicial" >Valor inicial</label>
            </InputBox>

            <DataPicker setData={setDataAdicionaReceita}/>
            
            <div className='boxTipoConta'>
                <InputBox className='radio'>
                    <input
                        id="pessoaIndividual"
                        type="radio"
                        name="inputradio"
                        value="individual"
                        checked={selectedOption === 'individual'}
                        onChange={handleTipoConta}
                    />
                    <label className='inputRadio' htmlFor="pessoaIndividual">Individual</label>
                </InputBox>
                <InputBox className='radio'>
                    <input
                        id="pessoaDividido"
                        type="radio"
                        name="inputradio"
                        value="dividido"
                        checked={selectedOption === 'dividido'}
                        onChange={handleTipoConta}
                    />
                    <label className='inputRadio' htmlFor="pessoaDividido">Dividido</label>
                </InputBox>
            </div>
            
            <InputBox className='boxBotoes'>
                <button 
                    className='button cancelar'
                    onClick={()=>{setModal(false)}}
                >Cancelar</button>
                <button 
                    className='button salvar'
                    onClick={handleSalvar}
                >Salvar</button>
            </InputBox>
        </>
    )
}