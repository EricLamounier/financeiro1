import './style.css'

import { Link } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Face6Icon from '@mui/icons-material/Face6';

export default function CaixaOpcao({path, pessoa}){
    return (
        <Link to={path || '/'} className='caixaOpcao'>
            <div className='pessoaInfo'>
                <Face6Icon className='imagemPessoa'/>
                <div className='content'>
                    <p>{pessoa.nome}</p>
                    <div className='valores'>
                        <p>Recebido: <span>{pessoa.recebido}</span></p>
                        <p>A receber: <span>{pessoa.a_receber}</span></p>
                        <p>Total: <span>{pessoa.total_receber}</span></p>
                    </div>
                </div>
                <p className='tipoConta'>
                    {pessoa.modo_pessoa ? 'Dividido' : 'Individual'}
                </p>
            </div>
            <ArrowForwardIosIcon />            
        </Link>
    )
}