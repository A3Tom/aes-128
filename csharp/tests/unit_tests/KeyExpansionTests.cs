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
    public void GivenValidRoundKey_CalculateRoundKey_ReturnsExpectedByteResult(int round, byte expected)
    {
        var actual = KeyExpansion.CalculateRoundKey(round);

        actual.Should().Be(expected);
    }
}