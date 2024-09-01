import { ReactNode } from "react"
import styles from "./App.module.css"
import { ChartBarWidget } from "./widgets/ChartBarWidget/ChartBarWidget"
import { ZoomableBarChartWidget } from "./widgets/ZoomableBarChartWidget/ZoomableBarChartWidget"
import { HistogramWidget } from "./widgets/SimpleHistogramWidget/SimpleHistogramWidget"

function App(): ReactNode {
    return (
        <div className={styles.container}>
            <ChartBarWidget />
            <ZoomableBarChartWidget />
            <HistogramWidget />
        </div>
    )
}

export default App
