import React from 'react';
import * as Recharts from 'recharts';
const { PieChart, Pie, Tooltip, Cell, Legend } = Recharts;
const COLORS = ['#38ce21', '#e54045'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Graph1(props) {
  const val = { 1: 'Cancelled Rides', 0: 'Successful Rides' };

  const result = props.data
    .reduce(
      (acc, o) => (
        (acc[o.Car_Cancellation] = (acc[o.Car_Cancellation] || 0) + 1), acc
      ),
      []
    )
    .map((d, i) => ({ name: val[i], value: d }));
  console.log(result);
  return (
    <div className='container c2 shadow p-3 mb-5 bg-white'>
      <h3 className='font-weight-light'>
        Successful Rides and Cancelled Rides
      </h3>
      <PieChart
        width={800}
        height={400}
        margin={{ top: 20, right: 30, left: 230, bottom: 0 }}
      >
        <Pie
          dataKey='value'
          isAnimationActive={false}
          data={result}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={120}
          fill='#8884d8'
          label={renderCustomizedLabel}
        >
          {result.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
