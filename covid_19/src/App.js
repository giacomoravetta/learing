import "./App.css";
import Barchart from "./components/Barchart.js";
import DatePicker from "./components/DatePicker.js";
import UpdateButton from "./components/UpdateButton.js";
import { useState } from "react";

function App() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [date, setDate] = useState(false);

  const handleUpdate = () => {
    setButtonClicked(!buttonClicked);
  };

  return (
    <div className="App">
      <h1>Covid</h1>
      <p>
        This React app displays vaccination data across Italy's regions for a
        selected date. Users can view a bar chart showing the number of people
        vaccinated in each region, making it easy to compare vaccination
        progress. The app sources its data from official records to ensure
        accuracy.
      </p>
      <UpdateButton onUpdate={handleUpdate} />
      <DatePicker
        onDateChange={(selectedDate) => {
          setDate(selectedDate);
        }}
      />
      <Barchart
        buttonClicked={buttonClicked}
        chooseDate={date}
        setAnotherDate={setDate}
        setButtonClicked={setButtonClicked}
      />
    </div>
  );
}

export default App;
