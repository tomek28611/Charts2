import React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

function Chart({ result }) {
  // entities by type
  const countsByType = result.reduce((acc, entity) => {
    acc[entity.type] = (acc[entity.type] || 0) + 1;
    return acc;
  }, {});

  // data to array 
  const data = Object.keys(countsByType).map(type => ({ type, count: countsByType[type] }));

  return (
    <BarChart width={1000} height={400} data={data}>
      <XAxis dataKey="type" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="type" fill="#8884d8" />
      <Bar dataKey="count" fill="#2884d8" />
    </BarChart>
  );
}

export default Chart;

