#include <stdlib.h>
#include <assert.h>
#include <models/aes_config.h>

const unsigned short WORD_SIZE = 32;
const unsigned short BLOCK_SIZE = 8;

struct AESConfig {
    char*               key;
    ModeOfOperation     mode_of_operation;
    KeySize             key_size;
    LogLevel            log_level;
    char*               mode_of_operation_str;
    unsigned short      key_size_short;
    unsigned short      encryption_rounds;
    unsigned short      word_size;
    unsigned short      block_size;
};

int calculate_key_rounds(KeySize key_size) {
    switch (key_size) {
        case KEY_SIZE_128: return 10;
        case KEY_SIZE_192: return 12;
        case KEY_SIZE_256: return 14;
    }

    assert(!"Here, bawjaws, that key size isny an option. It's 128 | 192 | 256");
    abort();
}

short key_size_to_short(KeySize key_size) {
    switch(key_size) {
        case KEY_SIZE_128: return 128;
        case KEY_SIZE_192: return 192;
        case KEY_SIZE_256: return 256;
    }

    assert(!"Here, bawjaws, that key size isny an option. It's 128 | 192 | 256");
    abort();
}

// TODO: Implement loading fae file
AESConfig* load_configuration(char* key) {
    AESConfig* config = malloc(sizeof *config);

    config->key = key;
    config->word_size = WORD_SIZE;
    config->block_size = BLOCK_SIZE;

    config->mode_of_operation = MODE_OF_OP_ECB;
    config->key_size = KEY_SIZE_128;
    config->log_level = LOG_LEVEL_YAPPIN;

    config->encryption_rounds = calculate_key_rounds(config->key_size);
    config->key_size_short = key_size_to_short(config->key_size);

    return config;
}

void gtfo(AESConfig * config) {
    if (!config) return;

    free(config->key);
    free(config);
}

ModeOfOperation config_mode_of_op(const AESConfig * config) { return config -> mode_of_operation; }
KeySize config_key_size(const AESConfig * config) { return config -> key_size; }
LogLevel config_log_level(const AESConfig * config) { return config -> log_level; }


char* config_key(const AESConfig * config) { return config -> key; }
char* config_mode_of_op_str(const AESConfig * config) { return config -> mode_of_operation_str; }
unsigned short config_key_size_short(const AESConfig * config) { return config -> key_size_short; }
unsigned short config_encryption_rounds(const AESConfig * config) { return config -> encryption_rounds; }
unsigned short config_word_size(const AESConfig * config) { return config -> word_size; }
unsigned short config_block_size(const AESConfig * config) { return config -> block_size; }
