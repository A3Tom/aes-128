DEFAULT_BLOCK_SIZE = 4
DEFAULT_WORD_SIZE = 8
DEFAULT_ENDIANNESS = 'little'

class EncryptionBase():
    def __init__(self, key: int, print_debug: bool = True):
        self.key = key
        self.key_size = self.__get_key_size(key)
        self.chunk_size = self.__get_chunk_size(self.key_size)
        self.key_bit_size = self.chunk_size * DEFAULT_WORD_SIZE

        self.print_debug = print_debug
            
    def encrypt(self, blocks: list[bytes]) -> list[bytes]:
        pass
    
    def decrypt(self, blocks: list[bytes]) -> list[bytes]:
        pass
    
    def spout_name(self) -> str:
        pass
    
    def spout_block_size(self) -> str:
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
