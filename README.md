
     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


Welcome to your Node.js project on Cloud9 IDE!

This example showcases a simple express server that supports TOTP.  

## Running the server

1) Open `server.js` and start the app by clicking on the "Run" button in the top menu.

2) Alternatively you can launch the app from the Terminal:

    $ node server.js


https://totp-kwv.c9.io/new 
will create a random key and corresponding secret

https://totp-kwv.c9.io/new/userid
will create a secret for the key ‘userid’

For the prototype, these are idempotent.

When you open that page, it will share the key, secret and a QR code.   Several TOTP apps (i.e. Google Authenticator) can scan the QR code and add it to the keychain.

To validate the token the syntax is as follows:
/check/{key}?token={tokenValue}
https://totp-kwv.c9.io/check/userid?token=084337 
result will be 200 “ok” or 401: Invalid token.
 

To manually generate a token the syntax is as follows:
/get/{key}
https://totp-kwv.c9.io/get/userid 
result will be a 6 character token
