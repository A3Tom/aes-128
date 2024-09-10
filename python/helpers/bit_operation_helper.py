BASE_2_RANGE = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048]

class BitOperationHelper():
    def __init__(self) -> None:
        pass

    def circular_shift_left(self, input: int, shift_count: int) -> int:
        bit_amount = self.__parse_input_bit_amount(input)
        bit_cap_mask = self.__parse_bit_cap_mask(bit_amount)

        bitshifted_var = (input << shift_count) & bit_cap_mask
        missing_bits = input >> bit_amount - shift_count 
        return bitshifted_var | missing_bits

    def circular_shift_right(self, input: int, shift_count: int) -> int:
        bit_amount = self.__parse_input_bit_amount(input)
        bit_cap_mask = self.__parse_bit_cap_mask(bit_amount)
        
        bitshifted_var = input >> shift_count
        missing_bits = input << (bit_amount - shift_count) & bit_cap_mask
        return bitshifted_var | missing_bits
    
    # mad props to https://iq.opengenus.org/addition-using-bitwise-operations/ what a belter
    def bitwise_add(self, a: int, b: int) -> int:
        return a if b == 0 else self.bitwise_add(a^b , (a&b) << 1)
    
    def gmul(self, og_int: int, multiplicator: int) -> int:
        if multiplicator == 1:
            return og_int
        elif multiplicator == 2:
            return self.gmul2(og_int)

        result = og_int
        for _ in range(multiplicator // 2):
            result = self.gmul2(result)

        if(multiplicator % 2 == 1):
            result ^= og_int

        return result

    
    # Is this a magical method? It is. But I did write it by hand so that's kinda cool
    def gmul2(self, og_int: int) -> int:
        og_int <<= 1
        
        if og_int > 0xFF:        # Note for masel when I next read this;
            og_int ^= 0x11B      # Keep hings in polynomials til the end and it'll aw work out

        return og_int

    def gmul3(self, og_int: int) -> int:
        return self.gmul2(og_int) ^ og_int

    def get_next_base_2(self, var: int) -> int:
        var -= 1
        for b2i in BASE_2_RANGE:
            var |= var >> b2i
        var += 1
        return var

    def __parse_input_bit_amount(self, input: int) -> int:
        return self.get_next_base_2(len(bin(input)[2:]))

    def __parse_bit_cap_mask(self, bitshift_amount: int) -> int:
        return pow(2, bitshift_amount) - 1
