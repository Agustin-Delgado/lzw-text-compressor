interface Dictionary {
    [key: string]: number;
}

const compress = (input: string, onProgress: (progress: number) => void) => {
    const dictionary = new Map();

    for (let i = 0; i < 256; i++) dictionary.set(String.fromCharCode(i), i);

    const compressed: number[] = [];
    let currSequence = "";

    for (let i = 0; i < input.length; i++) {
        let dictionarySize = dictionary.size;
        const currCharacter = input[i];
        const potSequence = currSequence + currCharacter;

        if (dictionary.has(potSequence)) {
            currSequence = potSequence;
        } else {
            compressed.push(dictionary.get(currSequence));
            dictionary.set(potSequence, dictionarySize++);
            currSequence = currCharacter;
        }

        const progress = (i / input.length) * 100;
        onProgress(progress);
    }

    if (currSequence !== "") compressed.push(dictionary.get(currSequence));

    onProgress(100);

    return new Uint32Array(compressed);
};

self.onmessage = (event) => {
    const { data, fileName } = event.data;
    const fileData = compress(data, (progress) => {
        self.postMessage({ progress });
    });

    if (fileData.length * 4 > data.length)
        return self.postMessage({
            error: `Comprimimos el archivo ${fileName} pero pesa más que el original. Esto puede deberse a que el archivo no tiene un peso considerable o porque el algoritmo de compresión no es bueno`,
        });
    self.postMessage({ progress: 100, fileData });
};
