# Atomic Execution

Transactions execution is atomic

    - Either completes and changes state
    - Or does not affect a smart contract

Transaction are executed on after the other

    - Don't run in parallel
    - Cannot interfere with each other

# Transaction Structure

Nonce - Transaction number
Gas Limit - Payment for executing a transaction
Destination - Receiver's address
Amount - Amount of Ether
v, r, s - Signature
init or data - bytecode or method call

# Block Fields

- Block number
- Parent's block hash
- Executed transactions
- New state of the network (Patrica tree)
- Timestamp

# Contracts Limitation

Any participant can validate transactions
Contracts execution is deterministic

    - State change depends on the input

Contract cannot

    - Access outside resources

Solution for this

    - Blockchain oracles
    - Chainlink company
