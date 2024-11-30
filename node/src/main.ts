import { calculateEncryptionRounds, ROUND_CONSTANTS } from "./lib/aes-utils";
import { buildBitCapMask, circularLeftShift, toBinaryString, getNextBase2, convertIntToBytes, WORD_SIZE, BYTE_SIZE, convertByteArrayToInt, bitwiseAdd } from "./lib/bit-utils";
import { subByte } from "./lib/sbox-utils";
import { formatSetupOutput, outputVerbose, toHexString } from "./lib/spoutin-utils";
import { KEY_SIZE, MODE_OF_OPERATION, ROUND_STAGE } from "./models/aes-settings";
import { EncryptionSetup } from "./models/setup";
import { LOG_VERBOSITY } from "./models/system-settings";

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

// formatRoundKeysOutput(roundKeys)


function expandKeySchedule(key: bigint, rounds: number): void {
    let previousBlock: bigint = key;

    for (let roundIdx = 0; roundIdx < 1; roundIdx++) {
        let previousColumn: bigint = previousBlock & 0xFFFFFFFFn;
        let permutationColumn: bigint = previousColumn;

        logVerbose(roundIdx, `Beginning: ${toHexString(permutationColumn, BYTE_SIZE)}`);

        permutationColumn = circularLeftShift(permutationColumn, WORD_SIZE, BYTE_SIZE);
        logVerbose(roundIdx, `After CLS: ${toHexString(permutationColumn, BYTE_SIZE)}`);

        let subbedBytes = subBytes(permutationColumn);
        logVerbose(roundIdx, `After SubBytes: ${toHexString(subbedBytes, BYTE_SIZE)}`);

        AddRoundKey(roundIdx, subbedBytes);
        logVerbose(roundIdx, `After RoundConst: ${toHexString(subbedBytes, BYTE_SIZE)}`);

        // roundKeys[round] = BigInt(1 << round);
    }

    function logVerbose(roundIdx: number, message: string) {
        outputVerbose(ROUND_STAGE.KeyExpansion, roundIdx, message);
    }
}

function AddRoundKey(round: number, permutationColumn: Uint8Array): Uint8Array {
    permutationColumn[0] = bitwiseAdd(permutationColumn[0], ROUND_CONSTANTS[round]) & Number(buildBitCapMask(8));
    return permutationColumn;
}

function subBytes(value: number | bigint): Uint8Array {
    const byteArray = convertIntToBytes(BigInt(value));

    return byteArray.reduce<Uint8Array>((result, byte, idx) => {
        result[idx] = subByte(byte);
        return result;
    }, new Uint8Array(byteArray.length));
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

