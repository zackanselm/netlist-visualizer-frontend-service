export interface UserDetails {
    email: string;
}

class BrowserStorage {
    constructor() {}

    getUser = () => {
        if (typeof (Storage) !== 'undefined' && typeof (window) !== 'undefined') {
            const stringifiedUserDetails = localStorage?.getItem('user_details');
            return JSON.parse(stringifiedUserDetails || '{}');
        }
    
        return {};
    }

    setUser = (userDetails: Partial<UserDetails>) => {
        if (typeof (Storage) !== 'undefined' && typeof (window) !== 'undefined') {
            localStorage?.setItem('user_details', JSON.stringify(userDetails));
        }
    }
}

export default new BrowserStorage()