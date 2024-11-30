export const enum MODE_OF_OPERATION {
    ECB = "ecb",
    CTR = "ctr",
    GCM = "gcm"
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