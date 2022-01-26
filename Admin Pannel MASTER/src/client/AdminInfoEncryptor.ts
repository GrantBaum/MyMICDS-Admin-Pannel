import * as fs from 'fs';
import * as crypto from 'crypto';

export default class Hasher {
    constructor(public _algorithm : string, public _encoding = 'hex'){

    }

    // Reads a string value
    // Returns a hash
    readString(value : string) : string {
        let _hash = this.createHash();
        _hash.update(value);
        return _hash.digest(this._encoding);
    }

    // Reads an file from path
    // Returns a Promise with hash as the response
    readFile(filePath : string) : Promise<any>{
        let p = new Promise((resolve, reject) => {
            let _hash = this.createHash();
            let reader = fs.createReadStream(filePath);
            reader.pipe(_hash)
                .on('finish', () => {
                    resolve(_hash.read());
                });
        });

        return p;
    }

    // Initializes a new hash everytime
    // To avoid exception of it already being digested (finalized)
    // See: https://github.com/nodejs/node/blob/master/src/node_crypto.cc#L3872
    private createHash() : any{
        let _hash = crypto.createHash(this._algorithm);
        _hash.setEncoding(this._encoding);
        return _hash;
    }
}
