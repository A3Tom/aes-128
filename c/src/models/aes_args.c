#include <models/aes_args.h>

bool is_message_arg(char* arg) { return strcmp(arg, "-m") == 0; }

AES_Args* parse_args(int argc, char* argv[]) {
    AES_Args* args = malloc(sizeof *args);

    for (int i = 1; i < argc; i++) {
        if(is_message_arg(argv[i])) { 
            args->message = argv[i+1];
        }
    }

    return args;
}