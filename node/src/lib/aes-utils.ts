import { KEY_SIZE } from "../models/aes-settings";

export const BLOCK_SIZE: number = 128;
export const ROUND_CONSTANTS: Set<number> = new Set([
    0x01000000, 0x02000000,
    0x04000000, 0x08000000,
    0x10000000, 0x20000000,
    0x40000000, 0x80000000,
    0x1B000000, 0x36000000
]);

// I kinda hate this but also kinda don't care cos I managed to give it a type that it didn't shout about.
// Would prefer UInt8Array[][] though
export const MIX_COLUMN_MATRIX: Set<Set<number>> = new Set([
    new Set([2, 3, 1, 1]),
    new Set([1, 2, 3, 1]),
    new Set([1, 1, 2, 3]),
    new Set([3, 1, 1, 2])
]);


export function calculateEncryptionRounds(keySize: KEY_SIZE): number {
    switch (keySize) {
        case KEY_SIZE._128:
            return 10;
        case KEY_SIZE._192:
            return 12;
        case KEY_SIZE._256:
            return 14;
        default:
            throw `Key Size: ${keySize} isny valid ya fanny`;
    }
}