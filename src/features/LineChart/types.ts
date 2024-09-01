import { SVGProps } from "react"
import { Pryttifier } from "../../shared/lib/Prettifier"

interface IData {
    x_range: number
    y_value: number
}

interface ILineChartProps extends SVGProps<SVGSVGElement> {
    data: Pryttifier<IData>[]
    colorOfLine?: string
    thresholds?: number
    width?: number
    height?: number
    marginTop?: number
    marginRight?: number
    marginBottom?: number
    marginLeft?: number
}

export type { ILineChartProps, IData }
