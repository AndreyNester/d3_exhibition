import { ReactNode } from "react"
import { ICommonTemplateProps } from "./types"
import styles from "./CommonTemplate.module.css"
import classNamesConstructor from "classnames"

export const CommonTemplate = ({ className, children, title, ...props }: ICommonTemplateProps): ReactNode => {
    const classnameForWrapper: string = classNamesConstructor(styles.commonTemplate, {
        [String(className)]: className,
    })

    return (
        <section className={classnameForWrapper} {...props}>
            <h2 className={styles.title}>{title}</h2>
            {children}
        </section>
    )
}
