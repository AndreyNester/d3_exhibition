import { ReactNode } from "react"
import styles from "./App.module.css"
import { ChartBarWidget } from "./widgets/ChartBarWidget/ChartBarWidget"
import { ZoomableBarChartWidget } from "./widgets/ZoomableBarChartWidget/ZoomableBarChartWidget"
import { SimpleHistogramWidget } from "./widgets/SimpleHistogramWidget/SimpleHistogramWidget"
import { MainHistogramWidget } from "./widgets/MainHistogramWidget/MainHistogramWidget"

function App(): ReactNode {
    return (
        <div className={styles.container}>
            <ChartBarWidget />
            <ZoomableBarChartWidget />
            <SimpleHistogramWidget />
            <MainHistogramWidget />
        </div>
    )
}

export default App
