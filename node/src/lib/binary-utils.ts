export function toBinaryString(int: number, blockSize: number = 32): string {
    return int.toString(2).padStart(blockSize, '0')
}