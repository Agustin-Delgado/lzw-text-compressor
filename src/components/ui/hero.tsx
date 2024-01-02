import { decompressionSwitch$ } from "@/state/decompression-switch";
import { useObservable } from "rxjs-hooks";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Hero() {
    const decompressionSwitch = useObservable(() => decompressionSwitch$);

    return (
        <>
            <div className="mb-8 flex justify-center">
                <div className="relative flex gap-1 rounded-full px-3 py-1 text-sm leading-6 text-foreground/75 ring-1 ring-ring/10 hover:ring-ring/20">
                    Mirá el código en{" "}
                    <a
                        href="https://github.com/Agustin-Delgado/lzw-text-compressor"
                        className="flex gap-1 items-center font-semibold text-secondary-foreground/90"
                    >
                        Github <GitHubLogoIcon /> <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground/90 sm:text-6xl">
                    {decompressionSwitch ? "Descompresor" : "Compresor"} de texto online LZW
                </h1>
                <p className="mt-6 text-lg leading-8 text-foreground/75">
                    Tirá tu archivo de texto y nosotros te lo{" "}
                    {decompressionSwitch ? "descomprimimos" : "comprimimos"}. Cuando quieras podés{" "}
                    {decompressionSwitch ? "comprimirlo" : "descomprimirlo"} sin perder información!
                </p>
            </div>
        </>
    );
}
