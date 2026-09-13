using AwesomeAssertions;
using aes128;

namespace tests.unit_tests;

[TestClass]
public sealed class KeyExpansionTests
{    
    [Theory]
    [InlineData(1,  0x01)]
    [InlineData(2,  0x02)]
    [InlineData(3,  0x04)]
    [InlineData(4,  0x08)]
    [InlineData(5,  0x10)]
    [InlineData(6,  0x20)]
    [InlineData(7,  0x40)]
    [InlineData(8,  0x80)]
    [InlineData(9,  0x1B)]
    [InlineData(10, 0x36)]
    public void GivenValidRoundKey_CalculateRoundConstant_ReturnsExpectedByteResult(int round, byte roundConstant)
    {
        byte[] expected = [roundConstant, 00, 00, 00];
        var actual = KeyExpansion.CalculateRoundConstant(round);

        actual.Should().Equal(expected);
    }

    [Fact]
    public void GivenAKnownKey_ExpandKeySchedule_ReturnsExpectedResult()
    {
        string[] expected = [
            "a0fafe1788542cb123a339392a6c7605",
            "f2c295f27a96b9435935807a7359f67f",
            "3d80477d4716fe3e1e237e446d7a883b",
            "ef44a541a8525b7fb671253bdb0bad00",
            "d4d1c6f87c839d87caf2b8bc11f915bc",
            "6d88a37a110b3efddbf98641ca0093fd",
            "4e54f70e5f5fc9f384a64fb24ea6dc4f",
            "ead27321b58dbad2312bf5607f8d292f",
            "ac7766f319fadc2128d12941575c006e",
            "d014f9a8c9ee2589e13f0cc8b6630ca6"
        ];
        var keyString = "2b7e151628aed2a6abf7158809cf4f3c";
        var key = Convert.FromHexString(keyString);
        
        var actual = KeyExpansion.ExpandKeySchedule(key);

        for (int i = 0; i < expected.Length; i++)
            actual[i].Should().Equal(Convert.FromHexString(expected[i]));
    }
}