export const BYTE_SIZE: number = 8;
export const WORD_SIZE: number = 32;
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

// Look, this is inefficient AF I know but it actually worked unlike my port of my python method of the same name
// TODO: Once I am better with bitwise operations in Node, revisit this nonsense lol...
export function getNextBase2(value: bigint): number {
    return 2 ** (value - 1n).toString(2).length;
}

export function convertByteArrayToHexString(byteArray: Uint8Array): string {
    return byteArray.reduce((result, byte) => {
        result += byte.toString(16).padStart(2, '0');
        return result;
    }, '')
}

export function convertIntToBytes(value: bigint, valueBitSize?: number): Uint8Array {
    const bitSize = valueBitSize ?? getNextBase2(value);
    const bitMaskValue: bigint = buildBitCapMask(BYTE_SIZE);
    const byteArray = new Uint8Array(bitSize / BYTE_SIZE);

    for (let i = 0; i < byteArray.length; i++) {
        byteArray[byteArray.length - (i + 1)] = Number((value >> (8n * BigInt(i))) & bitMaskValue);
    }

    return byteArray;
}