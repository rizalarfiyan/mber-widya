import useTheme from '@/store/use-theme'
import { Cell, PieChart, Pie, ResponsiveContainer } from 'recharts'
import { useShallow } from 'zustand/react/shallow'

type ColorsItem = {
  value: number
  color: string
}

type GaugeChartProps = {
  score: number
  label: string
  colors: ColorsItem[]
}

type ArrowProps = {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  score: number
  label: string
}

const Arrow = ({ cx, cy, midAngle, innerRadius, score, label }: ArrowProps) => {
  const isDarkMode = useTheme(useShallow(state => state.isDarkMode))

  const RADIAN = Math.PI / 180
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const mx = cx + (innerRadius + 0.03) * cos
  const my = cy + (innerRadius + 0.03) * sin
  const ex = mx - 0.1
  const ey = my

  const arrowColor = isDarkMode ? '#fff' : '#000'

  return (
    <g style={{ fill: arrowColor }}>
      <text x={cx} y={cy} dx={-110} dy={60} textAnchor="start" className="font-sans text-base font-normal text-current">
        0
      </text>
      <text x={cx} y={cy} dx={95} dy={60} textAnchor="start" className="font-sans text-base font-normal text-current">
        100
      </text>
      <text x={cx} y={cy} dy={8} textAnchor="middle" className="font-sans text-6xl font-bold text-current">
        {score}
      </text>
      <text x={cx} y={cy} dy={50} textAnchor="middle" className="font-sans text-base font-bold text-current">
        {label}
      </text>
      <g transform={`translate(${ex + (cos >= 0 ? 1 : -1) * 2} ${ey})`}>
        <g transform={`rotate(${-midAngle + 180})`}>
          <polygon points="20,-10 20,10 -10,0" className="fill-current stroke-1" />
        </g>
      </g>
    </g>
  )
}

const GaugeChart = ({ score, label, colors }: GaugeChartProps) => {
  const sumValues = colors.map(cur => cur.value).reduce((a, b) => a + b, 0)
  const arrowData = [{ value: score }, { value: 1 }, { value: sumValues - score }]

  const pieRadius = {
    outerRadius: '89%',
    innerRadius: '65%',
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={colors} dataKey="value" fill="#eee" {...pieRadius} startAngle={200} endAngle={-20}>
          {colors.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Pie
          dataKey="value"
          stroke="none"
          activeIndex={1}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          activeShape={(props: any) => <Arrow {...props} score={score} label={label} />}
          data={arrowData}
          outerRadius={pieRadius.outerRadius}
          innerRadius={pieRadius.innerRadius}
          fill="none"
          startAngle={200}
          endAngle={-20}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default GaugeChart
