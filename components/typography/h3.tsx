interface Props {
    title: string;
    className?: string;
}

export function H3Title({title, className}: Props) {
    return (
        <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}>
            {title}
        </h3>
    )
}
