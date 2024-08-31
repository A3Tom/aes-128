from helpers.block_operation_helper import BlockOperationHelper

DEFAULT_BLOCK_SIZE = 4
DEFAULT_WORD_SIZE = 8
DEFAULT_ENDIANNESS = 'little'

class EncryptionBase():
    def __init__(self, key: int, mode_of_operation: str = 'EBC', nonce: int = 0b0, print_debug: bool = True):
        self.key = key
        self.key_size = self.__get_key_size(key)
        self.chunk_size = self.__get_chunk_size(self.key_size)
        self.key_bit_size = self.chunk_size * DEFAULT_WORD_SIZE
        self.mode_of_operation = mode_of_operation
        self.nonce = nonce

        self.print_debug = print_debug

        self.__block_op_helper = BlockOperationHelper()
            

    def encrypt_message(self, message: str, block_size: int) -> list[bytes]:
        message_blocks = self.__block_op_helper.parse_string_to_blocks(message, block_size)
        return self.encrypt(message_blocks)

    def encrypt(self, blocks: list[bytes]) -> list[bytes]:
        match self.mode_of_operation:
            case 'EBC': return self._encrypt_ecb(blocks)
            case 'CBC': return self._encrypt_cbc(blocks)
            case 'CTR': return self._encrypt_ctr(blocks)
            case _: raise Exception(f"Mode of Operation: {self.mode_of_operation} is invalid")
    
    def decrypt(self, blocks: list[bytes]) -> list[bytes]:
        match self.mode_of_operation:
            case 'EBC': return self._decrypt_ecb(blocks)
            case 'CBC': return self._decrypt_cbc(blocks)
            case 'CTR': return self._decrypt_ctr(blocks)
            case _: raise Exception(f"Mode of Operation: {self.mode_of_operation} is invalid")
    
    def spout_name(self) -> str:
        pass
    
    def spout_block_size(self) -> str:
        pass
    
    def _encrypt_ecb(self, blocks: list[bytes]) -> list[bytes]:
        result = [self._encrypt_block(block) for block in blocks]
        result.reverse()

        return result
    
    def _encrypt_cbc(self, blocks: list[bytes]) -> list[bytes]:
        vector = 0b0
        
        for i, block in enumerate(blocks):
            block ^= vector
            blocks[i] = self._encrypt_block(block)
            vector = block

        return blocks
    
    def _encrypt_ctr(self, blocks: list[bytes]) -> list[bytes]:
        counter = self.nonce

        for block in blocks:
            expanded_counter = self.__block_op_helper.expand_blocks(blocks, len(bin(blocks[0])[2:]))
            encrpyted_counter = self._encrypt_block(expanded_counter)
            block ^= encrpyted_counter
            counter += 1
        
        return blocks

    def _encrypt_block(self, block: bytes) -> bytes:
        pass
    
    def _decrypt_ecb(self, blocks: list[bytes]) -> list[bytes]:
        result = [self._decrypt_block(block) for block in blocks]
        result.reverse()

        return result
    
    def _decrypt_cbc(self, blocks: list[bytes]) -> list[bytes]:
        vector = 0b0
        
        for i, block in enumerate(blocks):
            block ^= vector
            blocks[i] = self._decrypt_block(block)
            vector = block

        return blocks
    
    def _decrypt_ctr(self, blocks: list[bytes]) -> list[bytes]:
        counter = self.nonce

        for block in blocks:
            expanded_counter = self.__block_op_helper.expand_blocks(blocks, len(bin(blocks[0])[2:]))
            decrpyted_counter = self._decrypt_block(expanded_counter)
            block ^= decrpyted_counter
            counter += 1
        
        return blocks

    def _decrypt_block(self, block: bytes) -> bytes:
        pass

    def __get_key_size(self, key) -> int:
        return len(bin(key)[2:])

    def __get_chunk_size(self, key_size: int) -> int:
        return (-(key_size // -32)) * DEFAULT_BLOCK_SIZE

    def output_debug_detail(self) -> None:
        print()
        print(f"Encryption Detail:")
        print(f"  Algorithm: {self.spout_name()}")
        print(f"  Key Size: {self.key_size} bits")
        print(f"  Key Bit Size: {self.key_bit_size} bit")
        print(f"  Block Size: {self.spout_block_size()} bit")
