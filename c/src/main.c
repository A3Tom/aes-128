#include <stdlib.h>
#include <stdio.h>

#include <chanter.h>

#include <models/aes_config.h>
#include <models/aes_args.h>

uint8_t KEY[16] = {
    0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
    0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c
};

int main(int argc, char *argv[]) {
    AES_Args* args = parse_args(argc, argv);
    AES_Config* cfg = load_configuration(KEY);

    print_configuration(cfg, args->message);
}
