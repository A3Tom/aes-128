#include <stdio.h>
#include <models/aes_config.h>

const char* CONFIG_BORDER = "\n**************************************************************\n";

void print_border() { printf("%s", CONFIG_BORDER); }

void print_configuration(AESConfig* cfg, char* message) {
    print_border();
    printf("  Alg: %s AES-%i (%i rounds)\n", config_mode_of_op_str(cfg), config_key_size_short(cfg), config_encryption_rounds(cfg));
    printf("  Key: %s\n", config_key_str(cfg));
    printf("  Hex: ------------\n");
    printf("  Msg: %s\n", message);
    print_border();
}

void print_overview() {
    printf("  ~ Overview ~\n");
    printf("Step 0: Set Variables\n");
    printf("Step 1: Key Expansion\n");
    printf("Step 2: Apply Round Key 0\n");
    printf("Step 3: for each round:\n");
    printf("   3.1: Sub Bytes\n");
    printf("   3.2: Shift Rows\n");
    printf("   3.3: Mix Columns\n");
    printf("   3.4: Apply Round Key\n");
    printf("Step 4: Final Round\n");
    printf("   4.1: Sub Bytes\n");
    printf("   4.2: Shift Rows\n");
    printf("   4.3: Add Round Key\n");
}
