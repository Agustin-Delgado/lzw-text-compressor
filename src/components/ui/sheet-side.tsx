import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import HistoryCard from "./history-card";
import dayjs from "dayjs";

interface FileHistory {
    name: string;
    size: number;
    compressedSize: number;
    creationDate: Date;
}

export default function SheetSide({ children }: { children: React.ReactNode }) {
    const [fileHistory, setFileHistory] = useState<FileHistory[]>([]);

    const getFileHistory = () => {
        const history = localStorage.getItem("history");
        if (!history) return [];
        setFileHistory(JSON.parse(history));
    };

    return (
        <Sheet>
            <SheetTrigger onClick={getFileHistory} asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="flex gap-0 flex-col overflow-y-scroll p-0" side="left">
                <SheetHeader className="text-left p-4">
                    <SheetTitle>Historial</SheetTitle>
                    <SheetDescription>
                        Acá se mostrarán los últimos 20 archivos que hayas comprimido anteriormente
                    </SheetDescription>
                </SheetHeader>
                <>
                    {!fileHistory.length ? (
                        <p className="text-center">No hay archivos en el historial</p>
                    ) : (
                        fileHistory
                            .sort((a, b) => dayjs(b.creationDate).valueOf() - dayjs(a.creationDate).valueOf())
                            .map(({ name, size, compressedSize, creationDate }, idx) => (
                                <HistoryCard
                                    key={idx}
                                    name={name}
                                    size={size}
                                    compressedSize={compressedSize}
                                    creationDate={creationDate}
                                />
                            ))
                    )}
                </>
            </SheetContent>
        </Sheet>
    );
}
