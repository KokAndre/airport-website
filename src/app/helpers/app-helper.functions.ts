import { EncryptionKeys } from "../enums/app.enums";
import * as CryptoJS from 'crypto-js';

export class SessionStorageHelper {
    static storeItem(key: string, value: string) {
        sessionStorage.setItem(key, value);
        return sessionStorage.getItem(key);
    }

    static getItem(key: string) {
        return sessionStorage.getItem(key);
    }

    static removeItem(key: string) {
        sessionStorage.removeItem(key);
    }

    static clearAllItems() {
        sessionStorage.clear();
    }

    static storeArrayItem(key: string, value: any) {
        let item = this.getItem(key);
        // Does not yet exist - Create it
        if (!item) {
            sessionStorage.setItem(key, '[' + value + ']');
        } else {
            item = item.replace('[', '').replace(']', '') + ', ' + value;
            // Append to the list
            sessionStorage.setItem(key, '[' + item + ']');
        }
    }

    static getArrayItem(key: any) {
        const item = sessionStorage.getItem(key);

        return JSON.parse(item ? item : '') as Array<string>;
    }

}

export class LocalStorageHelper {
    static storeItem(key: string, value: string) {
        localStorage.setItem(key, value);
        return localStorage.getItem(key);
    }

    static getItem(key: string) {
        return localStorage.getItem(key);
    }

    static removeItem(key: string) {
        localStorage.removeItem(key);
    }

    static clearAllItems() {
        localStorage.clear();
    }

    static storeArrayItem(key: string, value: any) {
        let item = this.getItem(key);
        // Does not yet exist - Create it
        if (!item) {
            localStorage.setItem(key, '[' + value + ']');
        } else {
            item = item.replace('[', '').replace(']', '') + ', ' + value;
            // Append to the list
            localStorage.setItem(key, '[' + item + ']');
        }
    }

    static getArrayItem(key: any) {
        const item = localStorage.getItem(key);

        return JSON.parse(item ? item : '') as Array<string>;
    }

}

export class AppHelperFunction {
    static encryptPassword(textToEncrypt: string) {
        const keyHex = CryptoJS.enc.Hex.parse(EncryptionKeys.LoginPasswordEncryptionKey);
        const ivHex = CryptoJS.enc.Hex.parse(EncryptionKeys.LoginPasswordEncryptionKey);
        const enc = CryptoJS.AES.encrypt(textToEncrypt, keyHex, { iv: ivHex });
        const encryptedString = enc.ciphertext.toString(CryptoJS.enc.Base64);
        return encryptedString;
    }

    static encryptToken(tokenObject: object) {
        const tokenString = JSON.stringify(tokenObject);
        const keyHex = CryptoJS.enc.Hex.parse(EncryptionKeys.TokenEncryptionKey);
        const ivHex = CryptoJS.enc.Hex.parse(EncryptionKeys.TokenEncryptionKey);
        const enc = CryptoJS.AES.encrypt(tokenString, keyHex, { iv: ivHex });
        const encryptedString = enc.ciphertext.toString(CryptoJS.enc.Base64);
        return encryptedString;
    }
}