using aes128;
using AwesomeAssertions;

namespace tests.unit_tests;

public class AESCoreTests
{
    [Theory]
    [ClassData<AESCoreShiftRowsData>]
    public void GivenABlock_ShiftRows_RotatesTheCorrectRow(string input, string expectedString)
    {
        var actual = Convert.FromHexString(input);
        var expected = Convert.FromHexString(expectedString);

        AESCore.ShiftRows(actual);

        actual.Should().Equal(expected);
    }
}

public class AESCoreShiftRowsData : TheoryData<string, string>
{
    public AESCoreShiftRowsData()
    {
        // Data from documentation/AES_Core128.pdf
        // Plaintext 1 example: {Substitution, ShiftRow}
        Add("090862bf6f28e3042c747feeda4a6a47", "09287f476f746abf2c4a6204da08e3ee");
        Add("894d9b03c0b512212e56883c6038534a", "89b5884ac05653032e389b21604d123c");
        Add("540d10b9b3fe64af68b0611ed6d3ea41", "54fe6141b3b0eab968d310afd60d641e");
        Add("913ecede3a2c982ec0f976daa9f25676", "912c76763af956dec0f2ce2ea93e98da");
        Add("3aef9fcf1b06e312baa598634fa9431e", "3a06981e1ba543cfbaa99f124fefe363");
        Add("71d60dfa232edfdde8d36c213f31bd5c", "712e6c5c23d3bdfae8310ddd3fd6df21");
        Add("bde3ba7df36df4d4dc561216f1666568", "bd6d1268f356657ddc66bad4f1e3f416");
        Add("983ceaff09b5fd1811a9543a7f14c510", "98b5541009a9c5ff1114ea187f3cfd3a");
        Add("830eb4edff338109c115f05e7791a6af", "8333f0afff15a6edc191b409770e815e");
        Add("ea05c6e9c4c3e33b4994823192a1131c", "eac3821cc49413e949a1c63b9205e331");
    }
}