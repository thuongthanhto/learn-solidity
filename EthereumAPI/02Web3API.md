# JSON-RPC API

web3_clientVersion - Get a client's version
net_peerCount - Get a number of connected peers
eth_getBlockByHash - Get a block by hash
eth_getBlockByNumber - get a block by number
eth_sendTransaction - Send a transaction to Ethereum network

# JSON-RPC Request

```
{
    "jsonrpc": "2.0",
    "method": "eth_getBlockByNumber",
    "params": ["0x1b4", true],
    "id": 10
}
```

# JSON-RPC Response

```
{
    "id": 10,
    "jsonrpc": "2.0",
    "result": {
        "hash": "0xc6...055b",
        "size": 12345,
        ...
    }
}
```
