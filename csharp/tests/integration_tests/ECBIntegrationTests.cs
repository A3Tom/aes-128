using aes128;
using AwesomeAssertions;

namespace tests.integration_tests;

public class ECBIntegrationTests
{
    [Theory]
    [ClassData<EncryptPlainTextBlockECBData>]
    public void GivenAKeyAndPlainText_EncryptPlainTextECB_CorrectlyEncryptsToCipherText(string keyString, string[] plainText, string[] expected)
    {
        var key = Convert.FromHexString(keyString);
        var actual = AESCore.EncryptPlainTextECB(key, plainText);

        for (int i = 0; i < actual.Length; i++)
            actual[i].Should().Equal(Convert.FromHexString(expected[i]));
    }
}

public class EncryptPlainTextBlockECBData : TheoryData<string, string[], string[]>
{
    private static readonly string _key = "2b7e151628aed2a6abf7158809cf4f3c";
    private static readonly string[] _plainText = [
        "6bc1bee22e409f96e93d7e117393172a",
        "ae2d8a571e03ac9c9eb76fac45af8e51",
        "30c81c46a35ce411e5fbc1191a0a52ef",
        "f69f2445df4f9b17ad2b417be66c3710"
    ];
    private static readonly string[] _expected = [
        "3ad77bb40d7a3660a89ecaf32466ef97",
        "f5d3d58503b9699de785895a96fdbaaf",
        "43b1cd7f598ece23881b00e3ed030688",
        "7b0c785e27e8ad3f8223207104725dd4"
    ];

    public EncryptPlainTextBlockECBData()
    {
        Add(_key, _plainText, _expected);
    }
}