import { FileTextIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { formatSize } from "@/utils/size-formatter";

export default function FileCard({
    title,
    size,
    setCheckedFiles,
    isDropped,
    progress,
}: {
    title: string;
    size: number;
    setCheckedFiles: React.Dispatch<React.SetStateAction<string[]>>;
    isDropped: boolean;
    progress: number;
}) {
    const handleCheckedChange = (status: boolean) => {
        if (!status) return setCheckedFiles((prevState) => prevState.filter((file) => file !== title));
        setCheckedFiles((prevState) => [...prevState, title]);
    };

    const formattedSize = formatSize(size);

    return (
        <div
            className={`flex relative justify-between items-center space-x-4 rounded-md p-2 transition-all border ring-ring hover:bg-accent hover:text-accent-foreground ${
                isDropped ? "animate-fade-in" : ""
            }`}
        >
            <div className="flex gap-2 truncate">
                <FileTextIcon className="mt-px min-h-5 min-w-5 h-5 w-5 text-foreground/90" />
                <div className="space-y-1 truncate">
                    <p className="text-sm font-medium leading-none text-foreground/90 truncate">{title}</p>
                    <p className="text-xs text-muted-foreground">{formattedSize}</p>
                </div>
            </div>
            <Checkbox onCheckedChange={handleCheckedChange} />
            <Progress
                className="absolute bottom-0 left-0 !ml-0 rounded-t-[--radius] h-0.5"
                value={Number(progress.toFixed(2))}
            />
        </div>
    );
}
