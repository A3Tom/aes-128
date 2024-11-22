export const BLOCK_SIZE = 128;
export const ROUND_CONSTANTS = [
    0x01000000, 0x02000000,
    0x04000000, 0x08000000,
    0x10000000, 0x20000000,
    0x40000000, 0x80000000,
    0x1B000000, 0x36000000
]
export const MIX_COLUMN_MATRIX = [
    [2, 3, 1, 1],
    [1, 2, 3, 1],
    [1, 1, 2, 3],
    [3, 1, 1, 2]
]