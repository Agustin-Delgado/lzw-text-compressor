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
        const txtFiles = Array.from(droppedFiles).filter((file) =>
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

        txtFiles.forEach((txtFile) => {
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
                            d="M10.75 4L7.75 1M7.75 1L4.75 4M7.75 1V13.75"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className={`transition-all
                            group-hover:transform group-hover:translate-y-[-4px] 
                            ${fileDropped ? "animate-arrow-flying" : ""}
                            ${dragging ? "transform translate-y-[-4px]" : ""}`}
                        />
                        <path
                            d="M4.75 7H3.25C2.65326 7 2.08097 7.23705 1.65901 7.65901C1.23705 8.08097 1 8.65326 1 9.25V18.25C1 18.8467 1.23705 19.419 1.65901 19.841C2.08097 20.2629 2.65326 20.5 3.25 20.5H12.25C12.8467 20.5 13.419 20.2629 13.841 19.841C14.2629 19.419 14.5 18.8467 14.5 18.25V9.25C14.5 8.65326 14.2629 8.08097 13.841 7.65901C13.419 7.23705 12.8467 7 12.25 7H10.75"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        />
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
