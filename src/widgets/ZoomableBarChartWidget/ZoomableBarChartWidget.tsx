import { ReactNode } from "react"
import { CommonTemplate } from "../../shared/ui/CommonTemplate/CommonTemplate"
import { ZoomableBarChart } from "../../features/ZoomableBarChart/ZoomableBarChart"
import { transformMackDataToBarChartData } from "./utils/transformMackDataToBarChartData"
import { IZoomableBarChartWidgetProps } from "./types"
import classNamesConstructor from "classnames"
import styles from "./ZoomableBarChartWidget.module.css"
import { mockData } from "./mockData"

export const ZoomableBarChartWidget = ({ className }: IZoomableBarChartWidgetProps): ReactNode => {
    const classnameForWrapper: string = classNamesConstructor(styles.zoomableBarChartWidget, {
        [String(className)]: className,
    })

    return (
        <CommonTemplate title='Zoomable Chart bar' className={classnameForWrapper}>
            <ZoomableBarChart data={transformMackDataToBarChartData(mockData)} colorOfRectangle='red' />
        </CommonTemplate>
    )
}
