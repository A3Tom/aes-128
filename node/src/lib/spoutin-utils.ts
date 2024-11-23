import { KEY_SIZE, MODE_OF_OPERATION } from "../models/aes-settings";
import { WORD_SIZE } from "./aes-utils";

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

export interface EncryptionSetup {
    message: string;
    key: bigint;
    modeOfOperation: MODE_OF_OPERATION;
    keySize: KEY_SIZE;
}