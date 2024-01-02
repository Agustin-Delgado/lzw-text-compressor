import { decompressionSwitch$ } from "@/state/decompression-switch";
import { throwToast } from "@/utils/throw-toast";
import { useEffect, useState } from "react";
import { useObservable } from "rxjs-hooks";

export default function FileUploader({
    files,
    setFiles,
    fileDropped,
    setFileDropped,
}: {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    fileDropped: File | null;
    setFileDropped: React.Dispatch<React.SetStateAction<File | null>>;
}) {
    const [dragging, setDragging] = useState(false);

    const decompressionSwitch = useObservable(() => decompressionSwitch$);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (files.find((file) => file.name === e.target.files![0].name)) return;
        setFiles([...files, ...e.target.files!]);
        setFileDropped(e.target.files![0]);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(false);

        const droppedFiles = e.dataTransfer.files;
        const allowedFiles = Array.from(droppedFiles).filter((file) =>
            decompressionSwitch ? file.type === "application/octet-stream" : file.type === "text/plain"
        );
        const notAllowedFiles = Array.from(droppedFiles).filter((file) =>
            !decompressionSwitch ? file.type === "application/octet-stream" : file.type === "text/plain"
        );

        notAllowedFiles.forEach((file) => {
            throwToast(
                "error",
                `Ojo! El archivo ${file.name} no es un ${!decompressionSwitch ? "TXT" : "BIN"}`,
                ""
            );
        });

        allowedFiles.forEach((txtFile) => {
            if (files.find((file) => file.name === txtFile.name)) return;
            setFiles((prevState) => [...prevState, txtFile]);
            setFileDropped(txtFile);
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => setFileDropped(null), 500);
        return () => clearTimeout(timer);
    }, [fileDropped]);

    return (
        <div className="flex items-center flex-col justify-center w-full mt-10 z-10">
            <label
                htmlFor="dropzone-file"
                className={`flex overflow-hidden mb-4 over border-dashed group flex-col z-10 items-center justify-center w-full border border-foreground/40 rounded-lg cursor-pointer bg-border/15 hover:bg-border/25`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    onChange={handleFileChange}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept={`${!decompressionSwitch ? ".txt" : ".bin"}`}
                />
                <div className="flex flex-col items-center justify-center pt-5 pb-6 z-0 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        data-slot="icon"
                        className="w-8 h-8 mb-4 text-foreground/70 overflow-visible"
                    >
                        <path
                            d="M19 13V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V13"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <g
                            className={`transition-all
                            group-hover:transform group-hover:translate-y-[-4px] 
                            ${fileDropped ? "animate-arrow-flying" : ""}
                            ${dragging ? "transform translate-y-[-4px]" : ""}`}
                        >
                            <path
                                d="M15 6L10 1L5 6"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M10 1V13"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </g>
                    </svg>
                    <p className="mb-2 text-sm text-foreground/70">
                        <span className="font-semibold">Hacé click acá para subir el archivo</span> o
                        arrastralo y soltalo
                    </p>
                    <p className="text-xs text-muted-foreground">Verificá que su formato sea TXT.</p>
                </div>
            </label>
        </div>
    );
}
