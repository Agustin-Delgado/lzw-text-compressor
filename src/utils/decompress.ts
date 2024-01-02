interface Dictionary {
    [key: number]: string;
}

const decompress = (input: Uint32Array, onProgress: (progress: number) => void) => {
    const dictionary = new Map<number, string>();

    for (let i = 0; i < 255; i++) {
        dictionary.set(i, String.fromCharCode(i));
    }

    const decompressed: string[] = [];

    let prevCode = input[0];

    for (let i = 0; i < input.length; i++) {
        const dictionarySize = dictionary.size;
        const currCode = input[i];
        const progress = (i / input.length) * 100;

        let currSequence = dictionary.has(currCode)
            ? dictionary.get(currCode)!
            : dictionary.get(prevCode)! + dictionary.get(prevCode)![0];

        decompressed.push(currSequence);

        dictionary.set(dictionarySize, dictionary.get(prevCode)! + currSequence[0]);

        prevCode = currCode;

        onProgress(progress);
    }

    onProgress(100);
    return decompressed.join("");
};

self.onmessage = (event) => {
    const { data, fileName } = event.data;

    if (!(data instanceof Uint32Array))
        return self.postMessage({
            error: `No pudimos comprimir el archivo ${fileName}. Verifica que el archivo a descomprimir sea un archivo comprimido y que no esté corrupto`,
        });

    const fileData = decompress(data, (progress) => {
        self.postMessage({ progress });
    });

    self.postMessage({ progress: 100, fileData });
};
