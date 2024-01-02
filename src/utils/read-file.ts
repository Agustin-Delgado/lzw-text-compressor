import { toast } from "sonner";

export const readFile = (file: File) => {
    const reader = new FileReader();
    if (file.type === "text/plain")
        return new Promise<string>((resolve, reject) => {
            reader.readAsText(file);
            reader.onload = () => {
                if (typeof reader.result !== "string") return reject(new Error("Failed to read file."));
                resolve(reader.result);
            };
            reader.onerror = () => {
                reject(
                    toast.error("Algo salió mal 😢", {
                        description: `No tenemos idea de que pasó, pero no pudimos comprimir tus archivos.`,
                    })
                );
            };
        });

    return new Promise<Uint32Array>((resolve, reject) => {
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            if (!(reader.result instanceof ArrayBuffer)) return reject(new Error("Failed to read file."));
            resolve(new Uint32Array(reader.result));
        };
        reader.onerror = () => {
            reject(
                toast.error("Algo salió mal 😢", {
                    description: `No tenemos idea de que pasó, pero no pudimos comprimir tus archivos.`,
                })
            );
        };
    });
};
