import { ReactNode } from "react"
import { CommonTemplate } from "../../shared/ui/CommonTemplate/CommonTemplate"
import { ILineChartWidgetProps } from "./types"
import classNamesConstructor from "classnames"
import styles from "./LineChartWidget.module.css"
import { LineChart } from "../../features/LineChart/LineChart"
import { mockData } from "./mockData"
import { transformMockDataToLineChartData } from "./utils/transformMockDataToLineChartData"

export const LineChartWidget = ({ className }: ILineChartWidgetProps): ReactNode => {
    const classnameForWrapper: string = classNamesConstructor(styles.lineChartWidget, {
        [String(className)]: className,
    })
    return (
        <CommonTemplate title='Line Chart' className={classnameForWrapper}>
            <LineChart data={transformMockDataToLineChartData(mockData)} colorOfLine='black' />
        </CommonTemplate>
    )
}
