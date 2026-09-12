namespace aes128;

public class GaloisFunctions
{
    public static int GMul(int ogInt, int multiplicator)
    {
        if (multiplicator == 1)
            return ogInt;
        else if (multiplicator == 2)
            return GMul2(ogInt);
        
        var result = ogInt;
        for (int i = 0; i < Math.Floor(multiplicator / 2d); i++)
            result = GMul2(result);
        
        if (multiplicator % 2 == 1)
            result ^= ogInt;
        
        return result;
    }

    private static int GMul2(int og_int) => (og_int <<= 1) <= Constants.BYTE_MASK 
        ? og_int 
        : og_int ^= Constants.GF_POLYNOMIAL;
}