#include <stdint.h>
#include <stdlib.h>
#include <assert.h>
#include <models/aes_config.h>
#include <utils/string_utils.h>

const unsigned short WORD_SIZE = 32;
const unsigned short BLOCK_SIZE = 8;

struct AES_Config {
    uint8_t*            key;
    ModeOfOperation     mode_of_operation;
    KeySize             key_size;
    LogLevel            log_level;
    char*               key_str;
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

char* mode_of_op_to_string(ModeOfOperation mode_of_op) {
    switch(mode_of_op) {
        case MODE_OF_OP_ECB: return "ECB";
        case MODE_OF_OP_CBC: return "CBC";
        case MODE_OF_OP_GCM: return "GCM";
    }

    assert(!"Calm it, it's a code book, block chain or Galois Counter Mode n that's yer lot");
    abort();
}

// TODO: Implement loading fae file
AES_Config* load_configuration(uint8_t * key) {
    AES_Config* config = (AES_Config*)malloc(sizeof *config);

    config->key = key;
    config->word_size = WORD_SIZE;
    config->block_size = BLOCK_SIZE;

    config->mode_of_operation = MODE_OF_OP_ECB;
    config->key_size = KEY_SIZE_128;
    config->log_level = LOG_LEVEL_YAPPIN;

    config->encryption_rounds = calculate_key_rounds(config->key_size);
    config->key_size_short = key_size_to_short(config->key_size);
    config->mode_of_operation_str = mode_of_op_to_string(config->mode_of_operation);

    char ascii_buffer[4*16 + 1];
    bytes_to_ascii_printable(key, 16, ascii_buffer);
    config->key_str = ascii_buffer;

    return config;
}

void gtfo(AES_Config * config) {
    if (!config) return;

    free(config);
}

ModeOfOperation config_mode_of_op(const AES_Config * config) { return config -> mode_of_operation; }
KeySize config_key_size(const AES_Config * config) { return config -> key_size; }
LogLevel config_log_level(const AES_Config * config) { return config -> log_level; }
uint8_t* config_key(const AES_Config * config) { return config -> key; }

char* config_key_str(const AES_Config * config) { return config -> key_str; }
char* config_mode_of_op_str(const AES_Config * config) { return config -> mode_of_operation_str; }
unsigned short config_key_size_short(const AES_Config * config) { return config -> key_size_short; }
unsigned short config_encryption_rounds(const AES_Config * config) { return config -> encryption_rounds; }
unsigned short config_word_size(const AES_Config * config) { return config -> word_size; }
unsigned short config_block_size(const AES_Config * config) { return config -> block_size; }
