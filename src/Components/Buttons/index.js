import './style.css'

import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

function Button({className, text, icon, onClick}){
    return (
        <button onClick={onClick} className={`button ${className}`}>
            {/*<span>{text}</span>*/}
            {icon}
        </button>
    )
}

export function BttnSalvar({onClick, text}){
    return (
        <Button 
            className={['salvar']}
            text={text || 'Salvar'}
            icon={<SendIcon fontSize='small' />}
            onClick={onClick}
        />
    )
}

export function BttnCancelar({onClick, text}){
    return (
        <Button 
            className={['cancelar']}
            text={text || 'Cancelar'}
            icon={<CloseIcon fontSize='small' />}
            onClick={onClick}
        />
    )
}

export function BttnExcluir({onClick, text}){
    return (
        <Button 
            className={['excluir']}
            text={text || 'Excluir'}
            icon={<DeleteIcon fontSize='small' />}
            onClick={onClick}
        />
    )
}