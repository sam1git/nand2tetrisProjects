@R2
    M=0
@R1
    D=M
@END
    D;JEQ
@R0
    D=M
@END
    D;JEQ
@n
    M=D
(LOOP)
    @R2
        D=M
    @R1
        D=D+M
    @R2
        M=D
    @n
        MD=M-1
    @LOOP
        D;JGT
(END)
    @END
    0;JMP