import { ReactNode } from "react"
import { CommonTemplate } from "../../shared/ui/CommonTemplate/CommonTemplate"
import { IHistogramWidgetProps } from "./types"
import { SimpleHistogram } from "../../features/SimpleHistogram/SimpleHistogram"
import classNamesConstructor from "classnames"
import styles from "./SimpleHistogramWidget.module.css"
import { mockData } from "./mockData"
import { transformMockDatToHistogramData } from "./utils/transformMockDatToHistogramData"

export const HistogramWidget = ({ className }: IHistogramWidgetProps): ReactNode => {
    const classnameForWrapper: string = classNamesConstructor(styles.histogramWidget, {
        [String(className)]: className,
    })
    return (
        <CommonTemplate title='Simple Histogramm' className={classnameForWrapper}>
            <SimpleHistogram
                data={transformMockDatToHistogramData(mockData)}
                colorOfRectangle='green'
                thresholds={20}
            />
        </CommonTemplate>
    )
}
