#ifndef AES_ARGS_H
#define AES_ARGS_H

#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

typedef struct AES_Args {
    char*       message;
} AES_Args;

AES_Args* parse_args(int argc, char* argv[]);

#endif
