import { ReactNode } from "react"
import styles from "./App.module.css"
import { ChartBarWidget } from "./widgets/ChartBarWidget/ChartBarWidget"
import { ZoomableBarChartWidget } from "./widgets/ZoomableBarChartWidget/ZoomableBarChartWidget"
import { SimpleHistogramWidget } from "./widgets/SimpleHistogramWidget/SimpleHistogramWidget"
import { MainHistogramWidget } from "./widgets/MainHistogramWidget/MainHistogramWidget"
import { LineChartWidget } from "./widgets/LineChartWidget/LineChartWidget"

function App(): ReactNode {
    return (
        <div className={styles.container}>
            <ChartBarWidget />
            <ZoomableBarChartWidget />
            <SimpleHistogramWidget />
            <MainHistogramWidget />
            <LineChartWidget />
        </div>
    )
}

export default App
