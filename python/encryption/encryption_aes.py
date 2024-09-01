from encryption.encryption_base import EncryptionBase

BLOCK_SIZE = 128
ENCRYPTION_NAME = "AES"
ROUND_CONSTANTS = [ 0x01000000, 0x02000000, 
                    0x04000000, 0x08000000, 
                    0x10000000, 0x20000000, 
                    0x40000000, 0x80000000, 
                    0x1B000000, 0x36000000]

class AES(EncryptionBase):
    def __init__(self, key: int, mode_of_operation: str = 'EBC', print_debug: bool = True):
        super().__init__(key, mode_of_operation, print_debug)
        self.__rounds = self.__calculate_encryption_rounds()
        self.__round_keys = [0x0] * self.__rounds

        self.__expand_key_schedule()

    def encrypt_message(self, message: str) -> list[bytes]:
        return super().encrypt_message(message, BLOCK_SIZE)
        
    def spout_name(self) -> str:
        return ENCRYPTION_NAME

    def spout_block_size(self) -> str:
        return BLOCK_SIZE

    # https://crypto.stackexchange.com/questions/20/what-are-the-practical-differences-between-256-bit-192-bit-and-128-bit-aes-enc/1527#1527
    def _encrypt_block(self, block: bytes) -> bytes:
        prev_block = block
        # prev_block = 66814286504060421741230023322616923956 # known test value
        prev_block = self.__add_round_key(prev_block, self.key)
        print(f"{prev_block:032X}")

        for round in range(1):
            prev_block = int.from_bytes(self.__sub_bytes(prev_block))
            print(f"{prev_block:032X}")

            prev_block = self.__shift_rows(prev_block)
            print(f"{prev_block:032X}")


        #     if round != (self.__rounds - 1):
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

    def __expand_key_schedule(self) -> None:
        previous_block = self.key

        for round in range(self.__rounds):
            round_key = 0x0
            previous_column = previous_block & 0xFFFFFFFF
            permutation_column = previous_column

            # Shift Col
            permutation_column = self.bit_op_helper.circular_shift_left(permutation_column, 8)

            # Sub Bytes
            cur_rkey_bytes = self.block_op_helper.int_to_bytes(permutation_column, 4, 'big')
            permutation_column = int.from_bytes([self._sub_byte(byte) for byte in cur_rkey_bytes])

            # Add Const
            permutation_column ^= ROUND_CONSTANTS[round]

            for col in range(4):
                previous_column = (previous_block >> ((3 - col) * 32)) & 0xFFFFFFFF
                round_key = (round_key << 32) | (previous_column ^ permutation_column)
                permutation_column = round_key & 0xFFFFFFFF

            self.__round_keys[round] = round_key
            previous_block = round_key
        
        print(f"Key: {self.key:032X} produces expanded key schedule:")

        for round in range(self.__rounds):
            print(f"R{round + 1:02}: {self.__round_keys[round]:032X}")
        

    def __add_round_key(self, block: bytes, round_key: bytes):
        return block ^ round_key

    def __sub_bytes(self, block: int):
        return [self._sub_byte(byte) for byte in self.block_op_helper.int_to_bytes(block, 16, 'big')]

    def __shift_rows_array(self, block: bytes):
        block_2darray = self.block_op_helper.build_2d_byte_array(int.from_bytes(block))
        self.block_op_helper.output_2d_array_hex(block_2darray)
        for i in range(4):
            for _ in range(i):
                block_2darray[i].append(block_2darray[i].pop(0))

        self.block_op_helper.output_2d_array_hex(block_2darray)
        return block_2darray
    
    def __shift_rows(self, block: bytes):
        block_array_2d = self.block_op_helper.build_2d_byte_array(block)
        self.block_op_helper.output_2d_array_hex(block_array_2d)

        for col_idx in range(4):
            row = int.from_bytes(block_array_2d[col_idx])
            row = self.bit_op_helper.circular_shift_left(row, (col_idx * 8))
            block_array_2d[col_idx] = row.to_bytes(4)

        block_array_2d = self.block_op_helper.transpose_2d_array(block_array_2d)
        return self.block_op_helper.parse_2d_byte_array_to_int(block_array_2d)

    def __mix_columns(self, block: bytes):
        return block


    def __calculate_encryption_rounds(self) -> int:
        match self.key_bit_size:
            case 128: return 10
            case 192: return 12
            case 256: return 14
            case _: raise Exception(f"Key size: {self.key_bit_size} is an invalid key size for AES, only 128, 192 and 256 are valid")





    