export declare class ArbitraryStyleTransferNetwork {
    private styleCheckpointURL;
    private transformCheckpointURL;
    private initialized;
    private styleNet;
    private transformNet;
    constructor(styleCheckpointURL?: string, transformCheckpointURL?: string);
    isInitialized(): boolean;
    initialize(): Promise<void>;
    dispose(): void;
    private predictStyleParameters;
    private produceStylized;
    stylize(content: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, style: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, strength?: number): Promise<ImageData>;
}
