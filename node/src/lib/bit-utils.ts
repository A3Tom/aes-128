export const BASE_2_RANGE: Set<number> = new Set([1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048]);

export function toBinaryString(int: number | bigint, blockSize: number = 32): string {
    return int.toString(2).padStart(blockSize, '0')
}

export function buildBitCapMask(bitAmount: number): bigint {
    return BigInt((2 ** bitAmount) - 1);
}

export function circularLeftShift(value: bigint, blockSize: number, amount: number): bigint {
    const circularBits = value >> BigInt(blockSize - amount);
    const bitCapMask = buildBitCapMask(blockSize);

    return ((value << BigInt(amount)) & bitCapMask) | circularBits;
}

export function circularRightShift(value: bigint, blockSize: number, amount: number): bigint {
    const bitCapMask = buildBitCapMask(blockSize);
    const circularBits = (value << BigInt(blockSize - amount)) & bitCapMask;

    return (value >> BigInt(amount)) | circularBits;
}