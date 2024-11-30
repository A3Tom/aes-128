import { ROUND_CONSTANTS } from "../lib/aes-utils";
import { bitwiseAdd, buildBitCapMask, BYTE_SIZE, circularLeftShift, convertIntToBytes, WORD_SIZE } from "../lib/bit-utils";
import { subByte } from "../lib/sbox-utils";
import { outputVerbose, toHexString } from "../lib/spoutin-utils";
import { ROUND_STAGE } from "../models/aes-settings";

export function expandKeySchedule(key: bigint, rounds: number): void {
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

export function AddRoundKey(round: number, permutationColumn: Uint8Array): Uint8Array {
    permutationColumn[0] = bitwiseAdd(permutationColumn[0], ROUND_CONSTANTS[round]) & Number(buildBitCapMask(8));
    return permutationColumn;
}

export function subBytes(value: number | bigint): Uint8Array {
    const byteArray = convertIntToBytes(BigInt(value));

    return byteArray.reduce<Uint8Array>((result, byte, idx) => {
        result[idx] = subByte(byte);
        return result;
    }, new Uint8Array(byteArray.length));
}