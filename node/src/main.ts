import { calculateEncryptionRounds } from "./lib/aes-utils";
import { formatSetupOutput } from "./lib/spoutin-utils";
import { AESConfig, KEY_SIZE, MODE_OF_OPERATION } from "./models/aes-settings";
import { expandKeySchedule } from "./stages/01_key-expansion";

// 0: Setup
const message: string = "Remo";
const key: bigint = 57811460909138771071931939740208549692n;
const keySize: KEY_SIZE = KEY_SIZE._128;
const modeOfOperation: MODE_OF_OPERATION = MODE_OF_OPERATION.ECB;
const encryptionRounds: number = calculateEncryptionRounds(keySize);

const config: AESConfig = {
    message,
    key,
    modeOfOperation,
    keySize,
    encryptionRounds
};

formatSetupOutput(config);

// Calculate encryption rounds

// Expand key schedule
const keySchedule = expandKeySchedule(key, +config.keySize, encryptionRounds);

// formatRoundKeysOutput(roundKeys)



// Encrypting the Message

// 1: Parse message to blocks

// 2: Add round key [0]

// For Each Block
// 3: Sub Bytes
// 4: Shift Rows
// 5: Mix Columns (fuckin hell... buzzin for this)
// 6: Add Round Key
// Repeat steps 3 -> 6, 10 times - omit the last column mixer

