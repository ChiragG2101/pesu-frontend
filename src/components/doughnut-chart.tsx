import React, { useEffect, useRef } from "react";

interface DoughnutChartProps {
  values: number[];
  colors?: string[];
  categories: string[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  values,
  colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"],
  categories,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const total = values.reduce((sum, value) => sum + value, 0);
      let cumulativeAngle = 0;
      let gradientString = "";

      values.forEach((value, index) => {
        const startAngle = cumulativeAngle;
        const angle = (value / total) * 360;
        cumulativeAngle += angle;

        gradientString += `white ${startAngle}deg ${startAngle + 1}deg, `;
        gradientString += `${colors[index % colors.length]} ${
          startAngle + 1
        }deg ${cumulativeAngle}deg${index < values.length - 1 ? "," : ""}`;

        if (index < values.length - 1) {
          gradientString += ` white ${cumulativeAngle}deg ${
            cumulativeAngle + 1
          }deg,`;
        }
      });

      chartRef.current.style.background = `conic-gradient(${gradientString})`;
    }
  }, [values, colors]);

  return (
    <div className="chart-container">
      <div className="chart" ref={chartRef}>
        <div className="inner-circle"></div>
      </div>
      <div className="legend">
        {categories.map((category, index) => (
          <div key={category} className="legend-item">
            <span
              className="color-box"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></span>
            <span>{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChart;
