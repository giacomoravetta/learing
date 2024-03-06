
import { useState } from 'react';
import "../css/DataPicker.css"

const DatePicker = ({ onDateChange }) => {
  const [date, setDate] = useState('');

  const handleChange = (event) => {
    setDate(event.target.value);
    console.log(event.target.value)
    onDateChange(event.target.value);
  };

  return (
    <div className="date-picker-container">
      < label htmlFor="date-picker" > Choose a date: </label >
      < input
        id="date-picker"
        type="date"
        value={date}
        onChange={handleChange}
      />
    </div >
  );
};

export default DatePicker;
