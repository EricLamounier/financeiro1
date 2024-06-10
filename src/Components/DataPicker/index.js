import './style.css';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker as DatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useState } from 'react';

dayjs.locale('pt-br');

export default function DataPicker({ setData, data, initialDate, formato }) {
  const currentDate = data ? dayjs(data, 'DD/MM/YYYY') : dayjs();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  /*useEffect(() => {
    setData(selectedDate.format('MM/YYYY'));
    console.log(selectedDate);
  }, [selectedDate, setData]);*/

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.format('MM/YYYY');
    setSelectedDate(newDate);
    setData(formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem>
        <DatePicker 
          value={currentDate}
          views={formato == 'MM/YYYY' ? ['year', 'month'] : ['year', 'month', 'day']}
          onChange={handleDateChange}
          format={formato}
        />
      </DemoItem>
    </LocalizationProvider>
  );
}