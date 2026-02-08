// https://www.vguitarforums.com/smf/index.php?PHPSESSID=363888b64ff25cb5f469e12b3ec487c5&topic=27749.0
export class KatanaParameter {
    constructor(
        public readonly address: [number, number, number, number]
    ) {}
}

export const KatanaParameters = {
    PRM_PREAMP_A_TYPE: new KatanaParameter([0x60, 0x00, 0x00, 0x21]),

    PRM_PREAMP_A_GAIN: new KatanaParameter([0x60, 0x00, 0x00, 0x22]),
    PRM_KNOB_POS_VOLUME: new KatanaParameter([0x60, 0x00, 0x06, 0x52]),

    PRM_PREAMP_A_BASS: new KatanaParameter([0x60, 0x00, 0x00, 0x24]),
    PRM_PREAMP_A_MIDDLE: new KatanaParameter([0x60, 0x00, 0x00, 0x25]),
    PRM_PREAMP_A_TREBLE: new KatanaParameter([0x60, 0x00, 0x00, 0x26]),

    PRM_FXBOX_ASGN_BOOSTER_G: new KatanaParameter([0x60, 0x00, 0x06, 0x24]),
    PRM_ODDS_DRIVE: new KatanaParameter([0x60, 0x00, 0x00, 0x12]),
    PRM_ODDS_TONE: new KatanaParameter([0x60, 0x00, 0x00, 0x14]),
    PRM_ODDS_BOTTOM: new KatanaParameter([0x60, 0x00, 0x00, 0x13]),
    PRM_ODDS_EFFECT_LEVEL: new KatanaParameter([0x60, 0x00, 0x00, 0x17]),
    PRM_ODDS_SOLO_SW: new KatanaParameter([0x60, 0x00, 0x00, 0x15]),
    PRM_ODDS_SOLO_LEVEL: new KatanaParameter([0x60, 0x00, 0x00, 0x16]),
    PRM_ODDS_DIRECT_LEVEL: new KatanaParameter([0x60, 0x00, 0x00,0x18]),
    PRM_KNOB_POS_BOOST: new KatanaParameter([0x60, 0x00, 0x06, 0x57])
} as const satisfies Record<string, KatanaParameter>;