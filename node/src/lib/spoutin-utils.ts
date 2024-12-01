import { AESConfig, ROUND_STAGE } from "../models/aes-settings";
import { LOG_VERBOSITY } from "../models/system-settings";
import { BYTE_SIZE, ensureBigIntegerValue, WORD_SIZE } from "./bit-utils";

export function configureLoggingVerbosityByStage(): Record<ROUND_STAGE, LOG_VERBOSITY> {
    return {
        [ROUND_STAGE.KeyExpansion]: LOG_VERBOSITY.STFU,
        [ROUND_STAGE.MixColumns]: LOG_VERBOSITY.STFU,
        [ROUND_STAGE.ShiftRows]: LOG_VERBOSITY.STFU,
        [ROUND_STAGE.SubBytes]: LOG_VERBOSITY.STFU,
        [ROUND_STAGE.AddRoundKey]: LOG_VERBOSITY.STFU,
    };
}

export function formatSetupOutput(setup: AESConfig) {
    console.log("**************************************************************");
    console.log(`  Alg: ${setup.modeOfOperation} AES-${setup.keySize} (${setup.encryptionRounds} rounds)`);
    console.log(`  Key: ${setup.key}`);
    console.log(`  Hex: ${toHexSplit(setup.key, WORD_SIZE, BYTE_SIZE)}`);
    console.log(`  Msg: ${setup.message}`);
    console.log("**************************************************************\n");
}

export function toHexString(value: number | bigint | Uint8Array, wordSize: number) {
    return ensureBigIntegerValue(value)
        .toString(16)
        .toUpperCase()
        .padStart(wordSize, '0');
}

export function outputVerbose(stage: ROUND_STAGE, roundIdx: number, message: string) {
    console.log(`${stage} ${formatRoundKey(roundIdx)} ${message}`);
}

export function formatRoundKey(roundKey: number) {
    return `[r-${(roundKey + 1).toString().padStart(2, '0')}]`
}

export function toHexSplit(value: number | bigint | Uint8Array, keySize: number, denoteIdx: number = WORD_SIZE, joinStr: string = ' |', splitValues: boolean = true) {
    return ensureBigIntegerValue(value)
        .toString(16)
        .padStart(keySize, '0')
        .toUpperCase()
        .split('')
        .reduce((output, char, idx) => {
            output += `${idx && !(idx % denoteIdx) ? joinStr : ''}`;
            output += `${splitValues && idx && !(idx % 2) ? ' ' : ''}${char}`
            return output;
        }, "");
}

export function outputKeySchedule(keySchedule: bigint[]) {
    console.log("  Key Schedule:");
    keySchedule.map((key, idx) => console.log(`  ${formatRoundKey(idx)} ${key.toString(16).toUpperCase().padStart(WORD_SIZE, '0')}`))
    console.log("\n**************************************************************\n");
}

export function outputMultiDimentionalArray(array: number[][] | bigint[][]) {
    array.map(col => console.log(`[${col.join(',')}]`))
}

export function convertStringToHex(message: string): string {
    return message
        .split('')
        .map(x => toHexString(x.charCodeAt(0), 2))
        .join('');
}

export function convertStringToBigInt(message: string): bigint {
    return message
        .split('')
        .reduce((result, x) => {
            result <<= 8n
            result += BigInt(x.charCodeAt(0));
            return result;
        }, 0n);
}

// Yo massive shout out to Daniel Earwicker (amazing name btw) https://stackoverflow.com/a/60435654
export function convertHexToString(hexMessage: string): string {
    return hexMessage
        .split(/(\w\w)/g)
        .filter(x => !!x)
        .map(x => String.fromCharCode(parseInt(x, 16)))
        .join('');
}

export function parseHexToBigInt(hexMessage: string) {
    return hexMessage
        .split(/(\w{8})/g)
        .filter(x => !!x)
        .reduce((result, char) => {
            result <<= 32n
            result |= BigInt(parseInt(char, 16))
            return result;
        }, 0n)
}