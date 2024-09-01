import classNamesConstructor from "classnames"
import styles from "./MainHistogramWidget.module.css"
import { ReactNode } from "react"
import { CommonTemplate } from "../../shared/ui/CommonTemplate/CommonTemplate"
import { IMainHistogramWidgetProps } from "./types"
import { MainHistogram } from "../../features/MainHistogram/MainHistogram"
import { transformMockDatToMainHistogramData } from "./utils/transformMockDatToHistogramData"
import { mockData } from "./mockData"

export const MainHistogramWidget = ({ className }: IMainHistogramWidgetProps): ReactNode => {
    const classnameForWrapper: string = classNamesConstructor(styles.mainHistogramWidget, {
        [String(className)]: className,
    })
    return (
        <CommonTemplate title='Main Histogramm' className={classnameForWrapper}>
            <MainHistogram
                data={transformMockDatToMainHistogramData(mockData)}
                colorOfRectangle='brown'
                thresholds={10}
            />
        </CommonTemplate>
    )
}
