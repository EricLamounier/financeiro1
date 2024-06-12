import './style.css';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker as DatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useEffect, useState } from 'react';

dayjs.locale('pt-br');

export default function DataPicker({ setData, data, formato }) {

  const [selectedDate, setSelectedDate] = useState(data ? dayjs(data) : dayjs());

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.format(formato);
    setSelectedDate(newDate);
    setData(formattedDate);
    console.log(formattedDate)
  };

  useEffect(()=>{
    setData(selectedDate.format(formato));
    console.log(selectedDate.format(formato))
  }, [selectedDate])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem>
        <DatePicker 
          value={selectedDate}
          views={formato == 'MM/YYYY' ? ['year', 'month'] : ['year', 'month', 'day']}
          onChange={handleDateChange}
          format={formato}
        />
      </DemoItem>
    </LocalizationProvider>
  );
}