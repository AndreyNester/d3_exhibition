import { DetailedHTMLProps, HTMLAttributes } from "react"

interface ICommonTemplateProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    title: string
}

export type { ICommonTemplateProps }
