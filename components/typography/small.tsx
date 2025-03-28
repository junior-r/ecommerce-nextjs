interface Props {
    text: string;
    className?: string;
}

export function SmallText({text, className}: Props) {
    return (
        <small className={`text-sm font-medium leading-none ${className}`}>{text}</small>
    )
}
