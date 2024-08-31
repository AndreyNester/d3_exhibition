import { ReactNode } from "react"
import styles from "./App.module.css"
import { ChartBarWidget } from "./widgets/ChartBarWidget/ChartBarWidget"

function App(): ReactNode {
    return (
        <div className={styles.container}>
            <ChartBarWidget />
        </div>
    )
}

export default App
