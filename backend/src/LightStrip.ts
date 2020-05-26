const ws281x = require("rpi-ws281x-native");

export class LightStrip {
    public leds: number;
    public ws281x: any;
    public rainbowRenderLoop?: NodeJS.Timeout;
    public pixelData: Uint32Array;
    public state: "rainbow" | "static_all" | "off";
    public onStateChanged?: Function;

    constructor(leds: number, onStateChanged?: Function) {
        this.leds = leds;
        this.state = "off";
        this.ws281x = ws281x;
        this.ws281x.init(leds);
        this.pixelData = new Uint32Array(this.leds);
        this.onStateChanged = onStateChanged;
    }

    public startRainbow() {
        let offset = 0;
        this.rainbowRenderLoop = setInterval(() => {
            this.setState("rainbow");
            for (var i = 0; i < this.leds; i++) {
                this.pixelData[i] = this.colorwheel((offset + i) % 256);
            }

            offset = (offset + 1) % 256;
            this.ws281x.render(this.pixelData);
        }, 1000 / 30);

        return this.rainbowRenderLoop;
    }

    private setState(state: "rainbow" | "static_all" | "off") {
        if (this.onStateChanged !== undefined) this.onStateChanged(state);
        this.state = state;
        return state;
    }

    public stopRainbow() {
        this.reset();
        this.setState("off");
        // @ts-ignore
        clearInterval(this.rainbowRenderLoop);
    }

    public reset() {
        this.setState("off");
        this.ws281x.reset();
    }

    private rgb2Int(r: number, g: number, b: number) {
        return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
    }

    private colorwheel(pos: number) {
        pos = 255 - pos;
        if (pos < 85) { return this.rgb2Int(255 - pos * 3, 0, pos * 3); }
        else if (pos < 170) { pos -= 85; return this.rgb2Int(0, pos * 3, 255 - pos * 3); }
        else { pos -= 170; return this.rgb2Int(pos * 3, 255 - pos * 3, 0); }
    }
}

export default LightStrip;
