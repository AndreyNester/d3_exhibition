import { IData } from "../../../features/LineChart/types"
import { IMockData } from "../types"

export const transformMockDataToLineChartData = (data: IMockData[]): IData[] =>
    data.map<IData>((item) => ({
        x_range: item.date,
        y_value: item.close,
    }))
