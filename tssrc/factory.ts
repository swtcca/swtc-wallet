import SwtcChains from "swtc-chains"
import KeyPairs from "swtc-keypairs"
const getChain = (chain_name = "jingtum") =>
  SwtcChains.filter(
    chain =>
      chain.code.toLowerCase() === chain_name.toLowerCase() ||
      chain.currency.toUpperCase() === chain_name.toUpperCase()
  )[0]

const Factory = token_or_chain => {
  const chain = getChain(token_or_chain)
  if (!chain) {
    throw Error("token or chain not supported")
  }

  const KeyPair = KeyPairs(chain.code)

  return class Wallet {
    public static token = chain.currency
    public static chain = chain.code
    public static KeyPair = KeyPair
    public static generate(options = {}) {
      const secret = KeyPair.generateSeed(options)
      const keypair = KeyPair.deriveKeyPair(secret)
      const address = KeyPair.deriveAddress(keypair.publicKey)
      return {
        secret,
        address
      }
    }

    public static fromSecret(secret) {
      try {
        const keypair = KeyPair.deriveKeyPair(secret)
        const address = KeyPair.deriveAddress(keypair.publicKey)
        return {
          secret,
          address
        }
      } catch (err) {
        return null
      }
    }

    public static isValidAddress(address) {
      return KeyPair.checkAddress(address)
    }

    public static isValidSecret(secret) {
      try {
        KeyPair.deriveKeyPair(secret)
        return true
      } catch (err) {
        return false
      }
    }

    public _keypairs
    public _secret
    constructor(secret) {
      try {
        this._keypairs = KeyPair.deriveKeyPair(secret)
        this._secret = secret
      } catch (err) {
        this._keypairs = null
        this._secret = null
      }
    }

    /**
     * get wallet address
     * @returns {*}
     */
    public address() {
      if (!this._keypairs) return null
      const address = KeyPair.deriveAddress(this._keypairs.publicKey)
      return address
    }

    /**
     * get wallet secret
     * @returns {*}
     */
    public secret() {
      if (!this._keypairs) return null
      return this._secret
    }

    public toJson() {
      if (!this._keypairs) return null
      return {
        secret: this.secret(),
        address: this.address()
      }
    }

    /*
     * Get the public key from key pair
     * used for local signing operation.
     */
    public getPublicKey() {
      if (!this._keypairs) return null
      return this._keypairs.publicKey
    }

    /**
     * sign message with wallet privatekey
     * @param message
     * @returns {*}
     */
    public sign(message) {
      if (!message) return null
      if (!this._keypairs) return null
      const privateKey = this._keypairs.privateKey
      // Export DER encoded signature in Array
      return KeyPair.signHash(message, privateKey)
    }

    /**
     * verify signature with wallet publickey
     * @param message
     * @param signature
     * @returns {*}
     */
    public verify(message, signature) {
      if (!this._keypairs) return null
      const publicKey = this.getPublicKey()
      return KeyPair.verifyHash(message, signature, publicKey)
    }

    /**
     * sign message with wallet privatekey
     * Export DER encoded signature in Array
     * @param message
     * @returns {*}
     */
    public signTx(message) {
      if (!message) return null
      if (!this._keypairs) return null
      const privateKey = this._keypairs.privateKey
      // Export DER encoded signature in Array
      return KeyPair.signTx(message, privateKey)
    }

    /**
     * verify signature with wallet publickey
     * @param message
     * @param signature
     * @returns {*}
     */
    public verifyTx(message, signature) {
      if (!this._keypairs) return null
      const publicKey = this.getPublicKey()
      return KeyPair.verifyTx(message, signature, publicKey)
    }
  }
}

export { Factory }
