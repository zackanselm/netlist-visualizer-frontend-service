import BrowserStorage from '../store/BrowserStorage';

export interface LoginInputs {
    email: string;
}

class UsersService {
    constructor() {}

    login = (userDetails: LoginInputs) => {
        return new Promise((resolve) => resolve(BrowserStorage.setUser(userDetails)));
    };
    
    logout = () => {
        return new Promise((resolve) => resolve(BrowserStorage.setUser({})));
    };
}

export default new UsersService();
