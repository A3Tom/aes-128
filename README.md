# AES-128: Ma Implementations

This repo is a homage to the incredible minds of [Joan Daemen](https://en.wikipedia.org/wiki/Joan_Daemen), [Vincent Rijmen](https://en.wikipedia.org/wiki/Vincent_Rijmen), [Évariste Galois (what a legend)](https://en.wikipedia.org/wiki/%C3%89variste_Galois),  and all the other giants these geniuses perched on the shoulders of.  

The specific implementation found in this repo is the AES modified varient of Rijndael's algorithm using a fixed block size of 128 bits and 10 rounds with a 128 bit key. 
I might tackle adding the flexability of Rijndael's variable block size at some point but I barely have double digit neurons as it is and they've been workin overtime to get the repo this far.


> [!IMPORTANT]  
> **Self Imposed Constraints**
> 1. Absolutely **zero** code in this repo can be written by anythin that isny ma own 10 wee sausages. Nae AI, Nae copy & paste; just gid auld rawdoggin the keys.
> 2. Any sources used must be linked in the [Aknowledgements and Resources](#acknowledgements-and-resources) section


## Implementations

| Language | Readme | How fun wis it?
:-: | :-: | :-- 
Python | [README](./python/README.md) | :star::star::snake::snake::rocket:
Node | [README](./node/README.md) | N/a


## Acknowledgements and Resources

Subject | Author | Title | Type | Link
:-: | :-- | :-- | :-: | :--
Bitwise Add | OpenGenus.org | Addition Using Bitwise Operations | :book: | [Cheers mate !](https://iq.opengenus.org/addition-using-bitwise-operations/)
Block Cipher Modes | Neso Academy | Block Cipher Modes of Operation | :tv: | [Cheers mate !](https://www.youtube.com/watch?v=VmNk-6GTqRE)
Block Cipher Modes | Computerphile | Modes of Operation | :tv: | [Cheers mate !](https://www.youtube.com/watch?v=Rk0NIQfEXBA)
Python magic | GeeksForGeeks.org | Matrix transpose without Numpy | :book: | [Cheers mate !](https://www.geeksforgeeks.org/matrix-transpose-without-numpy-in-python/)
Galois Field Shit (oh my days...) | Samiam.org | Galois | :book: | [Seriously, thank you](https://samiam.org/galois.html)
Galois Field Shit (oh my days...) | SafeHouse (Medium.com) | How AES Actually Works | :book: | [Seriously, thank you](https://medium.com/codex/aes-how-the-most-advanced-encryption-actually-works-b6341c44edb9)