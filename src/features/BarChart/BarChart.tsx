import { ReactNode, useEffect, useRef } from "react"
import styles from "./BarChart.module.css"
import { IBarChartProps } from "./types"
import classNamesConstructor from "classnames"
import { NumberValue } from "d3"
import * as d3 from "d3"

export const BarChart = ({
    className,
    data,
    colorOfRectangle = "steelblue",
    decsending = true,
    width = 928,
    height = 500,
    marginTop = 30,
    marginRight = 0,
    marginBottom = 30,
    marginLeft = 40,
    ...props
}: IBarChartProps): ReactNode => {
    const classnamesForWrapper = classNamesConstructor(styles.barChart, {
        [String(className)]: className,
    })

    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        /*
      Эффект для конструирования и настройки svg элемента
  */

        // Clear the SVG container
        d3.select(svgRef.current).selectAll("*").remove()

        // Declare the x (horizontal position) scale.
        const x = d3
            .scaleBand()
            .domain(
                d3.groupSort(
                    data,
                    ([d]) => (decsending ? -d.y_value : d.y_value),
                    (d) => d.x_label
                )
            )
            .range([marginLeft, width - marginRight])
            .padding(0.1)

        // Declare the y (vertical position) scale.
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.y_value)] as Iterable<NumberValue>)
            .range([height - marginBottom, marginTop])

        // Create the SVG container.
        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;")

        // Add a rect for each bar.
        svg.append("g")
            .attr("fill", colorOfRectangle)
            .selectAll()
            .data(data)
            .join("rect")
            .attr("x", (d) => x(d.x_label) as number)
            .attr("y", (d) => y(d.y_value))
            .attr("height", (d) => y(0) - y(d.y_value))
            .attr("width", x.bandwidth())

        // Add the x-axis and label.
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))

        // Add the y-axis and label, and remove the domain line.
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).tickFormat((y) => ((y as number) * 100).toFixed()))
            .call((g) => g.select(".domain").remove())
            .call((g) =>
                g
                    .append("text")
                    .attr("x", -marginLeft)
                    .attr("y", 10)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .text("↑ Frequency (%)")
            )
    }, [data])

    return <svg ref={svgRef} className={classnamesForWrapper} {...props}></svg>
}
