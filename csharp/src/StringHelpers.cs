namespace aes128;

public static class StringHelpers
{
    public static string CovertBytesToHexString(byte[] bytes)
    {
        Int128 result = 0;

        for (int i = 0; i < bytes.Length; i++)
        {
            result <<= 8; 
            result |= bytes[i];
        }

        string format = $"x{Math.Floor(bytes.Length / 8d) * 8}";
        return $"{result.ToString(format)}";
    }
}