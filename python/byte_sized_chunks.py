import argparse
from helpers.block_operation_helper import BlockOperationHelper
from encryption.encryption_aes import AES

parser = argparse.ArgumentParser()
parser.add_argument("-k", "--key", help="The integer value which forms the bitmask")
parser.add_argument("-m", "--message", help="The message you want to encode")
cli_args = vars(parser.parse_args())

key = 0b11100011111000111110001111100011111000111110001111100011111000111110001111100011111000111110001111100011111000111110001111100011
message = "Remoooo"

message_arg = cli_args.get('message')
key_arg = cli_args.get('key')

key = int(key_arg) if key_arg is not None else key
message = message_arg if message_arg is not None else message

encryption_algo = AES(key)


def run() -> None:
    block_op_helper = BlockOperationHelper()
    encoded_blocks = encryption_algo.encrypt_message(message)
    decoded_blocks = encryption_algo.decrypt(encoded_blocks)

    encoded_string = block_op_helper.parse_blocks_to_string(encoded_blocks)
    decoded_string = block_op_helper.parse_blocks_to_string(decoded_blocks)

    encryption_algo.output_debug_detail()
    print_encryption_output(encoded_string, decoded_string)


def print_encryption_output(encoded_string: str, decoded_string: str) -> None:
    print()
    print(f"Message: {message}")
    print(f"Encoded: {encoded_string}")
    print(f"Decoded: {decoded_string}")


if __name__ == '__main__':
    run()