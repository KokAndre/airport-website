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