namespace aes128;

public static class BitOperation
{
    public static void RotWord(byte[] word)
    {
        var wrappedWord = word[0];

        for (int i = 0; i < word.Length; i++)
        {
            var fwIdx = i + 1;

            if (fwIdx < word.Length)
                word[i] = word[fwIdx];
            else
                word[i] = wrappedWord;
        }
    }
}