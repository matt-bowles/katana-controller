// https://www.vguitarforums.com/smf/index.php?PHPSESSID=363888b64ff25cb5f469e12b3ec487c5&topic=27749.0
export class KatanaParameter {
    constructor(
        public readonly address: [number, number, number, number]
    ) {}
}

export const KatanaParameters = {
    PRM_PREAMP_A_GAIN: new KatanaParameter([0x60, 0x00, 0x00, 0x22]),
    PRM_KNOB_POS_VOLUME: new KatanaParameter([0x60, 0x00, 0x06, 0x52]),
} as const satisfies Record<string, KatanaParameter>;