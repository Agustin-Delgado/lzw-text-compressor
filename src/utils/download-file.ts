export const downloadFile = (fileData: Uint32Array, filename: string) => {
    const blob = new Blob([fileData]);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
};
