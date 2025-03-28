interface Props {
    text: string;
    className?: string;
}

export function Paragraph({text, className}: Props) {
    return (
        <p className={`leading-7 [&:not(:first-child)]:mt-4 ${className}`}>
            {text}
        </p>
    )
}
