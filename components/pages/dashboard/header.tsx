import {H1Title} from "@/components/typography/h1";
import {Paragraph} from "@/components/typography/p";
import {Separator} from "@/components/ui/separator";

type Props = {
    title: string,
    description?: string,
};

function DashboardHeader({title, description}: Props) {
    return (
        <>
            <section className={"py-4 px-2 space-y-2"}>
                <H1Title title={title} />
                {description && <Paragraph text={description} />}
            </section>
            <Separator />
        </>
    );
}

export default DashboardHeader;
