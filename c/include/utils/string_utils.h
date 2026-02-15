#ifndef STRING_UTILS_H
#define STRING_UTILS_H

#include <stdint.h>
#include <stdlib.h>

void bytes_to_ascii_printable(const uint8_t* bytes, size_t n, char* out);

#endif