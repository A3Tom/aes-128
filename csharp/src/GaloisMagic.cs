namespace aes128;

public static class GaloisFunctions
{
    public static int GMul(byte a, int multiplier)
    {
        if (multiplier == 1)
            return a;
        else if (multiplier == 2)
            return GMul2(a);
        
        var result = a;
        for (int i = 0; i < Math.Floor(multiplier / 2d); i++)
            result = GMul2(result);
        
        if (multiplier % 2 == 1)
            result ^= a;
        
        return result;
    }

    public static byte GMul2(byte a){ 
        bool fieldOverflow = (a & 0b1000_0000) == 1;
        a <<= 1;

        if (fieldOverflow)
            a ^= Constants.GF_POLYNOMIAL;

        return a;
    }
}