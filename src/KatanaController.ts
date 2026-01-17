import JZZ from "jzz";
import { SysExBridge } from "./SyExBridge";

interface ConnectArgs {
    deviceName?: string;
};

interface ConstructorArgs {
    deviceName: string;
    sysExBridge: SysExBridge;
};

// See: https://jazz-soft.net/doc/JZZ/midiin.html#info
type MidiPortInfo = {
    id: string;
    name: string;
    manufacturer: string;
    version: string;
    engine: string;
}

export class KatanaController {
    private readonly _deviceName: string;
    private readonly _sysex: SysExBridge;

    private constructor(opts: ConstructorArgs) {
        this._deviceName = opts?.deviceName ?? '2- KATANA CTRL';
        this._sysex = opts.sysExBridge;
    }

    static async connect(opts?: ConnectArgs): Promise<KatanaController> {
        const deviceName = opts?.deviceName ?? '2- KATANA CTRL';
        const midi = JZZ();

        const outs = midi.info().outputs as Array<MidiPortInfo>;
        const ins = midi.info().inputs as Array<MidiPortInfo>;

        const outPort = outs.find(o => o.name.toUpperCase() == deviceName.toUpperCase());
        const inPort = ins.find(i => i.name.toUpperCase() == deviceName.toUpperCase());

        if (!outPort) throw new Error(`Could not find MIDI output named "${deviceName}"`);
        if (!inPort) throw new Error(`Could not find MIDI input named "${deviceName}"`);
        
        const midiInput = await midi.openMidiIn(inPort);
        const midiOutput = await midi.openMidiOut(outPort);
        
        const sysExBridge = new SysExBridge(midiOutput);
        const kat = new KatanaController({
            deviceName,
            sysExBridge
        })

        await kat._enableEditorMode();
        return kat;
    }

    /**
     * This is what allows us to SET values.
     * See: https://www.vguitarforums.com/smf/index.php?topic=35760.msg261890#msg261890
     */
    private async _enableEditorMode(): Promise<void> {
        await this._sysex.setParam(
            [0x7f, 0x00, 0x00, 0x01],
            1
        );
    }

    async setGain(gain: number): Promise<void> {
        // PRM_PREAMP_A_GAIN
        // https://www.vguitarforums.com/smf/index.php?PHPSESSID=363888b64ff25cb5f469e12b3ec487c5&topic=27749.0
        await this._sysex.setParam(
            [0x60, 0x00, 0x00, 0x22],
            gain
        );
    }
}