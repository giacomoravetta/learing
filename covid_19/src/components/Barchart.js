import { useState, useEffect, useMemo } from 'react';
import * as d3 from "d3";
import rawData from '../data/sums_by_region_and_date.json';
import '../css/Barchart.css';
import AxisBottom from './AxisBottom';



const transformDataForDate = (rawData) => {
  const transformed = Object.keys(rawData).map(region => ({
    region: region,
    values: Object.entries(rawData[region]).map(([date, frequency]) => ({
      date,
      frequency
    }))
  }));
  return transformed;
};

const selectDataForSpecificDate = (transformedData, specificDate) => {
  return transformedData.map(({ region, values }) => {

    const dateValue = values.find(value => value.date === specificDate);
    return {
      region,
      frequency: dateValue ? dateValue.frequency : 0 // If date is not found, return 0 or handle as needed. TO CHANGE
    };
  }).sort((a, b) => a.frequency - b.frequency);
};


const Barchart = ({ buttonClicked, chooseDate, setButtonClicked, setAnotherDate }) => {

  const allDates = useMemo(() => {
    const dates = new Set();
    Object.values(rawData).forEach(regionData =>
      Object.keys(regionData).forEach(date => dates.add(date))
    );
    return Array.from(dates).sort();
  }, []);

  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const dataTransformed = useMemo(() => {
    if (allDates.length > 0) {
      return transformDataForDate(rawData);
    }
    return [];
  }, [allDates]);


  const dataForSpecificDate = chooseDate
    ? selectDataForSpecificDate(dataTransformed, chooseDate)
    : selectDataForSpecificDate(dataTransformed, allDates[currentDateIndex]);

  const date = chooseDate
    ? chooseDate
    : allDates[currentDateIndex]


  const margin = { top: 20, right: 40, bottom: 150, left: 40 };
  const width = 1000 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  useEffect(() => {
    if (buttonClicked) {
      setAnotherDate()

      const interval = setInterval(() => {
        setCurrentDateIndex(currentIndex => (currentIndex + 1) % allDates.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [buttonClicked, allDates.length, setAnotherDate, setButtonClicked]);


  const xScale = d3.scaleBand()
    .range([0, width])
    .padding(0.1)
    .domain(dataForSpecificDate.map(d => d.region));


  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(dataForSpecificDate, d => d.frequency)]);

  return (
    <>
      <h1>Date: {date}</h1>
      <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {dataForSpecificDate.map((bar, index) => (
            <g key={bar.region}>
              <rect
                className="bar"
                x={xScale(bar.region)}
                y={yScale(bar.frequency)}
                width={xScale.bandwidth()}
                height={height - yScale(bar.frequency)}
                fill="#838EE5"
              />
              <text
                x={xScale(bar.region) + xScale.bandwidth() / 2}
                y={yScale(bar.frequency) - 10}
                textAnchor="middle"
                style={{ fontSize: '10px' }}
                fill="black"
              >
                {bar.frequency}
              </text>
            </g>
          ))}
          <AxisBottom xScale={xScale} height={height} />
        </g>
        ))
      </svg >
    </>
  );
};



export default Barchart;
