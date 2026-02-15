#include <stdio.h>


void print_output_header()
{
    printf("\n~~~ AES-128 ~~~\n\n");
}

void print_overview()
{
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

int main() {
    print_output_header();
    print_overview();
}
