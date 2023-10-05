import {Clock} from "../../domain/clock";

export const SystemClock = (): Clock => ({
    now: () => { return Date.now() }
})