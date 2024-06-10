import './style.css'

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Situacao({option, situacao, setSituacaoConsulta}){
    
    const select = {
        0: {
            0: 'Pendente',
            1: 'Recebido'
        },
        1: {
            0: 'Pendente',
            1: 'Pago'
        }
    }

    const [sit, setSituacao] = useState(Number(situacao))

    const handleChange = (event) => {
        setSituacao(event.target.value);
        setSituacaoConsulta(event.target.value)
    };

    return (
        <Box sx={{ minWidth: 120, height: 40 }}>
            <FormControl fullWidth sx={{ borderColor: 'white' }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sit}
                    onChange={handleChange}
                    className={`situacao`}
                    sx={{ 
                        '& .MuiSelect-root': { color: '#fff' },
                        '& .MuiSelect-icon': { color: '#fff' },
                        '& .MuiInputBase-input': { color: '#fff' },
                        '& .MuiMenuItem-root': { color: '#fff' },
                        '& .MuiSelect-select.MuiSelect-select': {
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                        }
                    }}
                >
                    <MenuItem value={0}>{select[option][0]}</MenuItem>
                    <MenuItem value={1}>{select[option][1]}</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}