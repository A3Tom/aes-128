#ifndef AES_CONFIG_H
#define AES_CONFIG_H

#include <stdint.h>

typedef enum {
    MODE_OF_OP_ECB = 0,
    MODE_OF_OP_CBC,
    MODE_OF_OP_GCM
} ModeOfOperation;

typedef enum {
    KEY_SIZE_128 = 0,
    KEY_SIZE_192,
    KEY_SIZE_256
} KeySize;

typedef enum {
    LOG_LEVEL_STFU = 0,
    LOG_LEVEL_BARE_MIN,
    LOG_LEVEL_YAPPIN
} LogLevel;

typedef struct AES_Config AES_Config;

AES_Config*          load_configuration(uint8_t* key);
void                gtfo(AES_Config* config);

ModeOfOperation     config_mode_of_op(const AES_Config* config);
KeySize             config_key_size(const AES_Config* config);
LogLevel            config_log_level(const AES_Config* config);
uint8_t*            config_key(const AES_Config * config);

char*               config_key_str(const AES_Config * config);
char*               config_mode_of_op_str(const AES_Config * config);
unsigned short      config_key_size_short(const AES_Config * config);
unsigned short      config_encryption_rounds(const AES_Config * config);
unsigned short      config_word_size(const AES_Config * config);
unsigned short      config_block_size(const AES_Config * config);

#endif