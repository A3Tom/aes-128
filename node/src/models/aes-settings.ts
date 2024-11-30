export const enum MODE_OF_OPERATION {
    ECB = "ECB",
    CBC = "CBC",
    CTR = "CTR",
    GCM = "GCM"
}

export const enum KEY_SIZE {
    _128 = "128",
    _192 = "192",
    _256 = "256"
}

export const enum ROUND_STAGE {
    KeyExpansion = 'Key Expansion',
    SubBytes = 'Sub Bytes',
    ShiftRows = 'Shift Rows',
    MixColumns = 'Mix Columns',
    AddRoundKey = 'Add Round Key'
}

export interface AESConfig {
    message: string;
    key: bigint;
    modeOfOperation: MODE_OF_OPERATION;
    keySize: KEY_SIZE;
    encryptionRounds: number;
}