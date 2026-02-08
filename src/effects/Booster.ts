import { KatanaParameters } from "../KatanaParameters";
import { SysExBridge } from "../SysExBridge";

const BOOSTER_TYPE_MAP = {
    'MID_BOOST': 0,
    'CLEAN_BOOST': 1,
    'TREBLE_BOOST': 2,
    'CRUNCH_OD': 3,
    'NATURAL_OD': 4,
    'WARM_OD': 5,
    'FAT_DS': 6,
    'METAL_DS': 8,
    'OCT_FUZZ': 9,
    'BLUES_DRIVE': 10,
    'OVERDRIVE': 11,
    'T-SCREAM': 12,
    'TURBO_OD': 13,
    'DISTORTION': 14,
    'RAT': 15,
    'GUV_DS': 16,
    'DST_PLUS': 17,
    'METAL_ZONE': 18,
    '60S_FUZZ': 19,
    'MUFF_FUZZ': 20,
    'HM-2': 21,
    'METAL_CORE': 22,
    'CENTA_OD': 23
} as const satisfies Record<string, number>;

type BoosterConfiguration = {
    drive: number;
    tone: number;
    bottom: number;
    effectLevel: number;
    soloSw: boolean;
    soloLevel: number;
    directMix: number;
};

export class Booster {
    constructor(private _sysex: SysExBridge) {
    }

    // TODO: this is always setting booster type for "green". 🥴
    async setType(boosterType: keyof typeof BOOSTER_TYPE_MAP, config?: Partial<BoosterConfiguration>): Promise<void> {
        await this._sysex.setParam(
            KatanaParameters.PRM_FXBOX_ASGN_BOOSTER_G,
            BOOSTER_TYPE_MAP[boosterType]
        );

        if (config) {
            await this.setParams(config);
        }
    }

    async setParams(config: Partial<BoosterConfiguration>): Promise<void> {
        // TODO: Solo switch don't seem to be working properly yet. Unsure why.
        if (config.drive !== undefined) await this._sysex.setParam(KatanaParameters.PRM_ODDS_DRIVE, config.drive);
        if (config.tone !== undefined) await this._sysex.setParam(KatanaParameters.PRM_ODDS_TONE, config.tone);
        if (config.bottom !== undefined) await this._sysex.setParam(KatanaParameters.PRM_ODDS_BOTTOM, config.bottom);
        if (config.effectLevel !== undefined) await this._sysex.setParam(KatanaParameters.PRM_ODDS_EFFECT_LEVEL, config.effectLevel);
        if (config.soloSw !== undefined) await this._sysex.setParam(KatanaParameters.PRM_ODDS_EFFECT_LEVEL, config.soloSw ? 1 : 0);
        if (config.soloLevel !== undefined) await this._sysex.setParam(KatanaParameters.PRM_ODDS_SOLO_LEVEL, config.soloLevel);
        if (config.directMix !== undefined) await this._sysex.setParam(KatanaParameters.PRM_ODDS_DIRECT_LEVEL, config.directMix)
    }

    // async enable(): Promise<void> {
    // }

    // async disable(): Promise<void> {
    // }
}