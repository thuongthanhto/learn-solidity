# Install Geth

```
# Install on Macos
brew tap ethereum/ethereum
brew install ethereum

# Install on Ubuntu Linux
sudo apt-get install ethereum

# Window -> Download binaries or build from sources
```

# Running Geth

```
geth \
    --goerli  \ # Connnect  to the Goerli network
    --http \ # Enable HTTP-RPC server
    --sycmode light \ # Light node
    --http.api "personal,net,eth,.debug" # APIs to enable

# Starts Geth on port 8545
```

# Geth Commands

```
geth accounts # Manage geth accounts
geth init # Create a new genesis block
geth help # Display help
geth attach # Interactive Javascript session

# Command line options
# geth.ethereum.org/docs/interface/command-line-options

```

# Geth JavaScript Objects

admin - Control the client node
personal - Manage accounts
txpool - Information about transaction pool
debug - Used for Geth debugging

# Geth Attach

```
geth attach http://127.0.0.1:8545
> admin.peers
[
    {id: "3431...cb8", ...},
    ...
]
> txpool.status
{
    pending: 5,
    queued: 0
}
```

# Infura Service

Node provider

- Runs a node for us
- No need to install it, manage, update, etc.
- Free for limited use

One of multiple options

- Infura: used by MetaMask
- Alchemy

Provides a URL
