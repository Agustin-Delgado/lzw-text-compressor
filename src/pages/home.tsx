import FileContainer from "@/components/ui/file-container";
import FileUploader from "@/components/ui/file-uploader";
import Hero from "@/components/ui/hero";
import { useState } from "react";

export default function Home() {
    const [files, setFiles] = useState<File[]>([]);
    const [fileDropped, setFileDropped] = useState<File | null>(null);

    return (
        <div className="relative bg-background h-full isolate px-6 lg:px-8 ">
            <div className="mx-auto max-w-2xl py-28 h-full">
                <Hero />
                <FileUploader
                    files={files}
                    setFiles={setFiles}
                    fileDropped={fileDropped}
                    setFileDropped={setFileDropped}
                />
                <FileContainer files={files} setFiles={setFiles} fileDropped={fileDropped} />
            </div>
        </div>
    );
}
