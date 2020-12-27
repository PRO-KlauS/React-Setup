import React from 'react';
import {
  PieChart as ReactPieChart,
  Pie,
  // Sector,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const PieChart = ({
  onClick,
  activeIndex,
  innerRadius,
  outerRadius,
  data,
  cx,
  cy,
  height,
  width,
  parentClassName,
  childClassName,
  colors,
}) => {
  // const renderActiveShape = (props) => {
  //   const {
  //     cx,
  //     cy,
  //     innerRadius,
  //     outerRadius,
  //     startAngle,
  //     endAngle,
  //     fill,
  //     payload,
  //   } = props;

  //   return (
  //     <g>
  //       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
  //         {payload.name}
  //       </text>
  //       <Sector
  //         cx={cx}
  //         cy={cy}
  //         innerRadius={innerRadius}
  //         outerRadius={outerRadius + 10}
  //         startAngle={startAngle}
  //         endAngle={endAngle}
  //         fill={fill}
  //       />
  //       {/* <Tooltip content={<CustomTooltip />} /> */}
  //     </g>
  //   );
  // };

  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <span className="chart-tooltip">
          <p className="label">{`${payload[0].payload.name}`}</p>
          <p className="percent">
            {payload[0].payload.entity_count +
              ' (' +
              payload[0].payload.percent +
              '%)'}
          </p>
        </span>
      );
    }

    return null;
  };

  return (
    <>
      <ResponsiveContainer width={400} height={400}>
        <ReactPieChart
          className={parentClassName}
          width={height || 400}
          height={width || 400}>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Pie
            activeIndex={activeIndex}
            // activeShape={renderActiveShape}
            data={data}
            cx={cx || 200}
            cy={cy || 200}
            innerRadius={innerRadius || 80}
            outerRadius={outerRadius || 150}
            dataKey="entity_count"
            isAnimationActive={true}
            onClick={onClick}
            className={childClassName}>
            {data.map((_, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index > 19 ? index - 20 : index]}
                  cursor="pointer"
                />
              );
            })}
          </Pie>
        </ReactPieChart>
      </ResponsiveContainer>
      {/* <div className="legend-parent">
        {data &&
          data.map((item, index) => {
            return (
              <div className="legend">
                <span
                  style={{
                    backgroundColor: colors[index > 19 ? index - 20 : index],
                  }}
                  className="color-box"
                />
                <span>{item.name}</span>
              </div>
            );
          })}
      </div> */}
    </>
  );
};

export default PieChart;
