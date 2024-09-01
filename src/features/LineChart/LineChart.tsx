import classNamesConstructor from "classnames"
import { ReactNode, useEffect, useRef } from "react"
import styles from "./LineChart.module.css"
import { ILineChartProps } from "./types"
import * as d3 from "d3"

export const LineChart = ({
    className,
    data,
    thresholds = 40,
    colorOfLine = "steelblue",
    width = 928,
    height = 500,
    marginTop = 30,
    marginRight = 0,
    marginBottom = 30,
    marginLeft = 40,
    ...props
}: ILineChartProps): ReactNode => {
    const svgRef = useRef<SVGSVGElement>(null)
    const classnameForWrapper: string = classNamesConstructor(styles.lineChart, {
        [String(className)]: className,
    })

    useEffect(() => {
        // Create the SVG container
        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;")

        // Declare the x (horizontal position) scale
        const x = d3
            .scaleUtc()
            .domain(d3.extent(data, (d) => new Date(d.x_range)) as Iterable<Date | d3.NumberValue>)
            .range([marginLeft, width - marginRight])

        // Declare the y (vertical position) scale
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.y_value)] as Iterable<d3.NumberValue>)
            .range([height - marginBottom, marginTop])

        // Declare the line generator
        const line = d3
            .line()
            .x((d: any) => x(new Date(d.x_range)))
            .y((d: any) => y(d.y_value))

        // Clear previous content
        svg.selectAll("*").remove()

        // Add the x-axis
        svg.append("g")
            .attr("transform", `translate(0, ${height - marginBottom})`)
            .call(
                d3
                    .axisBottom(x)
                    .ticks(width / 80)
                    .tickSizeOuter(0)
            )

        // Add the y-axis, remove the domain line, add grid lines and a label
        svg.append("g")
            .attr("transform", `translate(${marginLeft}, 0)`)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call((g) => g.select(".domain").remove())
            .call((g) =>
                g
                    .selectAll(".tick line")
                    .clone()
                    .attr("x2", width - marginLeft - marginRight)
                    .attr("stroke-opacity", 0.1)
            )
            .call((g) =>
                g
                    .append("text")
                    .attr("x", -marginLeft)
                    .attr("y", 10)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .text("Price of Oil ($)")
            )

        // Append a path for the line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", colorOfLine)
            .attr("stroke-width", 1.5)
            .attr("d", line as any)
    }, [])

    return <svg ref={svgRef} className={classnameForWrapper} {...props}></svg>
}
