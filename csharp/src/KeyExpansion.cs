namespace aes128;

public static class KeyExpansion
{
    // i	1	2	3	4	5	6	7	8	9	10
    // rci	01	02	04	08	10	20	40	80	1B	36
    public static int CalculateRoundKey(int round)
    {
        var roundIndex = round - 1;
        var rkey = 0x01 << roundIndex;
        
        if (rkey > Constants.BYTE_MASK)
        {
            rkey ^= Constants.GF_POLYNOMIAL;
            rkey &= Constants.BYTE_MASK;
            rkey <<= roundIndex % 8;
        }

        return rkey;
    }
}