import { ROUND_CONSTANTS, subBytes } from "../lib/aes-utils";
import { BYTE_SIZE, WORD_SIZE, WORD_SIZE_BI, WORD_SIZE_MASK, circularLeftShift, convertIntToBytes, ensureBigIntegerValue } from "../lib/bit-utils";
import { outputKeySchedule, outputVerbose, toHexSplit } from "../lib/spoutin-utils";
import { AESConfig, ROUND_STAGE } from "../models/aes-settings";
import { LOG_VERBOSITY } from "../models/system-settings";

export function expandKeySchedule(config: AESConfig): bigint[] {
    const loggingVerbosity = config.stageLoggingVerbosity[ROUND_STAGE.KeyExpansion];

    const keySchedule: bigint[] = []
    let previousBlock: bigint = config.key;

    for (let roundIdx = 0; roundIdx < config.encryptionRounds; roundIdx++) {
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

        const wordCount = +config.keySize / WORD_SIZE;
        for (let wordIdx = 0; wordIdx < wordCount; wordIdx++) {
            previousColumn = (previousBlock >> BigInt(((wordCount - 1) - wordIdx) * WORD_SIZE) & WORD_SIZE_MASK)
            roundKey = (roundKey << WORD_SIZE_BI) | (previousColumn ^ permutationColumn);
            permutationColumn = roundKey & WORD_SIZE_MASK;
        }

        logVerbose(roundIdx, `Round Key:  \t${toHexSplit(roundKey, WORD_SIZE, BYTE_SIZE)}`);

        previousBlock = roundKey;
        keySchedule.push(previousBlock);
    }

    if (loggingVerbosity === LOG_VERBOSITY.BARE_MIN)
        outputKeySchedule(keySchedule);

    return keySchedule;

    function logVerbose(roundIdx: number, message: string) {
        if (loggingVerbosity === LOG_VERBOSITY.YAPPIN)
            outputVerbose(ROUND_STAGE.KeyExpansion, roundIdx, message);
    }
}

export function addRoundConstant(round: number, permutationColumn: bigint): bigint {
    permutationColumn ^= ROUND_CONSTANTS[round];
    return permutationColumn & WORD_SIZE_MASK;
}
