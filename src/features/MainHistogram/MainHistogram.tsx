/*
    Основная Гистограмма. Можно настроить как X-ось так и Y-ось.
    Значение прямоугольника по оси Y - среднее арифметическое из всех y_value полей объектов
    которые входят в орезок по оси X, занимаемый Этим же прямугольником. Надеюсь понятно =)
*/

import { ReactNode, useEffect, useRef } from "react"
import { IData, IMainHistogramProps } from "./types"
import * as d3 from "d3"
import classNamesConstructor from "classnames"
import styles from "./MainHistogram.module.css"

const searchAverageNumber = (data: number[]): number => {
    if (data.length) {
        const sum: number = data.reduce<number>((acc, item) => {
            acc += item
            return acc
        }, 0)

        return Math.floor(sum / data.length)
    } else return 0
}
export const MainHistogram = ({
    className,
    data,
    thresholds = 40,
    colorOfRectangle = "steelblue",
    width = 928,
    height = 500,
    marginTop = 30,
    marginRight = 0,
    marginBottom = 30,
    marginLeft = 40,
    ...props
}: IMainHistogramProps): ReactNode => {
    const classnameForWrapper: string = classNamesConstructor(styles.mainHistogram, {
        [String(className)]: className,
    })

    const svgRef = useRef<SVGSVGElement>(null)
    useEffect(() => {
        // Clear the SVG container
        d3.select(svgRef.current).selectAll("*").remove()

        // Bin the data.
        const bins = d3
            .bin()
            .thresholds(thresholds)
            .value((d: any) => d.x_range)(data as any)

        // Declare the x (horizontal position) scale.
        const x = d3
            .scaleLinear()
            .domain([bins[0].x0, bins[bins.length - 1].x1] as Iterable<d3.NumberValue>)
            .range([marginLeft, width - marginRight])

        // Declare the y (vertical position) scale.
        const y = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(bins as any, (d: IData[]) => searchAverageNumber(d.map<number>((item) => item.y_value))),
            ] as Iterable<d3.NumberValue>)
            .range([height - marginBottom, marginTop])

        // Create the SVG container.
        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;")

        // Clear previous content
        svg.selectAll("*").remove()

        // Add a rect for each bin.
        svg.append("g")
            .attr("fill", colorOfRectangle)
            .selectAll("rect")
            .data(bins)
            .join("rect")
            .attr("x", (d) => x(d.x0 as number) + 1)
            .attr("width", (d) => x(d.x1 as number) - x(d.x0 as number) - 1)
            .attr("y", (d: any[]) => y(searchAverageNumber(d.map<number>((item) => item.y_value))))
            .attr("height", (d: any[]) => y(0) - y(searchAverageNumber(d.map<number>((item) => item.y_value))))

        // Add the x-axis and label.
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(
                d3
                    .axisBottom(x)
                    .ticks(width / 80)
                    .tickSizeOuter(0)
            )
            .call((g) =>
                g
                    .append("text")
                    .attr("x", width)
                    .attr("y", marginBottom - 4)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "end")
                    .text("Unemployment rate (%) →")
            )

        // Add the y-axis and label, and remove the domain line.
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call((g) => g.select(".domain").remove())
            .call((g) =>
                g
                    .append("text")
                    .attr("x", -marginLeft)
                    .attr("y", 10)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .text("↑ Frequency (no. of counties)")
            )
    }, [])
    return <svg ref={svgRef} className={classnameForWrapper} {...props}></svg>
}
