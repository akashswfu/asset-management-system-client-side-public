import useAssetsReqByEmploy from "../../../ReactHooks/useAssetsReqByEmploy";
import { PieChart, Pie, Cell, Legend } from "recharts";
const COLORS = ["#0088FE", "#FF8042"];

const PieCharts = () => {
  const [allReq] = useAssetsReqByEmploy();

  if (allReq.length === 0) {
    return (
      <div className="text-center text-7xl h-min-[cal(100vh-130px)] text-blue-400 py-10">
        Loading....
      </div>
    );
  }

  const returnable = allReq.filter((item) => item.type === "Returnable").length;
  console.log(returnable);
  const nonReturnable = allReq.filter(
    (item) => item.type === "Non-returnable"
  ).length;

  const chartData = [
    {
      name: "Returnable",
      quantity: returnable,
    },
    {
      name: "Non-returnable",
      quantity: nonReturnable,
    },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  console.log(chartData);
  const pieChartData = chartData.map((data) => {
    return { name: data.name, value: data.quantity };
  });

  return (
    <div>
      <h2 className="text-center uppercase text-4xl pb-10 pt-10 text-green-500">
        Percent of Returnable Items and Non-Returnable Items
      </h2>

      <div className="flex justify-center w-full">
        <PieChart width={1000} height={400}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
      </div>
    </div>
  );
};

export default PieCharts;