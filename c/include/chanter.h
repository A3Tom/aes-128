#ifndef CHANTER_H
#define CHANTER_H

#include <models/aes_config.h>
#include <models/aes_args.h>

void print_configuration(AES_Config* cfg, char* message);
void print_overview();
void print_args(AES_Args* args);

#endif