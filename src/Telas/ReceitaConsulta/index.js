import './style.css';
import { useEffect, useState } from 'react';
import Principal from '../Principal';
import TabelaConsulta from '../../Components/TabelaConsulta';
import Modal from '../../Components/Modal';
import InputBox from '../../Components/InputBox';
import DataPicker from '../../Components/DataPicker';
import Situacao from '../../Components/Situacao';
import Face6Icon from '@mui/icons-material/Face6';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useParams } from 'react-router-dom';

import api from '../../api'

export default function ReceitaConsulta() {
    const [modal, setModal] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pessoa = JSON.parse(queryParams.get('pessoa'));
    const [contas, setContas] = useState([])

    useEffect(()=>{
        const fetchData = async () => {
            const res = await api.get('/contas')
            const contasReceitas = res.data.filter(conta => (conta.tipo_conta === "0" && conta.pessoa_id === pessoa.id) );
            setContas(contasReceitas)
        }

        fetchData()
    },[])

    return (
        <Principal className='receitaConsulta'>
            {modal && (
                <Modal titulo='Adicionar/Editar conta'>
                    <ModalConsulta row={modal} contas={contas} pessoaID={pessoa.id} setModal={setModal} />
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
                <p className='tipoConta'>{pessoa.modo_conta ? 'Dividido' : 'Individual'}</p>
            </div>
            <TabelaConsulta
                 setModal={setModal}
                 contas={contas}
            />
            <AddIcon
                className='bttnAddConta'
                onClick={() => setModal(-1)}
            />
        </Principal>
    );
}

const ModalConsulta = ({ row, setModal, pessoaID, contas }) => {
    const [data, setDataConsulta] = useState(dayjs().format('DD/MM/YYYY'))
    const [nome, setNome] = useState(row.nome || '')
    const [valor, setValor] = useState(row.valor || '')
    const [situacao, setSituacao] = useState(row.situacao || 0)
 
    const handleNome = (e) => {
        setNome(e.target.value)
    }

    const handleValor = (e) => {
        setValor(e.target.value)
    }

    const handleSave = async (opt, row) => {
        console.log(opt)
    
        const fetchData = async (isEdit) => {
            try {                
                let res;
                if (isEdit) {

                    const _data = {
                        id: row.id,
                        nome: nome,
                        valor: valor,
                        tipo_conta: row.tipo_conta,
                        pessoa_id: row.pessoa_id,
                        situacao: situacao,
                        data: data
                    };
                    console.log(row.id)

                    res = await api.put(`/contas/${row.id}`, _data);

                    row.nome = _data.nome;
                    row.valor = _data.valor;
                    row.situacao = _data.situacao;
                    row.data = _data.data;
                    console.log(res);
                } else {
                    const _data = {
                        id: uuidv4(),
                        nome: nome,
                        valor: valor,
                        tipo_conta: "0",
                        pessoa_id: pessoaID,
                        situacao: situacao,
                        data: data
                    };
                    res = await api.post(`/contas`, _data);
                    console.log(res);
                }
    
                //contas.push(_data);
    
                setModal(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        await fetchData(opt);
    };    

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
                <button
                    className='button cancelar'
                    onClick={() => setModal(false)}
                >Cancelar
                </button>
                <button
                    className='button salvar'
                    onClick={()=>handleSave(row !== -1, row)}
                >
                    {row !== -1 ? 'Salvar' : 'Adicionar'}
                </button>
            </InputBox>
        </>
    );
};