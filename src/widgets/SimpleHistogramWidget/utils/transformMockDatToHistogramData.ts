import { IData } from "../../../features/SimpleHistogram/types"
import { IMockData } from "../types"

export const transformMockDatToHistogramData = (data: IMockData[]): IData[] =>
    data.map<IData>((item) => ({
        x_range: item.rate,
    }))
