# escpos-parser

[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](https://opensource.org/licenses/GPL-3.0)
[![GitHub Issues](https://img.shields.io/github/issues/caferyukseloglu/escpos-parser)](https://github.com/caferyukseloglu/escpos-parser/issues)
[![GitHub Stars](https://img.shields.io/github/stars/caferyukseloglu/escpos-parser)](https://github.com/caferyukseloglu/escpos-parser/stargazers)

An npm package for parsing ESC/POS receipt data in React Native projects.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Issues](#issues)
- [Acknowledgments](#acknowledgments)

## Description

This npm package provides functionality to parse ESC/POS receipt data in React Native projects. It can be used to convert ESC/POS commands into HTML for display or further processing.

## Features

- Parse ESC/POS receipt data.
- Convert ESC/POS commands into HTML.
- Suitable for use in React Native projects.

## Installation

To install the package, use the following command:

```bash
npm install escpos-parser
```

## Usage

```javascript
// Example usage in a React Native project
import { parseEscPosFile } from 'escpos-parser';

const filePath = 'path/to/your/*.bin';
const result = parseEscPosFile(filePath);

// Do something with the result
console.log(result);
```

For more detailed usage instructions, refer to the [documentation](#).

## License

This project is licensed under the [GNU General Public License (GPL) version 3.0](LICENSE).

## Contributing

Contributions are welcome! Please read the [Contribution Guidelines](CONTRIBUTING.md) for details on how to contribute to this project.

## Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/caferyukseloglu/escpos-parser/issues).

## Acknowledgments

Special thanks to contributors and the open-source community.