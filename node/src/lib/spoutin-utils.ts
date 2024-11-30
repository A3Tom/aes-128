import { ROUND_STAGE } from "../models/aes-settings";
import { EncryptionSetup } from "../models/setup";
import { LOG_VERBOSITY } from "../models/system-settings";
import { BYTE_SIZE, convertByteArrayToInt } from "./bit-utils";

const logVerbosity: LOG_VERBOSITY = LOG_VERBOSITY.YAPPIN;

export function formatSetupOutput(setup: EncryptionSetup) {
    console.log("************************");
    console.log(`  AES-${setup.keySize} (${setup.modeOfOperation})`);
    console.log(`  Key: ${setup.key}`);
    console.log(`  Hex: ${toHexSplit(setup.key, BYTE_SIZE)}`);
    console.log(`  Msg: ${setup.message}`);
    console.log("************************\n");
}

export function toHexString(value: number | bigint | Uint8Array, keySize: number) {
    const integerValue = (value instanceof Uint8Array)
        ? convertByteArrayToInt(value as Uint8Array)
        : value;

    return integerValue.toString(16).toUpperCase().padStart(keySize, '0');
}

export function outputVerbose(stage: ROUND_STAGE, roundIdx: number, message: string) {
    if (logVerbosity === LOG_VERBOSITY.YAPPIN)
        console.log(`${stage} ${formatRoundKey(roundIdx)} ${message}`);
}

export function formatRoundKey(roundKey: number) {
    return `[r-${(roundKey + 1).toString().padStart(2, '0')}]`
}

export function toHexSplit(key: bigint, denoteIdx: number, joinStr: string = ' |') {
    return key.toString(16).toUpperCase().split('').reduce((output, char, idx) => {
        output += `${idx && !(idx % denoteIdx) ? joinStr : ''}`;
        output += `${idx && !(idx % 2) ? ' ' : ''}${char}`
        return output;
    }, "");
}