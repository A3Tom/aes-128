import { EncryptionSetup } from "../models/setup";
import { toBinaryString, WORD_SIZE } from "./bit-utils";

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

export function formatRoundKeysOutput(roundKeys: Record<number, bigint>) {
    Object.keys(roundKeys).map(roundKey => {
        console.log(`[r-${roundKey.toString().padStart(2, '0')}k] ${toBinaryString(roundKeys[+roundKey], 16)}`);
    })
}
