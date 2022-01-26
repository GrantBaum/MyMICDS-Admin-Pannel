//@todo make this automatically decrypt whem am admin logs in
import crypto from 'crypto';

export class Endecryptor{
    private secret: string;
    private method: string;
    private temp_iv: string;
    temp_hmac: string = "";
    temp_encrypted: string = "";
    temp_decrypted: string = "";
    valid_TS_interval: number;

    /**
     * Sets object properties that will be used for decryption/encryption
     * @param encryption_secret String made of 32 characters that will be used for decryption/encryption
     * @param encryption_method Method for decryption/encryption
     * @param decryption_valid_TS_interval Time in seconds to check if message is too old
     */
    constructor(encryption_secret: string, encryption_method: string, decryption_valid_TS_interval: number = 60) {
        if (encryption_secret.length != 32) {
            throw 'Secret key must be string of 32 characters!\n - Provided secret key does not meet criteria.';
        } else if (typeof(encryption_method) !== 'string') {
            throw 'Encryption method must be string!\n - Provided method does not meet criteria.';
        } else {
            this.secret = encryption_secret;
            this.method = encryption_method;
        }
        this.valid_TS_interval = decryption_valid_TS_interval;
        this.temp_iv = crypto.randomBytes(16).toString('hex').substr(0,16);
    }

    /**
     * Encrypts message and sets temp_encrypted, temp_hmac properties and new random temp_iv property for next encryption
     * @param message Plain text
     */
    encrypt (message: string) {
        var encryptor = crypto.createCipheriv(this.method, this.secret, this.temp_iv);
        this.temp_encrypted = Buffer.from(this.temp_iv).toString('base64') + encryptor.update(message, 'utf8', 'base64') + encryptor.final('base64');
        this.temp_hmac = crypto.createHmac('md5', this.secret).update(this.temp_encrypted).digest('hex');
        this.temp_iv = crypto.randomBytes(16).toString('hex').substr(0,16);
    }

    /**
     * Encrypts message text with current time added at the beginning
     * @param message Message content that will be encrypted
     */
    encryptWithTS (message: string) {
        this.encrypt(new Date().toISOString().substr(0,19) + message);
    }

    /**
     * Decrypts encrypted message and checks if authorisation signature is valid
     * @param message Encrypted message text
     * @param hmac Used for signature check
     * @returns True if successful, false if not
     */
    decrypt (message: string, hmac: string) {
        if (crypto.createHmac('md5', this.secret).update(message).digest('hex') == hmac) {
            var iv = Buffer.from(message.substr(0, 24), 'base64').toString();
            var decryptor = crypto.createDecipheriv(this.method, this.secret, iv);
            this.temp_decrypted = decryptor.update(message.substr(24), 'base64', 'utf8') + decryptor.final('utf8');
            return true;
        }
        console.log('Bad signature.');
        return false;
    }

    /**
     * Decrypts encrypted message and checks signature & time when it was sent
     * @param message Encrypted message text
     * @param hmac Used for signature check
     * @returns True if successful, false if not
     */
    decryptAndValidateTS (message: string, hmac: string) {
        if(this.decrypt(message, hmac)){
            var currentTS = new Date().getTime();
            var messageTS = new Date(this.temp_decrypted.substr(0,19) + 'Z').getTime();
            if (Math.round((currentTS - messageTS) / 1000) <= this.valid_TS_interval) {
                this.temp_decrypted = this.temp_decrypted.substr(19);
                return true;
            }
            console.log('Old timestamp.');
        }
        return false;
    }

    /**
     * Decrypts encrypted message and returns result
     * @param message Encrypted message text
     * @param hmac Used for signature check
     * @param toJson If true return json object else return decrypted string
     * @returns decrypted content or false if not successful
     */
    getDecrypted(message: string, hmac: string, toJson = false): {}|string|false {
        if (this.decryptAndValidateTS(message, hmac)) {
            if (toJson){
                try {
                    return JSON.parse(this.temp_decrypted);
                } catch(e) {
                    console.log(e);
                    return false;
                }
            } else {
                return this.temp_decrypted;
            }
        }
        return false;
    }

}
