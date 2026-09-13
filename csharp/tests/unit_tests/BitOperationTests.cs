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

    [Theory]
    [ClassData(typeof(BitOperationGetColumnData))]
    public void WhenAnInRangeIndexIsGiven_GetColumn_ReturnsCorrectColumnArray(byte[] block, int columnIndex, byte[] expected)
    {
        var actual = BitOperation.GetColumn(block, columnIndex);

        actual.Should().Equal(expected);
    }

    [Theory]
    [ClassData(typeof(BitOperationSetColumnData))]
    public void WhenAnInRangeIndexIsGiven_SetColumn_ReturnsCorrectColumnArray(byte[] block, int columnIndex, byte[] newColumn, byte[] expected)
    {
        BitOperation.SetColumn(block, columnIndex, newColumn);

        block.Should().Equal(expected);
    }

    [Theory]
    [ClassData(typeof(BitOperationSubBytesData))]
    public void GivenAByteArray_SubBytes_ReturnsSubbedBytes(byte[] bytes, byte[] expected)
    {
        BitOperation.SubBytes(bytes);

        bytes.Should().Equal(expected);
    }

    [Theory]
    [ClassData(typeof(BitOperationSubBytesInverseData))]
    public void GivenAByteArray_SubBytesInverse_ReturnsSubbedBytes(byte[] bytes, byte[] expected)
    {
        BitOperation.SubBytesInverse(bytes);

        bytes.Should().Equal(expected);
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

public class BitOperationGetColumnData : TheoryData<byte[], int, byte[]>
{
    private static readonly byte[] _block = [
        1,  2,  3,  4,
        5,  6,  7,  8,
        9,  10, 11, 12,
        13, 14, 15, 16
    ];

    private static readonly byte[] _expected_col_a = [1, 5, 9,  13];
    private static readonly byte[] _expected_col_b = [2, 6, 10, 14];
    private static readonly byte[] _expected_col_c = [3, 7, 11, 15];
    private static readonly byte[] _expected_col_d = [4, 8, 12, 16];

    public BitOperationGetColumnData()
    {
        Add(_block, 0, _expected_col_a);
        Add(_block, 1, _expected_col_b);
        Add(_block, 2, _expected_col_c);
        Add(_block, 3, _expected_col_d);
    }
}

public class BitOperationSetColumnData : TheoryData<byte[], int, byte[], byte[]>
{
    private static readonly byte[] _block = [
        1,  2,  3,  4,
        5,  6,  7,  8,
        9,  10, 11, 12,
        13, 14, 15, 16
    ];
    
    private static readonly byte[] _expected_block_a = [
        0,  2,  3,  4,
        0,  6,  7,  8,
        0,  10, 11, 12,
        0,  14, 15, 16
    ];
    private static readonly byte[] _expected_block_b = [
        1,  0,  3,  4,
        5,  0,  7,  8,
        9,  0,  11, 12,
        13, 0,  15, 16
    ];
    private static readonly byte[] _expected_block_c = [
        1,  2,  0,  4,
        5,  6,  0,  8,
        9,  10, 0,  12,
        13, 14, 0,  16
    ];
    private static readonly byte[] _expected_block_d = [
        1,  2,  3,  0,
        5,  6,  7,  0,
        9,  10, 11, 0,
        13, 14, 15, 0
    ];

    private static readonly byte[] _new_column = [0, 0, 0, 0];

    public BitOperationSetColumnData()
    {
        Add(_block, 0, _new_column, _expected_block_a);
        Add(_block, 1, _new_column, _expected_block_b);
        Add(_block, 2, _new_column, _expected_block_c);
        Add(_block, 3, _new_column, _expected_block_d);
    }
}

public class BitOperationSubBytesData : TheoryData<byte[], byte[]>
{
    public BitOperationSubBytesData()
    {
        Add([.. Constants.SBox.Keys], [.. Constants.SBoxInv.Values]);
        Add([.. Constants.SBoxInv.Values], [.. Constants.SBox.Values]);
    }
}

public class BitOperationSubBytesInverseData : TheoryData<byte[], byte[]>
{
    public BitOperationSubBytesInverseData()
    {
        Add([.. Constants.SBox.Values], [.. Constants.SBoxInv.Values]);
        Add([.. Constants.SBoxInv.Keys], [.. Constants.SBox.Values]);
    }
}