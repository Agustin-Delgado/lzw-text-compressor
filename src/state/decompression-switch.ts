import { BehaviorSubject } from "rxjs";

export const decompressionSwitch$ = new BehaviorSubject<boolean>(false);

export const switchDecompression = () => {
    decompressionSwitch$.next(!decompressionSwitch$.value);
};
