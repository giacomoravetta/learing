import React from 'react';

const AxisBottom = ({ xScale, height }) => {

  const ticks = xScale.domain();

  return (
    <g transform={`translate(0, ${height})`}>
      {ticks.map((tickValue, index) => {
        let splitIndex = tickValue.length > 10 ? tickValue.substring(0, 20).lastIndexOf(' ') : -1;
        splitIndex = splitIndex > 0 ? splitIndex : 20;
        const firstRow = tickValue.substring(0, splitIndex);
        const secondRow = tickValue.length > 20 ? tickValue.substring(splitIndex + 1) : null;

        return (
          <g key={index} transform={`translate(${xScale(tickValue) + xScale.bandwidth() / 2}, 0)`}>
            <line y2="6" stroke="black" />
            <text
              dy=".71em"
              y="9"
              textAnchor="middle"
              transform={`translate(${(-xScale.bandwidth() / 2) + 10 / 2 + 2}, 60) rotate(-90)`}
              style={{ fontSize: '10px' }}
            >
              <tspan x={0} dy="0">{firstRow}</tspan>
              {secondRow && <tspan x={0} dy="1.2em">{secondRow}</tspan>}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export default AxisBottom;
