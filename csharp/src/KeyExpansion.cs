namespace aes128;

public static class KeyExpansion
{
    private const int KeyRoundCount = 11;
    
    // i	1	2	3	4	5	6	7	8	9	10
    // rci	01	02	04	08	10	20	40	80	1B	36
    public static byte[] CalculateRoundConstant(int round)
    {
        var roundIndex = round - 1;
        var rkey = 0x01 << roundIndex;
        
        if (rkey > Constants.BYTE_MASK)
        {
            rkey ^= Constants.GF_POLYNOMIAL;
            rkey <<= roundIndex % 8;
            rkey &= Constants.BYTE_MASK;
        }

        return [((byte)rkey), 00, 00, 00];
    }

    public static byte[][] ExpandKeySchedule(byte[] key)
    {
        byte[] previousBlock = key;
        byte[][] keySchedule = [];

        for (int i = 0; i < KeyRoundCount; i++)
        {
            byte[] roundKey = [];
            byte[] previousColumn = previousBlock[^4..];
            byte[] permutationColumn = previousColumn;

            // Shift Columns

            // Sub Bytes

            // Add Round Key Constant
            var roundConstant = CalculateRoundConstant(i);
            for (int j = 0; j < permutationColumn.Length; j++)
                permutationColumn[j] ^= roundConstant[j];

            keySchedule.Append(roundKey);
            previousBlock = roundKey;
        }

        return keySchedule;
    }
}