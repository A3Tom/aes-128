#include <stdint.h>
#include <stdlib.h>

static const char valid_hex[] = "0123456789abcdef";

static int is_alphanumeric_ascii(uint8_t b) { 
    if (b == '\\') return 0;
    if (b == '"') return 0;

    return (b >= 32 && b <= 126); 
}

void bytes_to_ascii_printable(const uint8_t* bytes, size_t n, char* out)
{
    size_t j = 0;

    for (size_t i = 0; i < n; i++) {
        uint8_t b = bytes[i];

        if(is_alphanumeric_ascii(b)) {
            out[j++] = (char)b;
        } else if (b == '\\') {
            out[j++] = '\\';
            out[j++] = '\\';
        } else if (b == '"') {
            out[j++] = '\\';
            out[j++] = '"';
        } else {
            out[j++] = '\\';
            out[j++] = 'x';
            out[j++] = valid_hex[(b >> 4) & 0xF];
            out[j++] = valid_hex[b & 0xF];
        }
    }

    out[j] = '\0';
}