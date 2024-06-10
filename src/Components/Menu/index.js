import './style.css'

import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import BlurOnOutlinedIcon from '@mui/icons-material/BlurOnOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';

import { useLocation } from 'react-router-dom';

import MenuOpcoes from '../MenuOpcoes';

export default function Menu() {

    const location = useLocation()

    return (
        <div id="menu">
            <MenuOpcoes
                icon={PaymentsOutlinedIcon}
                label={'Receitas'}
                isActive={location.pathname.startsWith('/receitas')}
                path={'/receitas'}
            />
            <MenuOpcoes
                icon={WalletOutlinedIcon}
                label={'Despesas'}
                isActive={location.pathname.startsWith('/despesas')}
                path={'/despesas'}
            />
            <MenuOpcoes
                icon={EqualizerOutlinedIcon}
                label={'Gráficos'}
                isActive={location.pathname.startsWith('/graficos')}
                path={'/graficos'}
            />
            <MenuOpcoes
                icon={BlurOnOutlinedIcon}
                label={'-'}
                isActive={location.pathname === '/'}
                path={'/'}
            />
        </div>
    )
}