#ifndef AES_CONFIG_H
#define AES_CONFIG_H

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

typedef struct AESConfig AESConfig;

AESConfig*          load_configuration(char* key);
void                gtfo(AESConfig* config);

ModeOfOperation     config_mode_of_op(const AESConfig* config);
KeySize             config_key_size(const AESConfig* config);
LogLevel            config_log_level(const AESConfig* config);

char*               config_key(const AESConfig * config);
char*               config_mode_of_op_str(const AESConfig * config);
unsigned short      config_key_size_short(const AESConfig * config);
unsigned short      config_encryption_rounds(const AESConfig * config);
unsigned short      config_word_size(const AESConfig * config);
unsigned short      config_block_size(const AESConfig * config);

#endif