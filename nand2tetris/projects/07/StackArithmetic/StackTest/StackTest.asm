@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.0
0;JMP
(TRUE.0)
D=-1
@MYEND.0
0;JMP
(START.0)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.0
D;JEQ
D=0
(MYEND.0)
@SP
A=M
M=D
@SP
M=M+1
@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@16
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.1
0;JMP
(TRUE.1)
D=-1
@MYEND.1
0;JMP
(START.1)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.1
D;JEQ
D=0
(MYEND.1)
@SP
A=M
M=D
@SP
M=M+1
@16
D=A
@SP
A=M
M=D
@SP
M=M+1

@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.2
0;JMP
(TRUE.2)
D=-1
@MYEND.2
0;JMP
(START.2)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.2
D;JEQ
D=0
(MYEND.2)
@SP
A=M
M=D
@SP
M=M+1
@892
D=A
@SP
A=M
M=D
@SP
M=M+1

@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.3
0;JMP
(TRUE.3)
D=-1
@MYEND.3
0;JMP
(START.3)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.3
D;JLT
D=0
(MYEND.3)
@SP
A=M
M=D
@SP
M=M+1
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@892
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.4
0;JMP
(TRUE.4)
D=-1
@MYEND.4
0;JMP
(START.4)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.4
D;JLT
D=0
(MYEND.4)
@SP
A=M
M=D
@SP
M=M+1
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.5
0;JMP
(TRUE.5)
D=-1
@MYEND.5
0;JMP
(START.5)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.5
D;JLT
D=0
(MYEND.5)
@SP
A=M
M=D
@SP
M=M+1
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1

@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.6
0;JMP
(TRUE.6)
D=-1
@MYEND.6
0;JMP
(START.6)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.6
D;JGT
D=0
(MYEND.6)
@SP
A=M
M=D
@SP
M=M+1
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@32767
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.7
0;JMP
(TRUE.7)
D=-1
@MYEND.7
0;JMP
(START.7)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.7
D;JGT
D=0
(MYEND.7)
@SP
A=M
M=D
@SP
M=M+1
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.8
0;JMP
(TRUE.8)
D=-1
@MYEND.8
0;JMP
(START.8)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.8
D;JGT
D=0
(MYEND.8)
@SP
A=M
M=D
@SP
M=M+1
@57
D=A
@SP
A=M
M=D
@SP
M=M+1

@31
D=A
@SP
A=M
M=D
@SP
M=M+1

@53
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D+M
@SP
A=M
M=D
@SP
M=M+1

@112
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
M=-M
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D&M
@SP
A=M
M=D
@SP
M=M+1

@82
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D|M
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
M=!M
@SP
M=M+1

(END)
@END
0;JMP
@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.0
0;JMP
(TRUE.0)
D=-1
@MYEND.0
0;JMP
(START.0)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.0
D;JEQ
D=0
(MYEND.0)
@SP
A=M
M=D
@SP
M=M+1
@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@16
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.1
0;JMP
(TRUE.1)
D=-1
@MYEND.1
0;JMP
(START.1)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.1
D;JEQ
D=0
(MYEND.1)
@SP
A=M
M=D
@SP
M=M+1
@16
D=A
@SP
A=M
M=D
@SP
M=M+1

@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.2
0;JMP
(TRUE.2)
D=-1
@MYEND.2
0;JMP
(START.2)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.2
D;JEQ
D=0
(MYEND.2)
@SP
A=M
M=D
@SP
M=M+1
@892
D=A
@SP
A=M
M=D
@SP
M=M+1

@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.3
0;JMP
(TRUE.3)
D=-1
@MYEND.3
0;JMP
(START.3)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.3
D;JLT
D=0
(MYEND.3)
@SP
A=M
M=D
@SP
M=M+1
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@892
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.4
0;JMP
(TRUE.4)
D=-1
@MYEND.4
0;JMP
(START.4)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.4
D;JLT
D=0
(MYEND.4)
@SP
A=M
M=D
@SP
M=M+1
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.5
0;JMP
(TRUE.5)
D=-1
@MYEND.5
0;JMP
(START.5)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.5
D;JLT
D=0
(MYEND.5)
@SP
A=M
M=D
@SP
M=M+1
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1

@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.6
0;JMP
(TRUE.6)
D=-1
@MYEND.6
0;JMP
(START.6)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.6
D;JGT
D=0
(MYEND.6)
@SP
A=M
M=D
@SP
M=M+1
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@32767
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.7
0;JMP
(TRUE.7)
D=-1
@MYEND.7
0;JMP
(START.7)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.7
D;JGT
D=0
(MYEND.7)
@SP
A=M
M=D
@SP
M=M+1
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.8
0;JMP
(TRUE.8)
D=-1
@MYEND.8
0;JMP
(START.8)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.8
D;JGT
D=0
(MYEND.8)
@SP
A=M
M=D
@SP
M=M+1
@57
D=A
@SP
A=M
M=D
@SP
M=M+1

@31
D=A
@SP
A=M
M=D
@SP
M=M+1

@53
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D+M
@SP
A=M
M=D
@SP
M=M+1

@112
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
M=-M
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D&M
@SP
A=M
M=D
@SP
M=M+1

@82
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D|M
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
M=!M
@SP
M=M+1

(END)
@END
0;JMP
@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.0
0;JMP
(TRUE.0)
D=-1
@MYEND.0
0;JMP
(START.0)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.0
D;JEQ
D=0
(MYEND.0)
@SP
A=M
M=D
@SP
M=M+1
@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@16
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.1
0;JMP
(TRUE.1)
D=-1
@MYEND.1
0;JMP
(START.1)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.1
D;JEQ
D=0
(MYEND.1)
@SP
A=M
M=D
@SP
M=M+1
@16
D=A
@SP
A=M
M=D
@SP
M=M+1

@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.2
0;JMP
(TRUE.2)
D=-1
@MYEND.2
0;JMP
(START.2)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.2
D;JEQ
D=0
(MYEND.2)
@SP
A=M
M=D
@SP
M=M+1
@892
D=A
@SP
A=M
M=D
@SP
M=M+1

@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.3
0;JMP
(TRUE.3)
D=-1
@MYEND.3
0;JMP
(START.3)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.3
D;JLT
D=0
(MYEND.3)
@SP
A=M
M=D
@SP
M=M+1
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@892
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.4
0;JMP
(TRUE.4)
D=-1
@MYEND.4
0;JMP
(START.4)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.4
D;JLT
D=0
(MYEND.4)
@SP
A=M
M=D
@SP
M=M+1
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.5
0;JMP
(TRUE.5)
D=-1
@MYEND.5
0;JMP
(START.5)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.5
D;JLT
D=0
(MYEND.5)
@SP
A=M
M=D
@SP
M=M+1
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1

@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.6
0;JMP
(TRUE.6)
D=-1
@MYEND.6
0;JMP
(START.6)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.6
D;JGT
D=0
(MYEND.6)
@SP
A=M
M=D
@SP
M=M+1
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@32767
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.7
0;JMP
(TRUE.7)
D=-1
@MYEND.7
0;JMP
(START.7)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.7
D;JGT
D=0
(MYEND.7)
@SP
A=M
M=D
@SP
M=M+1
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.8
0;JMP
(TRUE.8)
D=-1
@MYEND.8
0;JMP
(START.8)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.8
D;JGT
D=0
(MYEND.8)
@SP
A=M
M=D
@SP
M=M+1
@57
D=A
@SP
A=M
M=D
@SP
M=M+1

@31
D=A
@SP
A=M
M=D
@SP
M=M+1

@53
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D+M
@SP
A=M
M=D
@SP
M=M+1

@112
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
M=-M
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D&M
@SP
A=M
M=D
@SP
M=M+1

@82
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D|M
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
M=!M
@SP
M=M+1

(END)
@END
0;JMP
@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.0
0;JMP
(TRUE.0)
D=-1
@MYEND.0
0;JMP
(START.0)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.0
D;JEQ
D=0
(MYEND.0)
@SP
A=M
M=D
@SP
M=M+1
@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@16
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.1
0;JMP
(TRUE.1)
D=-1
@MYEND.1
0;JMP
(START.1)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.1
D;JEQ
D=0
(MYEND.1)
@SP
A=M
M=D
@SP
M=M+1
@16
D=A
@SP
A=M
M=D
@SP
M=M+1

@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.2
0;JMP
(TRUE.2)
D=-1
@MYEND.2
0;JMP
(START.2)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.2
D;JEQ
D=0
(MYEND.2)
@SP
A=M
M=D
@SP
M=M+1
@892
D=A
@SP
A=M
M=D
@SP
M=M+1

@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.3
0;JMP
(TRUE.3)
D=-1
@MYEND.3
0;JMP
(START.3)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.3
D;JLT
D=0
(MYEND.3)
@SP
A=M
M=D
@SP
M=M+1
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@892
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.4
0;JMP
(TRUE.4)
D=-1
@MYEND.4
0;JMP
(START.4)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.4
D;JLT
D=0
(MYEND.4)
@SP
A=M
M=D
@SP
M=M+1
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.5
0;JMP
(TRUE.5)
D=-1
@MYEND.5
0;JMP
(START.5)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.5
D;JLT
D=0
(MYEND.5)
@SP
A=M
M=D
@SP
M=M+1
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1

@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.6
0;JMP
(TRUE.6)
D=-1
@MYEND.6
0;JMP
(START.6)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.6
D;JGT
D=0
(MYEND.6)
@SP
A=M
M=D
@SP
M=M+1
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@32767
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.7
0;JMP
(TRUE.7)
D=-1
@MYEND.7
0;JMP
(START.7)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.7
D;JGT
D=0
(MYEND.7)
@SP
A=M
M=D
@SP
M=M+1
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.8
0;JMP
(TRUE.8)
D=-1
@MYEND.8
0;JMP
(START.8)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.8
D;JGT
D=0
(MYEND.8)
@SP
A=M
M=D
@SP
M=M+1
@57
D=A
@SP
A=M
M=D
@SP
M=M+1

@31
D=A
@SP
A=M
M=D
@SP
M=M+1

@53
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D+M
@SP
A=M
M=D
@SP
M=M+1

@112
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
M=-M
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D&M
@SP
A=M
M=D
@SP
M=M+1

@82
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D|M
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
M=!M
@SP
M=M+1

(END)
@END
0;JMP
@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.0
0;JMP
(TRUE.0)
D=-1
@MYEND.0
0;JMP
(START.0)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.0
D;JEQ
D=0
(MYEND.0)
@SP
A=M
M=D
@SP
M=M+1
@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@16
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.1
0;JMP
(TRUE.1)
D=-1
@MYEND.1
0;JMP
(START.1)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.1
D;JEQ
D=0
(MYEND.1)
@SP
A=M
M=D
@SP
M=M+1
@16
D=A
@SP
A=M
M=D
@SP
M=M+1

@17
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.2
0;JMP
(TRUE.2)
D=-1
@MYEND.2
0;JMP
(START.2)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.2
D;JEQ
D=0
(MYEND.2)
@SP
A=M
M=D
@SP
M=M+1
@892
D=A
@SP
A=M
M=D
@SP
M=M+1

@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.3
0;JMP
(TRUE.3)
D=-1
@MYEND.3
0;JMP
(START.3)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.3
D;JLT
D=0
(MYEND.3)
@SP
A=M
M=D
@SP
M=M+1
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@892
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.4
0;JMP
(TRUE.4)
D=-1
@MYEND.4
0;JMP
(START.4)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.4
D;JLT
D=0
(MYEND.4)
@SP
A=M
M=D
@SP
M=M+1
@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@891
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.5
0;JMP
(TRUE.5)
D=-1
@MYEND.5
0;JMP
(START.5)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.5
D;JLT
D=0
(MYEND.5)
@SP
A=M
M=D
@SP
M=M+1
@32767
D=A
@SP
A=M
M=D
@SP
M=M+1

@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.6
0;JMP
(TRUE.6)
D=-1
@MYEND.6
0;JMP
(START.6)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.6
D;JGT
D=0
(MYEND.6)
@SP
A=M
M=D
@SP
M=M+1
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@32767
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.7
0;JMP
(TRUE.7)
D=-1
@MYEND.7
0;JMP
(START.7)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.7
D;JGT
D=0
(MYEND.7)
@SP
A=M
M=D
@SP
M=M+1
@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@32766
D=A
@SP
A=M
M=D
@SP
M=M+1

@START.8
0;JMP
(TRUE.8)
D=-1
@MYEND.8
0;JMP
(START.8)
@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@TRUE.8
D;JGT
D=0
(MYEND.8)
@SP
A=M
M=D
@SP
M=M+1
@57
D=A
@SP
A=M
M=D
@SP
M=M+1

@31
D=A
@SP
A=M
M=D
@SP
M=M+1

@53
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D+M
@SP
A=M
M=D
@SP
M=M+1

@112
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D-M
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
M=-M
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D&M
@SP
A=M
M=D
@SP
M=M+1

@82
D=A
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
D=M
@R13
M=D
@SP
M=M-1
A=M
D=M
@R13
D=D|M
@SP
A=M
M=D
@SP
M=M+1

@SP
M=M-1
A=M
M=!M
@SP
M=M+1

(END)
@END
0;JMP
