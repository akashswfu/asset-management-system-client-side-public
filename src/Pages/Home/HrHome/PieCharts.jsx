import useAssetsReqByEmploy from "../../../ReactHooks/useAssetsReqByEmploy";
import { PieChart, Pie, Cell, Legend } from "recharts";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
const COLORS = ["#0088FE", "#FF8042"];

const PieCharts = () => {
  const [allReq, isLoading] = useAssetsReqByEmploy();

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
      {allReq.length > 0 && (
        <h2 className="text-2xl md:text-4xl px-5 md:px-0 text-center font-bold my-8 text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text uppercase mt-20">
          Percent of Returnable Items and Non-Returnable Items
        </h2>
      )}
      <div className="flex md:justify-center  w-full">
        <PieChart width={1000} height={400}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
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

          {/* {allReq.length > 0 && <Legend className=""></Legend>} */}
        </PieChart>
      </div>

      <div className="flex justify-center mb-10 md:mb-0">
        {" "}
        <div className="flex gap-4 font-bold text-xl">
          <p className="text-[#0088FE]">Returnable</p>
          <p className="text-[#FF8042]">Non-returnable</p>
        </div>
      </div>
    </div>
  );
};

export default PieCharts;
