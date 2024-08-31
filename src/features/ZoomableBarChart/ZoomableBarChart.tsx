import { ReactNode, useEffect, useRef } from "react"
import { IZoomableBarChartProps } from "./types"
import classNamesConstructor from "classnames"
import styles from "./ZoomableBarChart.module.css"
import { NumberValue } from "d3"
import * as d3 from "d3"

export const ZoomableBarChart = ({
    className,
    data,
    colorOfRectangle = "steelblue",
    ascending = false,
    width = 928,
    height = 500,
    marginTop = 20,
    marginRight = 0,
    marginBottom = 30,
    marginLeft = 40,
    ...props
}: IZoomableBarChartProps): ReactNode => {
    const classnamesForWrapper: string = classNamesConstructor(styles.zoomableBarChart, {
        [String(className)]: className,
    })

    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        /*
      Эффект для конструирования и настройки svg элемента (с зумом)
  */

        // Clear the SVG container
        d3.select(svgRef.current).selectAll("*").remove()

        // Create the horizontal scale and its axis generator.
        const x = d3
            .scaleBand()
            .domain(d3.sort(data, (d) => (ascending ? d.y_value : -d.y_value)).map((d) => d.x_label))
            .range([marginLeft, width - marginRight])
            .padding(0.1)

        const xAxis = d3.axisBottom(x).tickSizeOuter(0)

        // Create the vertical scale.
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.y_value)] as Iterable<NumberValue>)
            .nice()
            .range([height - marginBottom, marginTop])

        // Create the SVG container.
        const svg = d3
            .select(svgRef.current)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;")
            .call(zoom)

        // Append the bars.
        const barsGroup = svg.append("g").attr("class", "bars").attr("fill", colorOfRectangle)

        barsGroup
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", (d) => x(d.x_label) as number | string)
            .attr("y", (d) => y(d.y_value))
            .attr("height", (d) => y(0) - y(d.y_value))
            .attr("width", x.bandwidth())

        // Append the axes.
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(xAxis)

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y))
            .call((g) => g.select(".domain").remove())

        function zoom(svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>) {
            const extent: [[number, number], [number, number]] = [
                [marginLeft, marginTop],
                [width - marginRight, height - marginTop],
            ]

            svg.call(d3.zoom().scaleExtent([1, 8]).translateExtent(extent).extent(extent).on("zoom", zoomed) as any)

            function zoomed(event: any) {
                const newX = x.range([marginLeft, width - marginRight].map((d) => event.transform.applyX(d)))
                svg.selectAll(".bars rect")
                    .attr("x", (d: any) => newX(d.x_label) as string | number)
                    .attr("width", newX.bandwidth())
                svg.select(".x-axis").call(xAxis.scale(newX) as any)
            }
        }
    }, [data])

    return <svg ref={svgRef} className={classnamesForWrapper} {...props}></svg>
}
