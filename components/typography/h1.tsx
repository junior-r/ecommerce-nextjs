interface Props {
    title: string;
    className?: string;
}

export function H1Title({title, className}:Props) {
    return (
        <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>
            {title}
        </h1>
    )
}