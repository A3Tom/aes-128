import { AESConfig, ROUND_STAGE } from "../models/aes-settings";
import { LOG_VERBOSITY } from "../models/system-settings";
import { BYTE_SIZE, convertByteArrayToInt, ensureBigIntegerValue, WORD_SIZE } from "./bit-utils";

const logVerbosity: LOG_VERBOSITY = LOG_VERBOSITY.STFU;

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
    if (logVerbosity === LOG_VERBOSITY.YAPPIN)
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