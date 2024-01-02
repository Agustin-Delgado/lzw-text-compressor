import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { decompressionSwitch$ } from "@/state/decompression-switch";
import { createWorker } from "@/utils/create-worker";
import { downloadFile } from "@/utils/download-file";
import { readFile } from "@/utils/read-file";
import { saveHistory } from "@/utils/save-history";
import { throwToast } from "@/utils/throw-toast";
import { useEffect, useState } from "react";
import { useObservable } from "rxjs-hooks";
import FileCard from "./file-card";

export interface Progress {
    progress: number;
    fileName: string;
}

export default function FileContainer({
    files,
    fileDropped,
    setFiles,
}: {
    files: File[];
    fileDropped: File | null;
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) {
    const [checkedFiles, setCheckedFiles] = useState<string[]>([]);
    const [fileProgress, setFileProgress] = useState<Progress[]>([]);

    const decompressionSwitch = useObservable(() => decompressionSwitch$);

    const handleDeleteFile = (name: string | string[]) => {
        setCheckedFiles([]);

        if (typeof name === "string")
            return setFiles((prevState) => prevState.filter((file) => file.name !== name));
        setFiles((prevState) => prevState.filter((file) => !name.includes(file.name)));
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (fileProgress.length > 0) {
            e.preventDefault();
            e.returnValue = "";
        }
    };

    const handleProcess = async () => {
        try {
            const filesToProcess =
                checkedFiles.length > 0 ? files.filter((file) => checkedFiles.includes(file.name)) : files;

            const processFile = async (file: File) => {
                const data = await readFile(file);
                const worker = createWorker(decompressionSwitch);

                worker.postMessage({ data, fileName: file.name });
                worker.onmessage = (e) => {
                    const { progress, fileData, error } = e.data;

                    if (error) {
                        worker.terminate();
                        return throwToast("error", error, file.name, setFileProgress);
                    }

                    if (!fileData) {
                        setFileProgress((prevState) => [
                            ...prevState.filter((fileProgress) => fileProgress.fileName !== file.name),
                            { progress, fileName: file.name },
                        ]);
                    } else {
                        handleSuccessfulProcess(file, fileData);
                    }
                };
            };

            for (const file of filesToProcess) await processFile(file);
        } catch (err: any) {
            throwToast(
                "error",
                `No tenemos idea de qué pasó, pero no pudimos comprimir tus archivos. El error fue: ${err.message}`
            );
        }
    };

    const handleSuccessfulProcess = (file: File, fileData: Uint32Array) => {
        const compressionPercentage = Number(
            (((file.size - fileData.length * 4) / file.size) * 100).toFixed()
        );
        const formattedFileName = file.name.split(".")[0];

        if (!decompressionSwitch) saveHistory(file, fileData.length * 4);

        downloadFile(fileData, decompressionSwitch ? `${formattedFileName}.txt` : `${formattedFileName}.bin`);
        handleDeleteFile(file.name);
        setFileProgress((prevState) =>
            prevState.filter((fileProgress) => fileProgress.fileName !== file.name)
        );
        throwToast("success", `El archivo ${file.name} se comprimió un ${compressionPercentage}% 🤯`);
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [fileProgress]);

    return (
        <div>
            <Label htmlFor="uploaded-files">
                <span className="text-sm font-medium leading-none text-foreground/90">
                    {files.length
                        ? "Archivos subidos"
                        : "Acá veria mis archivos subidos... si tan solo tuviera uno 😢"}
                </span>
            </Label>
            <div className="grid sm:grid-cols-2 gap-4 grid-cols-1 mb-4 mt-2">
                {files.map(({ name, size }) => (
                    <FileCard
                        key={name}
                        title={name}
                        size={size}
                        isDropped={fileDropped?.name === name}
                        setCheckedFiles={setCheckedFiles}
                        progress={fileProgress.find((file) => file.fileName === name)?.progress ?? 0}
                    />
                ))}
            </div>
            <div className={`w-full flex justify-end gap-4 ${!files.length && "hidden"} animate-fade-in`}>
                <Button onClick={handleProcess} disabled={!files.length || fileProgress.length > 0}>
                    {decompressionSwitch ? "Descomprimir" : "Comprimir"}{" "}
                    {checkedFiles.length > 0 && checkedFiles.length !== files.length
                        ? "seleccionados"
                        : "todos"}
                </Button>
                <Button
                    onClick={() => handleDeleteFile(checkedFiles)}
                    disabled={!checkedFiles.length || fileProgress.length > 0}
                    variant="ghost"
                >
                    Eliminar
                </Button>
            </div>
        </div>
    );
}
