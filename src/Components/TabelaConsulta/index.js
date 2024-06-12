import { useEffect, useState } from 'react';
import './style.css'

export default function TabelaConsulta({setModal, contas}) {
    
    return (
        <table className="tabelaConsulta">
            <thead>
                <tr>
                    <th>Conta</th>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Situação</th>
                </tr>
            </thead>
            <tbody>

            {contas.map((row, index) => (
                <Row 
                    key={index} 
                    row={row}
                    setModal={setModal}
                    index={index}
                />
            ))}
            </tbody>
        </table>
    );
}

const Row = ({row, index, setModal}) => {

    const formate_date = (inputDate) => {
        const data = new Date(inputDate);
        const dataFormatada = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return dataFormatada
    }

    function formatNumber(number) {
        return Number(number).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    const handleClick = () => {
        setModal({ ...row, index })
    }
    
    return (
        <tr onClick={handleClick}>
            <td>{row.nome || ''}</td>
            <td>{row.data ? formate_date(row.data) : ''}</td>
            <td>{formatNumber(row.valor) || 0.00}</td>
            <td className={`tdsituacao${row.situacao}`}>{(Number(row.situacao) ? 'Recebido' : 'Pendente') || ''}</td>
        </tr>
    )
}