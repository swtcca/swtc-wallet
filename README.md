#The SWTC Base JavaScript Library

Basic SWTC library for development with modern javascript in concern, functions include keypairs and wallet
`swtc-base-lib` makes working with Node.js and in the browser or even certain mobile app easy and fashion.
This library currently uses the same source code from jingtum-base-lib but properly package them for convenience.

##Getting `swtc-base-lib`

**Via npm for Node.js**

```
  $ npm install swtc-base-lib
```

**Build from the source and test**

```
  $ git clone https://github.com/swtcca/swtc-base-lib.git
  $ npm install
  $ npm run build or npm run build:production
  $ npm run test
```

Then use the `dist/jingtum-base-*-.js` in your web application

##Quickstart
```
    var Wallet = require('swtc-base-lib').Wallet;
    var wallet1 = Wallet.generate();//get a wallet
    var wallet2 = Wallet.fromSecret('saai2npGJD7GKh9xLxARfZXkkc8Bf');//get a wallet by secret
    var ret = Wallet.isValidAddress('j98a2BFmVQDSCvQEQEAF9tE8JWpvLqRuUM');// whether the address is valid
    var ret = Wallet.isValidSecret('saai2npGJD7GKh9xLxARfZXk kc8Bf');// whether the secret is valid
```

## Modern usage (ES 2015 module)
```
    import { Wallet } from 'swtc-base-lib'
    var wallet1 = Wallet.generate();//get a wallet
    var wallet2 = Wallet.fromSecret('saai2npGJD7GKh9xLxARfZXkkc8Bf');//get a wallet by secret
    var ret = Wallet.isValidAddress('j98a2BFmVQDSCvQEQEAF9tE8JWpvLqRuUM');// whether the address is valid
    var ret = Wallet.isValidSecret('saai2npGJD7GKh9xLxARfZXk kc8Bf');// whether the secret is valid
```

##Signature verification
```
  var wt = new Wallet('saai2npGJD7GKh9xLxARfZXkkc8Bf');
  var pubkey = wt.getPublicKey();

  // Sign message can be an array or a hex string
  var sdata = "F95EFF5A4127E68D2D86F9847D9B6DE5C679EE7D9F3241EC8EC67F99C4CDA923";

  var sign =wt.sign(sdata);

  // Signature MUST be either:
  // 1) hex-string of DER-encoded signature; or
  // 2) DER-encoded signature as buffer; or
  // 3) object with two hex-string properties (r and s)
  // Verify the signature 
  if ( wt.verify(sdata, sign) == true)
  {
    console.log("Verify sjcl signature successfully!");
  }else
    console.log("Cannot verify sjcl sig");

```
## TODO
1. add test for functionality against jingtum-base-lib
2. reimplement in typescript for contextual hint/help

------------------------------------------------

#The Jingtum Base JavaScript Library

Basic function for development, include generate wallet, check secret and check address.

`jingtum-base-lib` connects to the Jingtum base lib and runs in Node.js as well as in the browser.

##Getting `jingtum-base-lib`

**Via npm for Node.js**

```
  $ npm install jingtum-base-lib
```

**Build from the source using `gulp`**

```
  $ git clone https://github.com/jingtum/jingtum-base-lib.git
  $ npm install
  $ gulp
```

Then use the minified `dist/jingtum-base-*-min.js` in your webpage

##Quickstart
```
    var Wallet = require('jingtum-base-lib').Wallet;
    var wallet1 = Wallet.generate();//get a wallet
    var wallet2 = Wallet.fromSecret('saai2npGJD7GKh9xLxARfZXkkc8Bf');//get a wallet by secret
    var ret = Wallet.isValidAddress('j98a2BFmVQDSCvQEQEAF9tE8JWpvLqRuUM');// whether the address is valid
    var ret = Wallet.isValidSecret('saai2npGJD7GKh9xLxARfZXk kc8Bf');// whether the secret is valid
```
##Signature verification
```
  var wt = new Wallet('saai2npGJD7GKh9xLxARfZXkkc8Bf');
  var pubkey = wt.getPublicKey();


  // Sign message can be an array or a hex string
  var sdata = "F95EFF5A4127E68D2D86F9847D9B6DE5C679EE7D9F3241EC8EC67F99C4CDA923";

  var sign =wt.sign(sdata);

  // Signature MUST be either:
  // 1) hex-string of DER-encoded signature; or
  // 2) DER-encoded signature as buffer; or
  // 3) object with two hex-string properties (r and s)
  // Verify the signature 
  if ( wt.verify(sdata, sign) == true)
  {
    console.log("Verify sjcl signature successfully!");
  }else
    console.log("Cannot verify sjcl sig");

```
## TODO
   Check if work in browser env

