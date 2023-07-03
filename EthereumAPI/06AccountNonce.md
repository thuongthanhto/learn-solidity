# Account Nonce

Unique ID of a transaction from an account

- Prevents double-spend
- Set a new nonce to send a new transaction

Confusing topic

- Source of many issues
- Was handled for us by the software so far
- Might become an issue with more complex software

# Getting expected Nonce Value

```
const nonce = await web3.getTransactionCount(senderAddress);
contract.methods.vote(1)
    .send({
        from: senderAddress,
        gas: 1500000,
        nonce: nonce;
    })
```

# Nonce Management

Can get complicated

- getTransactionCount may return outdated result
- Multiple machines can send a request at the same time

Solution

- Track nonce per account in a local database
- Ensure that each Ethereum transaction gets a different nonce
