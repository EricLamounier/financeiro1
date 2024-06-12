import './style.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

import CaixaOpcao from '../../Components/CaixaOpcao'
import Principal from '../Principal'
import Modal from '../../Components/Modal';
import InputBox from '../../Components/InputBox'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Receitas(){

    const [pessoas, setPessoas] = useState([])

    useEffect(()=>{
        try{
            axios.get('http://192.168.3.9:3000/get_pessoa/0')
            .then(res=>{
                const pes = res.data
                setPessoas(pes)
                console.log(res.data)
            })
        }catch(err){
            console.log('Error: ' + err)
        }
    }, [])

    const [modal, setModal] = useState(false)

    return (
        <Principal className='receitas'>
            {modal && (
            <Modal
                titulo='Adicionar nova pessoa'    
            >
                <ModalAddReceitas 
                    setModal={setModal}
                    setPessoas={setPessoas}
                    pessoas={pessoas}    
                />
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

function ModalAddReceitas ({setModal, setPessoas, pessoas}) {

    const [nome, setNome] = useState('')
    const [valor, setValor] = useState('')
    const [selectedOption, setSelectedOption] = useState('0');

    const handleName = (e) => {
        setNome(e.target.value)
    }

    const handleValor = (e) => {
        setValor(e.target.value)
    }

    const handleTipoConta = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSalvar = () => {
        const _data = {
            nome: nome,
            valor: Number(valor),
            tipo_pessoa: 0,
            modo_pessoa: Number(selectedOption)
        }

        try{
            axios.post('http://192.168.3.9:3000/post_pessoa/', _data)
            .then(res=>{
                console.log(res.data)
                setPessoas([...pessoas, res.data])
            })
        }catch(err){
            console.log('Error: ' + err)
        }
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

            {/*<DataPicker setData={setDataAdicionaReceita}/>*/}
            
            <div className='boxTipoConta'>
                <InputBox className='radio'>
                    <input
                        id="pessoaIndividual"
                        type="radio"
                        name="inputradio"
                        value={'0'}
                        checked={selectedOption === '0'}
                        onChange={handleTipoConta}
                    />
                    <label className='inputRadio' htmlFor="pessoaIndividual">Individual</label>
                </InputBox>
                <InputBox className='radio'>
                    <input
                        id="pessoaDividido"
                        type="radio"
                        name="inputradio"
                        value={'1'}
                        checked={selectedOption === '1'}
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