namespace aes128;

public class GaloisFunctions
{
    public static int GMul(int a, int multiplicator)
    {
        if (multiplicator == 1)
            return a;
        else if (multiplicator == 2)
            return GMul2(a);
        
        var result = a;
        for (int i = 0; i < Math.Floor(multiplicator / 2d); i++)
            result = GMul2(result);
        
        if (multiplicator % 2 == 1)
            result ^= a;
        
        return result;
    }
    
    private static int GMul2(int a)
    {
        a <<= 1;

        return a <= 0xFF ? a : a ^= 0x11B;
    }
}