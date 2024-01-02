import { Button } from "@/components/ui/button";
import { History, Undo2, Redo2 } from "lucide-react";
import SheetSide from "./sheet-side";
import { switchDecompression, decompressionSwitch$ } from "@/state/decompression-switch";
import { useObservable } from "rxjs-hooks";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Header() {
    const decompressionSwitch = useObservable(() => decompressionSwitch$);

    const handleSwitchToDecompress = () => switchDecompression();

    return (
        <header className="w-full z-10 bg-background/50 backdrop-blur border-b border-b-border fixed">
            <nav className="mx-auto flex max-w-7xl p-2" aria-label="Global">
                <div className="flex flex-1 justify-between items-center">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Texy</span>
                        <svg
                            width="35"
                            height="35"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-foreground/90"
                        >
                            <path
                                d="M9.375 9.375H20.625M9.375 9.375V20.625M9.375 9.375V0M9.375 9.375H0M20.625 9.375V20.625M20.625 9.375L26.25 3.75M20.625 9.375L15 15L9.375 20.625M20.625 20.625H9.375M20.625 20.625H30M20.625 20.625V30M9.375 20.625L3.75 26.25"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                        </svg>
                    </a>
                    <div>
                        <SheetSide>
                            <Button className="text-foreground/90" variant="ghost" size="icon">
                                <History className="h-5 w-5" />
                            </Button>
                        </SheetSide>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={handleSwitchToDecompress}
                                    className="text-foreground/90"
                                    variant="ghost"
                                    size="icon"
                                >
                                    {decompressionSwitch ? (
                                        <Redo2 className="h-5 w-5" />
                                    ) : (
                                        <Undo2 className="h-5 w-5" />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="text-foreground/90">
                                {decompressionSwitch ? "Comprimir" : "Descomprimir"}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </nav>
        </header>
    );
}
