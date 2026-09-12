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
}