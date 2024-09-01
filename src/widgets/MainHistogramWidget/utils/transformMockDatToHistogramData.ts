import { IData } from "../../../features/MainHistogram/types"
import { IMockData } from "../types"

export const transformMockDatToMainHistogramData = (data: IMockData[]): IData[] =>
    data.map<IData>((item) => ({
        x_range: item.date,
        y_value: item.amount,
    }))
