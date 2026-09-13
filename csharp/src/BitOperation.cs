namespace aes128;

public static class BitOperation
{
    public static void RotWord(byte[] word)
    {
        var wrappedWord = word[0];

        for (int i = 0; i < word.Length; i++)
            word[i] = (i + 1 < word.Length) ? word[i + 1] : wrappedWord;
    }

    public static void XORBytes(byte[] input, byte[] otherYin)
    {
        if (input.Length != otherYin.Length)
            throw new ArgumentException($"Cannot XOR byte arrays of different length ya dobber. a: {input.Length} b: {otherYin.Length}");

        for (int i = 0; i < input.Length; i++)
            input[i] ^= otherYin[i];
    }

    public static byte[] GetColumn(byte[] block, int columnIndex) => [
      block[columnIndex],
      block[4 + columnIndex],
      block[8 + columnIndex],
      block[12 + columnIndex]
    ];

    public static void SetColumn(byte[] block, int columnIndex, byte[] column)
    {
        block[columnIndex] = column[0];
        block[4 + columnIndex] = column[1]; 
        block[8 + columnIndex] = column[2]; 
        block[12 + columnIndex] = column[3];
    }

    public static byte[] GetRow(byte[] block, int rowIndex) => block[(rowIndex * 4)..((rowIndex * 4) + 3)];

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