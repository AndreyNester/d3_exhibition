import { ReactNode } from "react"
import { BarChart } from "../../features/BarChart/BarChart"
import { IChartBarWidgetProps } from "./types"
import classNamesConstructor from "classnames"
import styles from "./ChartBarWidget.module.css"
import { mockData } from "./mockData"
import { CommonTemplate } from "../../shared/ui/CommonTemplate/CommonTemplate"
import { transformMackDataToBarChartData } from "./utils/transformMackDataToBarChartData"

export const ChartBarWidget = ({ className }: IChartBarWidgetProps): ReactNode => {
    const classnameForWrapper: string = classNamesConstructor(styles.chartBarWidget, {
        [String(className)]: className,
    })

    return (
        <CommonTemplate title='Chart bar' className={classnameForWrapper}>
            <BarChart data={transformMackDataToBarChartData(mockData)} />
        </CommonTemplate>
    )
}
