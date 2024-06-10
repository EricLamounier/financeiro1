import './style.css'

export default function Principal(props){
    return (
        <div id="principal" className={props.className}>
            {props.children}
        </div>
    )
}