from encryption.encryption_base import EncryptionBase

ENCRYPTION_NAME = "RSA"

class RSA(EncryptionBase):
    def encrypt(self, blocks: list[bytes]) -> list[bytes]:
        return [self._encrypt_block(block) for block in blocks]
    
    def _encrypt_block(self, block: bytes) -> bytes:
        return block ^ self.key
    
    def decrypt(self, blocks: list[bytes]) -> list[bytes]:
        return [self.__decrypt_block(block) for block in blocks]
    
    def __decrypt_block(self, block: bytes) -> bytes:
        return block ^ self.key
    
    def spout_name(self) -> str:
        return ENCRYPTION_NAME