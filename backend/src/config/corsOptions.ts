import { allowedOrigins } from "./allowedOrigins";

interface CorsOptions {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void;
    optionsSuccessStatus: number;
}

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin && allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by cors'));
        }
    },
    optionsSuccessStatus: 200
}

