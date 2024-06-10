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
            />
        ))}
        </tbody>
    </table>
);
}

const Row = ({row, setModal}) => {
    return (
        <tr onClick={()=>setModal(row)}>
            <td>{row.nome || ''}</td>
            <td>{row.data || ''}</td>
            <td>{row.valor || ''}</td>
            <td className={`tdsituacao${row.situacao}`}>{(Number(row.situacao) ? 'Recebido' : 'Pendente') || ''}</td>
        </tr>
    )
}