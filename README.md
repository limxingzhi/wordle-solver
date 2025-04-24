# wordle-solver

Usage:

- put all of the grey letters under the `-b` flag like `-b aros`
- put all of the green letters under the `-g` flag like `-g ....e`
  - you can have empty trailing letters. E.g. `-g ..e` when the 3rd letter is a green `e`
- put all of your yellow letters under the `-y` flag, with a space between each. Like `-y i2 i1` when then value of `i` is yellow at position 3 and 2 (the value to use is zero indexed)

Sample flow:

for "genie"

### First Entry
- no params

```bash
$ deno run --allow-all wordle-solver.ts
arose
```

### Second Entry
- black `aros`
- green `....e` (`e` at 5th position, the rest unknown)

```bash
$ deno run --allow-all wordle-solver.ts -b aros -g ....e
utile
```

### Third Entry
- black `arosutl`
- green `....e` (`e` at 5th position, the rest unknown)
- yellow `-y i2`

```bash
$ deno run --allow-all wordle-solver.ts -b arosutl -g ....e -y i2
yince
```

### Fourth Entry
- black `arosutlyc`
- green `....e` (`e` at 5th position, the rest unknown)
- yellow `-y i2 i1`

```bash
$ deno run --allow-all wordle-solver.ts -b arosutlyc -g ..n.e -y i2 i1
genie
```

### Full flow

```sh
$ deno run --allow-all wordle-solver.ts
arose

$ deno run --allow-all wordle-solver.ts -b aros -g ....e
utile

$ deno run --allow-all wordle-solver.ts -b arosutl -g ....e -y i2
yince

$ deno run --allow-all wordle-solver.ts -b arosutlyc -g ..n.e -y i2 i1
genie
```
