import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Rent', value: 40 },
  { name: 'Travel', value: 120 },
  { name: 'Hotel', value: 60 },
  { name: 'Dineout', value: 24 },
  { name: 'Shopping', value: 90 },
];

// Shades of green
const COLORS = ['#2e7d32', '#388e3c', '#43a047', '#66bb6a', '#81c784'];

const MyPieChart = () => (
  <PieChart width={400} height={300}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      outerRadius={100}
      fill="#4caf50"
      dataKey="value"
      label
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
);

export default MyPieChart;
