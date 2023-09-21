## binpackingjs

forked from [binpackingjs](https://github.com/olragon/binpackingjs) - removed 3d packing and fixed valid free rectangles being removed
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

binpackingjs is 2D well tested JavaScript Bin Packing library.

- 2D Bin Packing Code is porting from ruby package [bin_packing](https://github.com/mak-it/bin_packing) which is based on [this paper](http://clb.demon.fi/files/RectangleBinPack.pdf).

## Install

`yarn add binpackingjs`

## 2D Bin Packing

[2D Bin Packing Demo](https://codesandbox.io/s/XVJnv7Yg)

[![2D Bin Packing](/screenshot.png)](https://codesandbox.io/s/XVJnv7Yg)

```
const BinPacking2D = require('binpackingjs').BP2D;
const { Bin, Box, Packer } = BinPacking2D;

let bin_1 = new Bin(100, 50);
let bin_2 = new Bin(50, 50);
let boxes = [
  new Box(15, 10), // Should be added last (smaller)
  new Box(50, 45), // Fits in bin_2 better than in bin_1
  new Box(40, 40),
  new Box(200, 200), // Too large to fit
];
let packer = new Packer([bin_1, bin_2]);
let packed_boxes = packer.pack(boxes);

packed_boxes.length
=> 3
bin_1.boxes.length
=> 2
bin_1.boxes[0].label
=> '40x40 at [0x0]'
bin_1.boxes[0].label
=> '40x40 at [0x0]'
bin_1.boxes[1].label
=> '15x10 at [0x40]'
bin_2.boxes.length
=> 1
bin_2.boxes[0].label
=> '50x45 at [0x0]'
boxes[3].packed
=> false
```

## License

MIT
