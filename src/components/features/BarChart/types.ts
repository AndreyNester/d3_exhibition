import { SVGProps } from "react"
import { Pryttifier } from "../../shared/lib/Prettifier"
enum EAbc {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
    H = "H",
    I = "I",
    J = "AJ",
    K = "K",
    L = "L",
    M = "M",
    N = "N",
    O = "O",
    P = "P",
    Q = "Q",
    R = "R",
    S = "S",
    T = "T",
    V = "V",
    W = "W",
    X = "X",
    Y = "Y",
    Z = "Z",
    U = "U",
}

interface IData {
    x_label: string
    y_value: number
}

interface IBarChartProps extends SVGProps<SVGSVGElement> {
    data: Pryttifier<IData>[]
    decsending?: boolean
    colorOfRectangle?: string
    width?: number
    height?: number
    marginTop?: number
    marginRight?: number
    marginBottom?: number
    marginLeft?: number
}
interface IMockData {
    letter: EAbc
    frequency: number
}

export type { IBarChartProps, IMockData, IData }
export { EAbc }
