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
            BitOperation.SubBytes(block);
            // Shift Rows
            ShiftRows(block);

            // Mix Columns

            // Add Key
            // BitOperation.XORBytes(block, keySchedule[i - 1]);
        }

        // SBox
        // BitOperation.SubBytes(block);
        // Shift Rows

        // Add Key
        // BitOperation.XORBytes(block, keySchedule[10]);
    }

    // Reminder that AES blocks are striped vertically, not horizontally
    // So this ShiftRows keeps the AES process name 
    // but will deal with "columns" the way we would normally expect a column to be
    public static void ShiftRows(byte[] block)
    {
        for (int row = 0; row < block.Length; row++)
        {
            var rowBytes = BitOperation.GetColumn(block, row);

            for (int i = 0; i < row; i++)
                BitOperation.RotWord(rowBytes);

            BitOperation.SetColumn(block, row, rowBytes);
        }
    }
}