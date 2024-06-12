import './style.css';
import { useEffect, useState } from 'react';
import Face6Icon from '@mui/icons-material/Face6';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Principal from '../Principal';
import TabelaConsulta from '../../Components/TabelaConsulta';
import Modal from '../../Components/Modal';
import InputBox from '../../Components/InputBox';
import DataPicker from '../../Components/DataPicker';
import Situacao from '../../Components/Situacao';
import { BttnCancelar, BttnExcluir, BttnSalvar } from '../../Components/Buttons';


export default function ReceitaConsulta() {
    const [modal, setModal] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pessoa = JSON.parse(queryParams.get('pessoa'));
    const [contas, setContas] = useState([])

    useEffect(()=>{

        try{
            axios.get(`http://192.168.3.9:3000/get_contas`, {
                params: {
                    pessoa_id: pessoa.id,
                    tipo_conta: 0
                }
            })
            .then(res => {
                setContas(res.data)
                console.log(res.data)
            })
        }catch(err){
            console.log('Error: ' + err)
        }
    },[])

    return (
        <Principal className='receitaConsulta'>
            {modal && (
                <Modal titulo='Adicionar/Editar conta'>
                    <ModalConsulta 
                        row={modal} 
                        contas={contas} 
                        pessoaID={pessoa.id} 
                        setModal={setModal}
                        setContas={setContas}
                    />
                </Modal>
            )}
            <div className='header'>
                <Face6Icon className='imagemPessoa' />
                <div className='content'>
                    <p>{pessoa.nome}</p>
                    <div className='valores'>
                        <p>Recebido: <span>{pessoa.recebido}</span></p>
                        <p>A receber: <span>{pessoa.a_receber}</span></p>
                        <p>Total: <span>{pessoa.total_receber}</span></p>
                    </div>
                </div>
                <p className='tipoConta'>{pessoa.modo_pessoa ? 'Dividido' : 'Individual'}</p>
            </div>
            <TabelaConsulta
                 setModal={setModal}
                 contas={contas}
            />
            <AddIcon
                className='bttnAddConta'
                onClick={() => setModal(1)}
            />
        </Principal>
    );
}

const ModalConsulta = ({ row, setModal, pessoaID, setContas, contas }) => {
    const [data, setDataConsulta] = useState(row.data)
    const [nome, setNome] = useState(row.nome || '')
    const [valor, setValor] = useState(row.valor || '')
    const [situacao, setSituacao] = useState(row.situacao || 0)
 
    const handleNome = (e) => {
        setNome(e.target.value)
    }

    const handleValor = (e) => {
        setValor(e.target.value)
    }

    const handleSave = async (opt) => {       
       let _data = {
            nome: nome,
            data: data,
            valor: Number(valor),
            situacao: situacao
        }

       if(opt){ // editar
            _data.data = data
            axios.put(`http://192.168.3.9:3000/put_conta/${row.id}`, _data)
            .then(res=>{
                setContas(novasContas => {
                    return [
                        ...novasContas.slice(0, row.index),
                        res.data[0],
                        ...novasContas.slice(row.index + 1)
                    ]
                })
                setModal(false)
            })
        return
       }

       //salvar

       _data.pessoa_id = pessoaID
       _data.tipo_conta = 0

       try{
        axios.post(`http://192.168.3.9:3000/post_conta/`, _data)
        .then(res=>{
            console.log(res.data)
            setContas([...contas, res.data])
            setModal(false)
        })
       }catch(err){
        console.log('Erro: ' + err)
       }

    };

    const handleCancel = () => {
        setModal(false)
    }

    const handleDelete = async () => {
        console.log(contas)
        console.log(row)

        try{
            axios.delete('http://192.168.3.9:3000/delete_conta/' + row.id)
            contas.splice(0, 1);
            setContas([...contas]);
            setModal(false)
        }catch(err){
            console.log('Erro: ' + err)
        }
    }

    return (
        <>
            <InputBox className='text'>
                <input
                    id='conta'
                    name='nome'
                    type='text'
                    value={nome}
                    onChange={handleNome}
                    required
                />
                <label htmlFor='conta'>Conta</label>
            </InputBox>

            <InputBox>
                <DataPicker
                    setData={setDataConsulta}
                    formato={'DD/MM/YYYY'}
                    data={data}
                    name='data'
                />
            </InputBox>

            <InputBox className='number'>
                <input
                    id='valor'
                    name='valor'
                    type='number'
                    value={valor}
                    onChange={handleValor}
                    required
                />
                <label htmlFor='valor'>Valor</label>
            </InputBox>
            
            <InputBox className='text'>
                <Situacao
                    setSituacaoConsulta={setSituacao}
                    option={0}
                    situacao={Number(situacao)}
                />
            </InputBox>
            <br />
            <InputBox className='boxBotoes'>
                { row !== 1 ? ( <BttnExcluir 
                    onClick={handleDelete}
                />) : false
                }
                <BttnCancelar
                    onClick={handleCancel}
                    text='-'
                />
                <BttnSalvar
                    onClick={()=>{handleSave(row !== 1)}}
                    text={row !== -1 ? 'Salvar' : 'Adicionar'}
                />
            </InputBox>
        </>
    );
};