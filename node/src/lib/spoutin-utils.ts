import { ROUND_STAGE } from "../models/aes-settings";
import { EncryptionSetup } from "../models/setup";
import { LOG_VERBOSITY } from "../models/system-settings";
import { convertByteArrayToInt, toBinaryString, WORD_SIZE } from "./bit-utils";

const logVerbosity: LOG_VERBOSITY = LOG_VERBOSITY.YAPPIN;

export function formatSetupOutput(setup: EncryptionSetup) {
    console.log("************************");
    console.log(`  AES-${setup.keySize} (${setup.modeOfOperation})`);
    console.log(`  Key: ${setup.key}\n`);

    const bKey = setup.key.toString(2).padStart(+setup.keySize, '0');
    for (let i = 0; i < bKey.length / WORD_SIZE; i++) {
        const start: number = 0 + (WORD_SIZE * i);
        const end: number = start + WORD_SIZE;

        console.log(`\t${bKey.substring(start, end)}`);
    }

    console.log(`  Message: ${setup.message}`);
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