using System.Reflection.Metadata;

namespace aes128;

public static class KeyExpansion
{
    private const int KeyRoundCount = 10;
    
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
        byte[][] keySchedule = new byte[KeyRoundCount][];

        for (int i = 0; i < KeyRoundCount; i++)
        {
            byte[] roundKey = new byte[16];
            byte[] permutationRow = BitOperation.GetRow(previousBlock, 3);

            // Rotate Word 
            BitOperation.RotWord(permutationRow);

            // Sub Bytes
            BitOperation.SubBytes(permutationRow);

            // Add Round Key Constant
            var roundConstant = CalculateRoundConstant(i + 1);
            BitOperation.XORBytes(permutationRow, roundConstant);

            for (int rkColIdx = 0; rkColIdx < 4; rkColIdx++)
            {
                byte[] rkRow = BitOperation.GetRow(previousBlock, rkColIdx); 
                BitOperation.XORBytes(rkRow, permutationRow);
                BitOperation.SetRow(roundKey, rkColIdx, rkRow);
                permutationRow = rkRow;
            }

            keySchedule[i] = roundKey;
            previousBlock = roundKey;
        }

        return keySchedule;
    }
}