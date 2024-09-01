from encryption.encryption_base import EncryptionBase

BLOCK_SIZE = 128
ENCRYPTION_NAME = "AES"

class AES(EncryptionBase):
    def __init__(self, key: int, mode_of_operation: str = 'EBC', print_debug: bool = True):
        super().__init__(key, mode_of_operation, print_debug)
        self.__rounds = self.__calculate_encryption_rounds()

    def encrypt_message(self, message: str) -> list[bytes]:
        self.__expanded_key = self.__key_expansion()
        return super().encrypt_message(message, BLOCK_SIZE)
        
    def spout_name(self) -> str:
        return ENCRYPTION_NAME

    def spout_block_size(self) -> str:
        return BLOCK_SIZE

    # https://crypto.stackexchange.com/questions/20/what-are-the-practical-differences-between-256-bit-192-bit-and-128-bit-aes-enc/1527#1527
    def _encrypt_block(self, block: bytes) -> bytes:
        # # block = self.__add_round_key()

        # for round in self.__rounds:
        #     round_key = round

        #     block = self.__sub_bytes()
        #     block = self.__shift_rows()

        #     if round != self.__rounds:
        #         block = self.__mix_columns()
            
        #     block = self.__add_round_key(block, round_key)
        #     pass
        
        return block ^ self.key


    def _decrypt_block(self, block: bytes) -> bytes:
        return block ^ self.key

    def _sub_byte(self, byte: int) -> int:
        return self.sbox_op_helper.rijndael_sbox[byte]

    def _sub_byte_inverse(self, byte: int) -> int:
        return self.sbox_op_helper.rijndael_sbox_inverse[byte]

    def __key_expansion(self) -> int:
        key_bytes = self.block_op_helper.int_to_bytes(self.key, self.chunk_size) 
        print(f"Sboxed Bytes:")
        [print(f"0x{b:002X} -> 0x{self._sub_byte(b):002X} -> 0x{self._sub_byte_inverse(self._sub_byte(b)):002X}") for b in key_bytes]
        

    def __add_round_key(self, block: bytes, round_key: bytes):
        return block ^ round_key

    def __sub_bytes(self, block: bytes):
        return block

    def __shift_rows(self, block: bytes):
        return block

    def __mix_columns(self, block: bytes):
        return block


    def __calculate_encryption_rounds(self) -> int:
        match self.key_bit_size:
            case 128: return 10
            case 192: return 12
            case 256: return 14
            case _: raise Exception(f"Key size: {self.key_bit_size} is an invalid key size for AES, only 128, 192 and 256 are valid")





    