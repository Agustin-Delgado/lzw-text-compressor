export const createWorker = (decompressionSwitch: Boolean | null) => {
    return decompressionSwitch
        ? new Worker(new URL("@/utils/decompress", import.meta.url))
        : new Worker(new URL("@/utils/compress", import.meta.url));
};
