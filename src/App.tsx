import { ReactNode } from "react"
import styles from "./App.module.css"
import { ChartBarWidget } from "./widgets/ChartBarWidget/ChartBarWidget"
import { ZoomableBarChartWidget } from "./widgets/ZoomableBarChartWidget/ZoomableBarChartWidget"

function App(): ReactNode {
    return (
        <div className={styles.container}>
            <ChartBarWidget />
            <ZoomableBarChartWidget />
        </div>
    )
}

export default App
