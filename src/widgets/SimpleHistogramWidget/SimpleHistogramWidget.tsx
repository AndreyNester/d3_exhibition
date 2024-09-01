import { ReactNode } from "react"
import { CommonTemplate } from "../../shared/ui/CommonTemplate/CommonTemplate"
import { ISimpleHistogramWidgetProps } from "./types"
import { SimpleHistogram } from "../../features/SimpleHistogram/SimpleHistogram"
import classNamesConstructor from "classnames"
import styles from "./SimpleHistogramWidget.module.css"
import { mockData } from "./mockData"
import { transformMockDatToHistogramData } from "./utils/transformMockDatToHistogramData"

export const SimpleHistogramWidget = ({ className }: ISimpleHistogramWidgetProps): ReactNode => {
    const classnameForWrapper: string = classNamesConstructor(styles.simpleHistogramWidget, {
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
