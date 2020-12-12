export declare const verifyChecksum: (filePath: string, expectedChecksum: string) => Promise<void>;
export declare const download: (url: string, cacheDir: string) => Promise<void>;
export declare const extract: (filePath: string, fileName: string, outDir: string) => Promise<void>;
export declare const downloadAndValidate: (url: string, cacheDir: string) => Promise<void>;
