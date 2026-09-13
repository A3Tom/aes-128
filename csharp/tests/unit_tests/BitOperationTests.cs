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
        byte[] actual = [..block];
        BitOperation.SetColumn(actual, columnIndex, newColumn);

        actual.Should().Equal(expected);
    }

    [Theory]
    [ClassData(typeof(BitOperationSubBytesData))]
    public void GivenAByteArray_SubBytes_ReturnsSubbedBytes(string bytes, string expected)
    {
        byte[] actual = Convert.FromHexString(bytes);
        BitOperation.SubBytes(actual);

        actual.Should().Equal(Convert.FromHexString(expected));
    }

    [Theory]
    [ClassData(typeof(BitOperationSubBytesInverseData))]
    public void GivenAByteArray_SubBytesInverse_ReturnsSubbedBytes(string bytes, string expected)
    {
        byte[] actual = Convert.FromHexString(bytes);
        BitOperation.SubBytesInverse(actual);

        actual.Should().Equal(Convert.FromHexString(expected));
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

public class BitOperationSubBytesData : TheoryData<string, string>
{
    public BitOperationSubBytesData()
    {
        Add("000102030405060708090a0b0c0d0e0f", "637c777bf26b6fc53001672bfed7ab76");
        Add("101112131415161718191a1b1c1d1e1f", "ca82c97dfa5947f0add4a2af9ca472c0");
        Add("202122232425262728292a2b2c2d2e2f", "b7fd9326363ff7cc34a5e5f171d83115");
        Add("303132333435363738393a3b3c3d3e3f", "04c723c31896059a071280e2eb27b275");
        Add("404142434445464748494a4b4c4d4e4f", "09832c1a1b6e5aa0523bd6b329e32f84");
        Add("505152535455565758595a5b5c5d5e5f", "53d100ed20fcb15b6acbbe394a4c58cf");
        Add("606162636465666768696a6b6c6d6e6f", "d0efaafb434d338545f9027f503c9fa8");
        Add("707172737475767778797a7b7c7d7e7f", "51a3408f929d38f5bcb6da2110fff3d2");
        Add("808182838485868788898a8b8c8d8e8f", "cd0c13ec5f974417c4a77e3d645d1973");
        Add("909192939495969798999a9b9c9d9e9f", "60814fdc222a908846eeb814de5e0bdb");
        Add("a0a1a2a3a4a5a6a7a8a9aaabacadaeaf", "e0323a0a4906245cc2d3ac629195e479");
        Add("b0b1b2b3b4b5b6b7b8b9babbbcbdbebf", "e7c8376d8dd54ea96c56f4ea657aae08");
        Add("c0c1c2c3c4c5c6c7c8c9cacbcccdcecf", "ba78252e1ca6b4c6e8dd741f4bbd8b8a");
        Add("d0d1d2d3d4d5d6d7d8d9dadbdcdddedf", "703eb5664803f60e613557b986c11d9e");
        Add("e0e1e2e3e4e5e6e7e8e9eaebecedeeef", "e1f8981169d98e949b1e87e9ce5528df");
        Add("f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff", "8ca1890dbfe6426841992d0fb054bb16");
    }
}

public class BitOperationSubBytesInverseData : TheoryData<string, string>
{
    public BitOperationSubBytesInverseData()
    {
        Add("637c777bf26b6fc53001672bfed7ab76", "000102030405060708090a0b0c0d0e0f");
        Add("ca82c97dfa5947f0add4a2af9ca472c0", "101112131415161718191a1b1c1d1e1f");
        Add("b7fd9326363ff7cc34a5e5f171d83115", "202122232425262728292a2b2c2d2e2f");
        Add("04c723c31896059a071280e2eb27b275", "303132333435363738393a3b3c3d3e3f");
        Add("09832c1a1b6e5aa0523bd6b329e32f84", "404142434445464748494a4b4c4d4e4f");
        Add("53d100ed20fcb15b6acbbe394a4c58cf", "505152535455565758595a5b5c5d5e5f");
        Add("d0efaafb434d338545f9027f503c9fa8", "606162636465666768696a6b6c6d6e6f");
        Add("51a3408f929d38f5bcb6da2110fff3d2", "707172737475767778797a7b7c7d7e7f");
        Add("cd0c13ec5f974417c4a77e3d645d1973", "808182838485868788898a8b8c8d8e8f");
        Add("60814fdc222a908846eeb814de5e0bdb", "909192939495969798999a9b9c9d9e9f");
        Add("e0323a0a4906245cc2d3ac629195e479", "a0a1a2a3a4a5a6a7a8a9aaabacadaeaf");
        Add("e7c8376d8dd54ea96c56f4ea657aae08", "b0b1b2b3b4b5b6b7b8b9babbbcbdbebf");
        Add("ba78252e1ca6b4c6e8dd741f4bbd8b8a", "c0c1c2c3c4c5c6c7c8c9cacbcccdcecf");
        Add("703eb5664803f60e613557b986c11d9e", "d0d1d2d3d4d5d6d7d8d9dadbdcdddedf");
        Add("e1f8981169d98e949b1e87e9ce5528df", "e0e1e2e3e4e5e6e7e8e9eaebecedeeef");
        Add("8ca1890dbfe6426841992d0fb054bb16", "f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff");
    }
}