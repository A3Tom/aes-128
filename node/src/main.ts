import { calculateEncryptionRounds } from "./lib/aes-utils";
import { buildBitCapMask, toBinaryString } from "./lib/bit-utils";
import { EncryptionSetup, formatSetupOutput } from "./lib/spoutin-utils";
import { KEY_SIZE, MODE_OF_OPERATION } from "./models/aes-settings";

// 0: Setup
const message: string = "Remo";
const key: bigint = 57811460909138771071931939740208549692n;

const setup: EncryptionSetup = {
    message,
    key,
    modeOfOperation: MODE_OF_OPERATION.ECB,
    keySize: KEY_SIZE._128
};

const roundKeys: Record<number, bigint> = {};

formatSetupOutput(setup);

// Calculate encryption rounds
const encryptionRounds = calculateEncryptionRounds(setup.keySize);

// Expand key schedule
expandKeySchedule(key, encryptionRounds);

Object.keys(roundKeys).map(roundKey => {
    console.log(`[r-${roundKey.toString().padStart(2, '0')}k] ${toBinaryString(roundKeys[+roundKey], 16)}`);
})


function expandKeySchedule(key: bigint, rounds: number): void {
    let previousBlock: bigint = key;
    let previousColumn: bigint = previousBlock & 0xFFFFFFFFn;
    let permutationColumn: bigint = previousColumn;

    // permutationColumn = circularLeftShift(permutationColumn, 8);

    for (let round = 0; round <= rounds; round++) {
        const roundKey: number = 0x0;
        roundKeys[round] = BigInt(1 << round);
    }
}





// Encrypting the Message

// 1: Parse message to blocks

// 2: Add round key [0]

// For Each Block
// 3: Sub Bytes
// 4: Shift Rows
// 5: Mix Columns (fuckin hell... buzzin for this)
// 6: Add Round Key
// Repeat steps 3 -> 6, 10 times - omit the last column mixer