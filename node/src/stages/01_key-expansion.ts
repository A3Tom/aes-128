import { ROUND_CONSTANTS } from "../lib/aes-utils";
import { bitwiseAdd, buildBitCapMask, BYTE_SIZE, circularLeftShift, convertIntToBytes, ensureBigIntegerValue, WORD_SIZE, WORD_SIZE_MASK } from "../lib/bit-utils";
import { subByte } from "../lib/sbox-utils";
import { outputVerbose, toHexSplit, toHexString } from "../lib/spoutin-utils";
import { ROUND_STAGE } from "../models/aes-settings";

export function expandKeySchedule(key: bigint, keySize: number, rounds: number): void {
    const roundKeys: bigint[] = []
    let previousBlock: bigint = key;

    for (let roundIdx = 0; roundIdx < rounds; roundIdx++) {
        let roundKey: bigint = BigInt(0x0);
        let previousColumn: bigint = previousBlock & WORD_SIZE_MASK;
        let permutationColumn: bigint = previousBlock & WORD_SIZE_MASK;


        logVerbose(roundIdx, `Perm Col:   \t${toHexSplit(permutationColumn, BYTE_SIZE)}`);

        permutationColumn = circularLeftShift(permutationColumn, WORD_SIZE, BYTE_SIZE);
        logVerbose(roundIdx, `Circ LShift:\t${toHexSplit(permutationColumn, BYTE_SIZE)}`);

        permutationColumn = subBytes(permutationColumn);
        logVerbose(roundIdx, `SubBytes:   \t${toHexSplit(permutationColumn, BYTE_SIZE)}`);

        permutationColumn = addRoundConstant(roundIdx, permutationColumn);
        logVerbose(roundIdx, `Round Const:\t${toHexSplit(permutationColumn, BYTE_SIZE)}`);

        const wordCount = keySize / WORD_SIZE;
        for (let wordIdx = 0; wordIdx < wordCount; wordIdx++) {
            previousColumn = (previousBlock >> BigInt(((wordCount - 1) - wordIdx) * WORD_SIZE) & WORD_SIZE_MASK)
            roundKey = (roundKey << BigInt(WORD_SIZE)) | (previousColumn ^ permutationColumn);
            permutationColumn = roundKey & WORD_SIZE_MASK;

        }

        logVerbose(roundIdx, `Round Key:  \t${toHexSplit(roundKey, WORD_SIZE, 8)}`);

        previousBlock = roundKey;
        roundKeys.push(previousBlock);
    }

    function logVerbose(roundIdx: number, message: string) {
        outputVerbose(ROUND_STAGE.KeyExpansion, roundIdx, message);
    }
}

export function addRoundConstant(round: number, permutationColumn: bigint): bigint {
    permutationColumn ^= ROUND_CONSTANTS[round];
    return permutationColumn & WORD_SIZE_MASK;
}

export function subBytes(value: number | bigint): bigint {
    const byteArray = convertIntToBytes(BigInt(value));

    return ensureBigIntegerValue(
        byteArray.reduce<Uint8Array>((result, byte, idx) => {
            result[idx] = subByte(byte);
            return result;
        }, new Uint8Array(byteArray.length))
    );
}