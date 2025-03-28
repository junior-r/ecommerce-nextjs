interface Props {
    title: string;
    className?: string;
}

export function H2Title({title, className}: Props) {
    return (
        <h2 className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}>
            {title}
        </h2>
    )
}