import { IData, IMockData } from "../../../features/BarChart/types"

export const transformMackDataToBarChartData = (data: IMockData[]): IData[] =>
    data.map<IData>((item) => ({
        x_label: item.letter,
        y_value: item.frequency,
    }))
