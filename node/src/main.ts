import { calculateEncryptionRounds } from "./lib/aes-utils";
import { buildBitCapMask, circularLeftShift, toBinaryString, getNextBase2, convertIntToBytes, WORD_SIZE, BYTE_SIZE } from "./lib/bit-utils";
import { subByte } from "./lib/sbox-utils";
import { formatSetupOutput } from "./lib/spoutin-utils";
import { KEY_SIZE, MODE_OF_OPERATION } from "./models/aes-settings";
import { EncryptionSetup } from "./models/setup";

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

// formatSetupOutput(setup);

// Calculate encryption rounds
const encryptionRounds = calculateEncryptionRounds(setup.keySize);

// Expand key schedule
// expandKeySchedule(key, encryptionRounds);

// formatRoundKeysOutput(roundKeys)


function expandKeySchedule(key: bigint, rounds: number): void {
    let previousBlock: bigint = key;

    for (let round = 0; round <= rounds; round++) {
        const roundKey: number = 0x0;
        let previousColumn: bigint = previousBlock & 0xFFFFFFFFn;
        let permutationColumn: bigint = previousColumn;

        permutationColumn = circularLeftShift(permutationColumn, WORD_SIZE, BYTE_SIZE);

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

