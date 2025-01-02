// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen
// by writing 'black' in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen by writing
// 'white' in every pixel;
// the screen should remain fully clear as long as no key is pressed.

//// Replace this comment with your code.

// KBD 24576
// SCREEN 16384 till 24575

@SCREEN
    D=A
@n
    M=D-1       // set current pixel address to @SCREEN minus 1

// black screen loop
(LOOP1)
    // switch to white screen loop if full screen is black
    @24575
        D=A
    @n
        D=M-D
    @LOOP2
        D;JGE

    // switch to white screen loop if key not pressed
    @KBD
        D=M
    @LOOP2
        D;JEQ
    @n
        AM=M+1      // fetch address of current pixel into A register and increment current pixel address
        M=-1        // set current pixel to black
    @LOOP1
        0;JMP

// white screen loop
(LOOP2)
    // switch to black screen loop if full screen is white
    @16383
        D=A
    @n
        D=M-D
    @LOOP1
        D;JLE

    // switch to black screen loop if key is pressed
    @KBD
        D=M
    @LOOP1
        D;JGT

    @n
        A=M     // fetch address of current pixel into A register
        M=0     // turn current pixel white
    @n
        M=M-1   // decrement current pixel address
    @LOOP2
        0;JMP