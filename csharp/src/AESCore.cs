namespace aes128;

public class AESCore
{
    public static byte[][] EncryptPlainTextECB(byte[] key, string[] plainTextStrings)
    {
        byte[][] cipherText = new byte[plainTextStrings.Length][];
        var keySchedule = KeyExpansion.ExpandKeySchedule(key);

        for (int i = 0; i < plainTextStrings.Length; i++)
        {
            cipherText[i] = Convert.FromHexString(plainTextStrings[i]);
            EncryptPlainTextBlockECB(key, keySchedule, cipherText[i]);
        }

        return cipherText;
    }

    public static void EncryptPlainTextBlockECB(byte[] key, byte[][] keySchedule, byte[] block)
    {
        BitOperation.XORBytes(block, key);

        for (int i = 1; i <= Constants.ENCRYPTION_ROUNDS; i++)
        {
            // SBox


            // Shift Rows


            // Mix Columns


            // Add Key
        }
    }
}