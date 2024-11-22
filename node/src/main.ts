const message: string = "Remo";
const key: bigint = 57811460909138771071931939740208549692n;

// 0: Setup

// Set Mode of Operation (ECB for this outline (and ma sanity ...))
// Calculate encryption rounds
// Expand key schedule

// Encrypting the Message

// 1: Parse message to blocks

// 2: Add round key [0]

// For Each Block
// 3: Sub Bytes
// 4: Shift Rows
// 5: Mix Columns (fuckin hell... buzzin for this)
// 6: Add Round Key
// Repeat steps 3 -> 6, 10 times - omit the last column mixer