import dayjs from "dayjs";

export const saveHistory = (file: File, newSize: number) => {
    const fileHistory = {
        name: file.name,
        size: file.size,
        compressedSize: newSize,
        creationDate: new Date(),
    };
    const currentHistory = localStorage.getItem("history");

    if (!currentHistory) return localStorage.setItem("history", JSON.stringify([fileHistory]));
    const parsedHistory = JSON.parse(currentHistory) as (typeof fileHistory)[];

    if (parsedHistory.length >= 20)
        parsedHistory.sort((a, b) => dayjs(b.creationDate).valueOf() - dayjs(a.creationDate).valueOf()).pop();
    const newHistory = [...parsedHistory, fileHistory];

    localStorage.setItem("history", JSON.stringify(newHistory));
};
