
from helpers.bit_operation_helper import BitOperationHelper

### !!! ACHTUNG !!!
### This is using column-major order

boh = BitOperationHelper()

test_bytes = 0x2B7E151628AED2A6ABF7158809CF4F3C
col_mask = 0xFFFFFFFF
cols = test_bytes // col_mask
shift_positions = 2

for col_idx in range(0, 4):
    cur_col = (test_bytes >> (col_idx * 32)) & col_mask
    
    if col_idx == 0:
        print(f"{cur_col:08X}")

        shifted = boh.circular_shift_left(cur_col, (8 * shift_positions))

        for row_idx in range(0, 4):
            cur_byte = f"{cur_col:08X}"[(row_idx * 2):((row_idx * 2) + 2)]
            shifted_byte = f"{shifted:08X}"[(row_idx * 2):((row_idx * 2) + 2)]
            
            print(f"{cur_byte} | {shifted_byte}") 
    
