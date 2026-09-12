using AwesomeAssertions;
using aes128;

namespace tests.unit_tests;

[TestClass]
public sealed class BitOperationTests
{
    [Theory]
    [ClassData(typeof(BitOperationRotWordData))]
    public void WhenAValidWordIsPassed_RotWord_ReturnsByteArrayRotatedBy1(byte[] word, byte[] expected)
    {
        BitOperation.RotWord(word);
        
        word.Should().Equal(expected);
    }
}

public class BitOperationRotWordData : TheoryData<byte[], byte[]>
{
    private static readonly byte[] _word_a = [0x6B, 0xC1, 0xBE, 0xE2];
    private static readonly byte[] _word_b = [0x2E, 0x40, 0x9F, 0x96];
    private static readonly byte[] _word_c = [0xE9, 0x3D, 0x7E, 0x11];
    private static readonly byte[] _word_d = [0x73, 0x93, 0x17, 0x2A];
    
    private static readonly byte[] _expected_a = [0xC1, 0xBE, 0xE2, 0x6B];
    private static readonly byte[] _expected_b = [0x40, 0x9F, 0x96, 0x2E];
    private static readonly byte[] _expected_c = [0x3D, 0x7E, 0x11, 0xE9];
    private static readonly byte[] _expected_d = [0x93, 0x17, 0x2A, 0x73];

    public BitOperationRotWordData()
    {
        Add(_word_a, _expected_a);
        Add(_word_b, _expected_b);
        Add(_word_c, _expected_c);
        Add(_word_d, _expected_d);
    }
}