using AwesomeAssertions;
using aes128;

namespace tests.unit_tests;

[TestClass]
public sealed class GaloisFunctionTests
{
    [Theory]
    [ClassData<GMulData>]
    public void GivenAValidMultiplier_GMul_ReturnsExpectedResult(byte input, int multiplier, byte expected)
    {
        var actual = GaloisFunctions.GMul(input, multiplier);

        actual.Should().Be(expected);
    }
}

public class GMulData : TheoryData<byte, int, byte>
{
    public GMulData()
    {
        Add(0, 0, 0);
        Add(255, 0, 255);
        Add(255, 1, 255);
        Add(2, 2, 4);
        Add(128, 2, 0);
        Add(128, 3, 128);
    }
}
