import { calculateEncryptionRounds, subBytes } from "./lib/aes-utils";
import { BYTE_SIZE, BYTE_SIZE_BI, BYTE_SIZE_MASK, circularLeftShift, convertBigIntegerToWordArray, convertIntToBytes, transposeArray, WORD_SIZE } from "./lib/bit-utils";
import { subByte } from "./lib/sbox-utils";
import { configureLoggingVerbosityByStage, convertStringToBigInt, convertStringToHex, formatSetupOutput, outputMultiDimentionalArray, parseHexToBigInt, toHexSplit, toHexString } from "./lib/spoutin-utils";
import { AESConfig, KEY_SIZE, MODE_OF_OPERATION, ROUND_STAGE } from "./models/aes-settings";
import { LOG_VERBOSITY } from "./models/system-settings";
import { expandKeySchedule } from "./stages/01_key-expansion";

// 0: Setup

// This is a 32b string for easy testing
// as hex: 4145532D31323820697320636C617373
const message: string = "AES-128 is class";
const key: bigint = 57811460909138771071931939740208549692n;
const keySize: KEY_SIZE = KEY_SIZE._128;
const modeOfOperation: MODE_OF_OPERATION = MODE_OF_OPERATION.ECB;
const encryptionRounds: number = calculateEncryptionRounds(keySize);
const stageLoggingVerbosity: Record<ROUND_STAGE, LOG_VERBOSITY> = configureLoggingVerbosityByStage();

const config: AESConfig = {
    message,
    key,
    modeOfOperation,
    keySize,
    encryptionRounds,
    stageLoggingVerbosity
};

formatSetupOutput(config);

// Calculate encryption rounds

// Expand key schedule
const keySchedule = expandKeySchedule(config);


// Encrypting the Message

// 1: Parse message to blocks
const msgBlocksInt = convertStringToBigInt(config.message)

// 2: Add round key [0]
const addRKResult = msgBlocksInt ^ key
console.log(toHexSplit(msgBlocksInt, WORD_SIZE, BYTE_SIZE));
console.log(toHexSplit(addRKResult, WORD_SIZE, BYTE_SIZE));


// For Each Round

// 3: Sub Bytes
let subbedBytes = subBytes(addRKResult);
console.log(toHexSplit(subbedBytes, WORD_SIZE, BYTE_SIZE));

// 4: Shift Rows
const wordArray = convertBigIntegerToWordArray(subbedBytes);

wordArray.map((x, idx) => console.log(`WordArray: [${idx}] ${toHexSplit(x, 8)}`))

wordArray.map((x, idx) => {
    const shiftAmount = idx * BYTE_SIZE;
    const shiftedVal = circularLeftShift(x, WORD_SIZE, shiftAmount);
    console.log(`Shift Row: [${idx}] ${toHexSplit(shiftedVal, 8)}`)
})


for (let roundIdx = 0; roundIdx < keySchedule.length; roundIdx++) {
    // 3: Sub Bytes
    // 5: Mix Columns (fuckin hell... buzzin for this)
    // 6: Add Round Key
}

// Repeat steps 3 -> 6, 10 times - omit the last column mixer

