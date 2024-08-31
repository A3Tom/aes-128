DEFAULT_WORD_SIZE = 8
DEFAULT_ENDIANNESS = 'little'

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
    
    # TODO
    def expand_blocks(self, blocks: list[bytes], target_size: int) -> list[bytes]:
        return blocks

    def __int_to_bytes(self, input: int, chunk_size: int) -> bytes:
        return input.to_bytes(chunk_size, DEFAULT_ENDIANNESS)
    
    def __char_to_bitmask(self, char: str, bitmask_index: int) -> bytes:
        return (ord(char) << (bitmask_index) * DEFAULT_WORD_SIZE)

    def __build_default_chunks_array(self, message: str, chunk_size: int) -> list[bytes]:
        return [0b0] * -(len(message) // -chunk_size)
    
    def __parse_block_to_char_array(self, block: bytes) -> str:
        block_bytes = self.__int_to_bytes(block, block.__sizeof__())
        return ''.join([chr(byte) for byte in block_bytes if byte != 0x0])