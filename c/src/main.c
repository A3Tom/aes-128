#include <stdio.h>
#include <chanter.h>
#include <models/aes_config.h>

// const message: string = "AES-128 is class";
// const key: bigint = 57811460909138771071931939740208549692n;
char* MESSAGE = "AES-128 is class";

uint8_t KEY[16] = {
    0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
    0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c
};

int main() {
    AESConfig* cfg = load_configuration(KEY);

    print_configuration(cfg, MESSAGE);

    print_overview();
}
