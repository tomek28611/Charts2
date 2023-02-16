import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function Chart({ result }) {
  const data = result.map(({ entityId, count, type }) => ({ entityId, count, type }));

  return (
    <BarChart width={1000} height={300} data={data}>
      <XAxis dataKey="entityId" />
      <YAxis  />
      <Tooltip  />
      <Legend  />
      <Bar dataKey="count" fill="#8884d8" />
      
    </BarChart>
  );
}

export default Chart;
  