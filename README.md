> cs-mask

## Install

```
npm install cs-mask

yarn add cs-mask
```

## Usage

```js
const maskLib = require('cs-mask');

const valueMask = maskLib.Mask(1233, '9-99-0');
console.log(valueMask);

const valueNotMask = maskLib.UnMask(valueMask);
console.log(valueNotMask);
```

```js
import { Mask, UnMask } from 'cs-mask';
const patterns = ['999.999.999-99', '99.999.999/9999-99'];

Mask('12345678901', patterns);
// 123.456.789-01
Mask('12345678000106', patterns);
// 12.345.678/0001-06
```

### Patterns:

| Code  | Significado      |
| ----- | ---------------- |
| **9** | Números (0 a 9)  |
| **A** | Letras (A a Z)   |
| **S** | Números e letras |

## License

MIT © Cosmo Guedes
