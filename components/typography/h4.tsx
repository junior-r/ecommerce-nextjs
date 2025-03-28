interface Props {
    title: string;
    className?: string;
}

export function H4Title({title, className}: Props) {
    return (
        <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>
            {title}
        </h4>
    )
}
