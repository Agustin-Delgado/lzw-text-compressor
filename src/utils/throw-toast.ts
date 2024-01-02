import { Progress } from "@/components/ui/file-container";
import { toast } from "sonner";

export const throwToast = (
    type: "success" | "error" | "warning" | "info",
    message: string,
    fileName?: string,
    setFileProgress?: React.Dispatch<React.SetStateAction<Progress[]>>
) => {
    const handleError = () => {
        if (setFileProgress && fileName)
            setFileProgress((prevState) =>
                prevState.filter((fileProgress) => fileProgress.fileName !== fileName)
            );
        toast.error("Algo salió mal 😢", {
            description: message,
        });
    };

    const handleSuccess = () => {
        toast.success("Terminamos la compresión!", {
            description: message,
        });
    };

    if (type === "error") return handleError();
    if (type === "success") return handleSuccess();
};
