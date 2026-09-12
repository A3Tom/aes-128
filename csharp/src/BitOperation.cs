namespace aes128;

public static class BitOperation
{
    public static void RotWord(byte[] word)
    {
        var wrappedWord = word[0];

        for (int i = 0; i < word.Length; i++)
            word[i] = (i + 1 < word.Length) ? word[i + 1] : wrappedWord;
    }

    public static byte[] GetColumn(byte[] block, int columnIndex) => [
      block[columnIndex],
      block[4 + columnIndex],
      block[8 + columnIndex],
      block[12 + columnIndex]
    ];

    public static void SubBytes(byte[] bytes)
    {
        for (int i = 0; i < bytes.Length; i++)
            bytes[i] = Constants.SBox[bytes[i]];
    }

    public static void SubBytesInverse(byte[] bytes)
    {
        for (int i = 0; i < bytes.Length; i++)
            bytes[i] = Constants.SBoxInv[bytes[i]];
    }
}