import './style.css'

export default function Modal(props){
    return (
        <div id="modal">
            <div className='modalBox'>
                <p className='modalTitulo'>{props.titulo}</p>
                <br />
                <div className='modalForm'>
                    {props.children}
                </div>
                
            </div>
        </div>
    )
}