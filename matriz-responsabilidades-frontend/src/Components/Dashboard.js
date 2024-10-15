import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

const data = [
    { name: 'Activo', value: 10 },
    { name: 'Pendiente', value: 5 },
    { name: 'Finalizado', value: 3 },
];

const Dashboard = () => (
    <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" />
        <Tooltip />
    </PieChart>
);

export default Dashboard;
