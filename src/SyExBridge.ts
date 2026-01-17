import JZZ from "jzz";

// https://www.2writers.com/eddie/TutSysEx.htm

export class SysExBridge {
    constructor(private _midiOut: Awaited<ReturnType<ReturnType<typeof JZZ>['openMidiOut']>>) {
    }

    private _calculateChecksum(bytes: Array<number>): number {
        const sumOfBytes = bytes.reduce((prev, cur) => prev + cur, 0);
        const remainder = sumOfBytes % 128;

        return remainder
            ? 128 - remainder
            : 0;    // Checksum is 0 if remainder is 0.
    }

    private async _sendMsg(mode: 'GET' | 'SET', address: Array<number>, value: number): Promise<void> {
        if (address.length !== 4) throw new Error('Invalid address - must be 4 bytes long');

        const checksum = this._calculateChecksum([...address, value])

        await this._midiOut.send([
            0xf0,   // SysEx header.
            0x41,   // Roland/BOSS manufacturer identifier.
            0x00, 0x00, 0x00, 0x00, // Katna identifier.

            // Use GET or SET mode.
            mode === 'GET' ? 0x11 : 0x12,   

            // Address to target (4 bytes).
            ...address,

            // Value to set OR num bytes to expect in response (1 byte).
            value,

            // Checksum.
            checksum,

            0xf7    // SysEx footer.
        ]);
    }

    async setParam(address: Array<number>, value: number): Promise<void> {
        await this._sendMsg(
            'SET',
            address,
            value
        )
    }

    async getParam() {
        // TODO
    }
}