from encryption.encryption_base import EncryptionBase

class RSA(EncryptionBase):
    def encrypt(self, blocks: list[bytes]) -> list[bytes]:
        return [self.__encrypt_block(block) for block in blocks]
    
    def __encrypt_block(self, block: bytes) -> bytes:
        return block ^ self.key
    
    def decrypt(self, blocks: list[bytes]) -> list[bytes]:
        return [self.__decrypt_block(block) for block in blocks]
    
    def __decrypt_block(self, block: bytes) -> bytes:
        return block ^ self.key
    
    def spout_name(self) -> str:
        return "RSA"