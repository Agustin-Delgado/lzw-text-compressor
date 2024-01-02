import { decompressionSwitch$ } from "@/state/decompression-switch";
import { useObservable } from "rxjs-hooks";

export default function Hero() {
    const decompressionSwitch = useObservable(() => decompressionSwitch$);

    return (
        <>
            <div className="mb-8 flex justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-foreground/75 ring-1 ring-ring/10 hover:ring-ring/20">
                    Mirá el código en{" "}
                    <a href="#" className="font-semibold text-secondary-foreground/90">
                        <span className="absolute inset-0" aria-hidden="true" />
                        Github <span aria-hidden="true">&rarr;</span>
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
