import React from 'react';
import * as Recharts from 'recharts';
const { PieChart, Pie, Tooltip, Cell, Legend } = Recharts;
const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

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

export default function Graphs(props) {
  const val = { A: 'Long distance', B: 'Point to Point', C: 'Hourly Rental' };

  const result = props.data
    .reduce(
      (acc, o) => (
        (acc[o.travel_type_id] = (acc[o.travel_type_id] || 0) + 1), acc
      ),
      []
    )
    .map((d, i) => ({ name: val[String.fromCharCode(64 + i)], value: d }))
    .slice(1, 4);
  return (
    <div className='container c2 shadow p-3 mb-5 bg-white'>
      <h3 className='font-weight-light'>Graph according to travel type</h3>
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
