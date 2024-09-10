DEFAULT_WORD_SIZE = 8
DEFAULT_ENDIANNESS = 'little'
DEFAULT_ROW_BIT_SIZE = 32
USE_COLUMN_MAJOR = True
COLUMN_MASK = 0xFFFFFFFF
BYTE_MASK = 0xFF

class BlockOperationHelper():
    def parse_string_to_blocks(self, message: str, block_size: int) -> list[bytes]:
        chunk_size = block_size // DEFAULT_WORD_SIZE
        message_blocks = self.__build_default_chunks_array(message, chunk_size)

        for idx, char in enumerate(message):
            chunk_index = idx // chunk_size
            bitmask_index = idx % chunk_size
            message_blocks[chunk_index] |= self.__char_to_bitmask(char, bitmask_index)

        return message_blocks

    def parse_blocks_to_string(self, chunk_array: list[bytes]) -> str:
        return ''.join([self.__parse_block_to_char_array(chunk) for chunk in chunk_array])

    def parse_2d_byte_array_to_int(self, byte_array_2d: list[list[bytes]]) -> int:
        frogs = 0x0
        for i in range(len(byte_array_2d[0])):
            frogs <<= DEFAULT_ROW_BIT_SIZE
            frogs |= int.from_bytes([byte for byte in byte_array_2d[i]])
        return frogs

    def build_2d_byte_array(self, block: bytes, use_column_major: bool = USE_COLUMN_MAJOR) -> list[list[bytes]]:
        columns = len(bin(block)) // DEFAULT_ROW_BIT_SIZE
        result = [[0]*4 for _ in range(columns)]
        
        self.__build_byte_array_columns(result, block)

        if use_column_major:
            result = self.transpose_2d_array(result)

        return result

    # Incredible resource for this: https://www.geeksforgeeks.org/matrix-transpose-without-numpy-in-python/
    def transpose_2d_array(self, array):
        return [list(row) for row in zip(*array)]

    def int_to_bytes(self, input: int, chunk_size: int, endianness: str = DEFAULT_ENDIANNESS) -> bytes:
        return input.to_bytes(chunk_size, endianness)

    def output_2d_array_hex(self, array):
        print()
        for i, col in enumerate(array):
            row_output = ""
            for j, byte in enumerate(col):
                row_output += f"{byte:002X} " 
                pass
            print(row_output)


    def __build_byte_array_columns(self, array: list[list[bytes]], block: bytes) -> None:
        for col_idx in range(0, len(array)):
            cur_col = (block >> (col_idx * DEFAULT_ROW_BIT_SIZE)) & COLUMN_MASK
            self.__build_byte_array_row(array[col_idx], cur_col)
        array.reverse()

    def __build_byte_array_row(self, array_col: list[bytes], column: bytes) -> None:
        for row_idx in range(0, 4):
            cur_byte = (column >> (row_idx * DEFAULT_WORD_SIZE)) & BYTE_MASK
            array_col[row_idx] = cur_byte
        array_col.reverse()
    
    def __char_to_bitmask(self, char: str, bitmask_index: int) -> bytes:
        return (ord(char) << (bitmask_index) * DEFAULT_WORD_SIZE)

    def __build_default_chunks_array(self, message: str, chunk_size: int) -> list[bytes]:
        return [0b0] * -(len(message) // -chunk_size)
    
    def __parse_block_to_char_array(self, block: bytes) -> str:
        block_bytes = self.int_to_bytes(block, block.__sizeof__())
        return ''.join([chr(byte) for byte in block_bytes if byte != 0x0])