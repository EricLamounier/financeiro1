import './style.css'
import { useState } from 'react';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import DataPicker from '../DataPicker'

export default function FiltroData(){

    const [data, setData] = useState('')

    return (
        
        <div id="filtroData">
            <div id="data">
                <TodayOutlinedIcon 
                    id="dataIcon"
                />
                <DataPicker 
                    setData={setData}
                    formato={'MM/YYYY'}    
                />
            </div>
        </div>
    )
}