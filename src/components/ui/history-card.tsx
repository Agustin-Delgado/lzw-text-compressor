import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatSize } from "@/utils/size-formatter";
import dayjs from "dayjs";
import { FileTextIcon, TrendingDown } from "lucide-react";

export default function HistoryCard({
    name,
    size,
    compressedSize,
    creationDate,
}: {
    name: string;
    size: number;
    compressedSize: number;
    creationDate: Date;
}) {
    const formattedRealSize = formatSize(size);
    const formattedCompressedSize = formatSize(compressedSize);
    const compressionPercentage = Number(((size - compressedSize) / size) * 100).toFixed();
    const formattedCreationDate = dayjs(creationDate).format("DD/MM/YYYY HH:mm A");
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="py-3 px-4 space-y-8 transition-all border-b ring-ring hover:bg-accent hover:text-accent-foreground">
                    <div className="flex flex-col">
                        <div className="flex items-start">
                            <FileTextIcon className="mt-px min-h-5 min-w-5 text-foreground/90" />
                            <div className="ml-2 w-full">
                                <div className="flex justify-between">
                                    <p className="text-sm w-32 sm:w-40 leading-none text-foreground/90 truncate">
                                        {name}
                                    </p>
                                    <span className="text-xs text-muted-foreground">
                                        ({compressionPercentage}%)
                                    </span>
                                </div>
                                <div className="flex items-center justify-between ">
                                    <p className="text-lg font-medium flex-1 min-w-20 whitespace-nowrap">
                                        {formattedRealSize}
                                    </p>
                                    <TrendingDown className="h-5 w-5 flex-1 text-foreground/90" />
                                    <span className="text-lg text-end flex-1 font-medium whitespace-nowrap">
                                        {formattedCompressedSize}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p className="text-xs text-muted-foreground">Comprimido el {formattedCreationDate}</p>
            </TooltipContent>
        </Tooltip>
    );
}
