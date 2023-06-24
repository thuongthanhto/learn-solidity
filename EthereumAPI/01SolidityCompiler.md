# Compiler's Output

Bytecode - Bycode executed by Ethereum nodes
Application Binary Interface (ABI) - What methods a contract has

```
# Install using NPM
npm i -g solc

solcjs
    --bin \ # Generate bytecode
    --abi \ # Generate ABI
    --base-path . \ # Path where contracts a located
    Voter.sol # Contracts to compile
```
