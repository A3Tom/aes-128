namespace aes128;

public static class BitOperation
{
    public static void RotWord(byte[] word)
    {
        var wrappedWord = word[0];

        for (int i = 0; i < word.Length; i++)
            word[i] = (i + 1 < word.Length) ? word[i + 1] : wrappedWord;
    }
}