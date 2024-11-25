import { KEY_SIZE, MODE_OF_OPERATION } from "./aes-settings";

export interface EncryptionSetup {
    message: string;
    key: bigint;
    modeOfOperation: MODE_OF_OPERATION;
    keySize: KEY_SIZE;
}