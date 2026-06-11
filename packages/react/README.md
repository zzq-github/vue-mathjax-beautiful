# React MathJax Beautiful

A React 18 formula editor component powered by MathJax.

This package is the React MVP of the MathJax Beautiful project. It only includes the formula component and intentionally does not include a rich text editor.

## Install

```bash
pnpm add react-mathjax-beautiful
```

```bash
npm install react-mathjax-beautiful
```

## Usage

```tsx
import { useState } from 'react';
import { MathjaxBeautiful } from 'react-mathjax-beautiful';
import 'react-mathjax-beautiful/style.css';

export function Demo() {
  const [open, setOpen] = useState(false);
  const [latex, setLatex] = useState('E = mc^2');

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Edit formula
      </button>
      <MathjaxBeautiful
        open={open}
        onOpenChange={setOpen}
        existingLatex={latex}
        onChange={setLatex}
        onInsert={(value) => {
          setLatex(value);
        }}
      />
    </>
  );
}
```

Inline mode:

```tsx
<MathjaxBeautiful inline defaultValue="\\frac{a}{b}" onInsert={console.log} />
```

## Local Example

The repository includes a minimal React example:

```bash
pnpm dev:react
```

Open the playground and switch to the React panel on the demo page.
