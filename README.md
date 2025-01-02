# nand2tetris Projects in JavaScript

This repository contains a series of projects I completed as part of the **nand2tetris** course, implemented in **JavaScript**. The projects span several key components in computer science and software engineering, including compiler construction, virtual machine translation, and game development.

### Projects Overview

1. **LL(1) Parser & Compiler**
2. **Assembler**
3. **VM Translator**
4. **Pong Game**

### Table of Contents

- [Introduction](#introduction)
- [Projects](#projects)
  - [LL(1) Parser & Compiler](#ll1-parser--compiler)
  - [Assembler](#assembler)
  - [VM Translator](#vm-translator)
  - [Pong Game](#pong-game)
- [Running the Projects](#running-the-projects)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Introduction

The **nand2tetris** course teaches how to build a modern computer system from the ground up, starting with logic gates and ending with building a working computer that can run high-level programs. For each project, I implemented different components of the computer in JavaScript, including the **compiler**, **assembler**, **virtual machine translator**, and even built a classic **Pong** game to simulate graphical output.

The goal of this repository is to demonstrate the full stack of a computer system—starting with low-level assembly and moving up to high-level software—by building a **working computer**.

---

## Projects

### LL(1) Parser & Compiler

This project implements an **LL(1) parser** and **compiler** that takes high-level language input and generates equivalent assembly code. The parser uses a recursive descent approach and is designed to parse a subset of the **Hack** language, which is the language used by the **nand2tetris** course.

- **Input**: High-level source code written in a subset of the Hack language.
- **Output**: Assembly code that can be executed on the Hack computer.

**Features**:
- Tokenizes and parses expressions, commands, and statements.
- Generates the appropriate assembly code instructions (C-instructions and A-instructions).
- Handles control flow (if-else, loops), functions, and basic arithmetic operations.

### Assembler

This project implements a **Hack assembler**, which converts Hack assembly code (written in the assembly language defined in nand2tetris) into binary machine code that can be executed on the Hack computer.

- **Input**: Assembly code for the Hack computer.
- **Output**: Binary machine code (.hack files).

**Features**:
- Translates Hack assembly language instructions into binary.
- Supports symbolic constants, labels, and variables.
- Handles address allocation for variables and labels.

### VM Translator

The **VM Translator** converts programs written in the **Hack virtual machine language** (a simple stack-based language) into Hack assembly language.

- **Input**: Virtual Machine code (typically with `.vm` extension).
- **Output**: Hack assembly code (with `.asm` extension).

**Features**:
- Translates arithmetic and logical operations (add, sub, neg, eq, gt, lt, and).
- Handles stack operations like push, pop, function calls, and returns.
- Supports multiple VM files and generates the corresponding assembly code.

### Pong Game

A fun project where I implemented the classic **Pong game** using JavaScript, simulating the graphical output of the Hack computer.

- **Input**: User-controlled paddles using keyboard (left and right arrow keys).
- **Output**: A graphical representation of the Pong game in a web browser.

**Features**:
- Ball movement with bouncing physics.
- Real-time score tracking and game reset when a player wins.

---

## Running the Projects

To run the individual projects in this repository, follow the instructions below.

### Prerequisites

- **Node.js** and **npm** should be installed on your machine. You can download and install Node.js from [here](https://nodejs.org/).

### Project Setup

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/sam1git/nand2tetrisProjects.git
   cd nand2tetrisProjects
