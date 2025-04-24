import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Rent', value: 0 },
  { name: 'Travel', value: 0 },
  { name: 'Hotel', value: 0},
  { name: 'Dineout', value: 24 },
  { name: 'Shopping', value: 90 },
];

const COLORS = [
    '#2e7d32', // dark green
    '#388e3c',
    '#43a047',
    '#66bb6a',
    '#81c784',
    // '#1b5e20', // deeper forest green
    // '#4caf50', // classic material green
    // '#7cb342', // yellow‑green
    // '#8bc34a', // light leaf green
    // '#9ccc65', // soft spring green
    // '#aed581', // muted pastel green
    // '#c5e1a5', // light, fresh green
    // '#dcedc8', // very pale mint
  ];
  

const MyPieChart = ({chartProps}) => {  
    console.log("props", chartProps);
    return(
  <PieChart width={400} height={300}>
    <Pie
      data={chartProps}
      cx="50%"
      cy="50%"
      innerRadius={60} 
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
)
};

export default MyPieChart;
