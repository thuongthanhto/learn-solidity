# JavaScript Promises

Lot of asynchronous code ahead!

- Sending transactions
- Calling methods

Learn mordern async idioms in JavaScript

Can skip if you are proficient with

- Promises
- Async/Await

# Asynchronous Method

```
// Send a GET HTTP request
// url - a URL to send request to
// onSuccessFunc - function to call on success
// onFailureFunc - function to call on error
function get(url, onSuccessFunc, onFailureFunc) {
    ...
}
```

# Asynchronous Code with Promises

```
const promise = get("http://...");

promise
    .then(function (data) {
        ...
    })
    .catch(function (error) {
        ...
    });

const promise = get("http://eth.com/transactions/last");

promise
    .then(function (lastTransaction) {
        return get(data["prev"]["url"]); // Returns a Promise
    })
    .then(function (prevTransaction) {
        // Receives data from previous Promise
    })
    .catch(function (error) {
        ...
    });

```

# Promises in the Nutshell

May not have a result now, will notify when it has it
Cannot get reply directly from it
then - called when a result is available
catch - called if an error has occurred

# async/await

```
async function getPrevTransaction() {
    try {
        const last = await get("http://eth.com/transactions/last");
        const prev = await get(last["prev"]["url"]);

        return prev;
    } catch (error) {

    }
}

const prev = getPrevTransaction(); // Returns Promise
```
