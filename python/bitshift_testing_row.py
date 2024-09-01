from helpers.bit_operation_helper import BitOperationHelper

### !!! ACHTUNG !!!
### This is using column-major order

DEFAULT_WORD_SIZE = 8
DEFAULT_ROW_BIT_SIZE = 32
USE_COLUMN_MAJOR = True
COLUMN_MASK = 0xFFFFFFFF
BYTE_MASK = 0xFF

def build_2d_byte_array(block: bytes) -> list[list[bytes]]:
    columns = len(bin(block)) // DEFAULT_ROW_BIT_SIZE
    result = [[0]*4 for _ in range(columns)]
    
    __build_byte_array_columns(result, block)

    if USE_COLUMN_MAJOR:
        result = transpose_2d_array(result)

    return result

# Incredible resource for this: https://www.geeksforgeeks.org/matrix-transpose-without-numpy-in-python/
def transpose_2d_array(array):
    return [list(row) for row in zip(*array)]


def __build_byte_array_columns(array: list[list[bytes]], block: bytes) -> None:
    for col_idx in range(0, len(array)):
        cur_col = (block >> (col_idx * DEFAULT_ROW_BIT_SIZE)) & COLUMN_MASK
        __build_byte_array_row(array[col_idx], cur_col)
    array.reverse()


def __build_byte_array_row(array_col: list[bytes], column: bytes) -> None:
    for row_idx in range(0, 4):
        cur_byte = (column >> (row_idx * DEFAULT_WORD_SIZE)) & BYTE_MASK
        array_col[row_idx] = cur_byte
    array_col.reverse()



def output_array_hex(array):
    for i, col in enumerate(array):
        row_output = ""
        for j, byte in enumerate(col):
            row_output += f"{byte:002X}, " 
            pass
        print(row_output)


boh = BitOperationHelper()
test_bytes = 0x2B7E151628AED2A6ABF7158809CF4F3C
shift_positions = 2
block_mdarray = build_2d_byte_array(test_bytes)

print("\nBlock Array:")
output_array_hex(block_mdarray)