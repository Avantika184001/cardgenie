import React from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

const data = [{ name: "Progress", value: 45 }];

const LinearProgressBar = () => (
  <div style={{ width: 500, height: 20, overflow: "hidden" , borderColor: "black"}}>
    <BarChart
      width={480}
      height={20}
      data={data}
      layout="vertical"
      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
    >
      <XAxis type="number" domain={[0, 100]} hide />
      <YAxis type="category" dataKey="name" hide />

      {/* background bar = black (the ‘border’) */}
      <Bar
        dataKey="value"
        background={{
          fill: "#eee",
          radius: [20, 20, 20, 20],
        }}
        radius={[20, 20, 20, 20]}
        barSize={20}
        fill="#008500"
      />
    </BarChart>
  </div>
);

export default LinearProgressBar;
