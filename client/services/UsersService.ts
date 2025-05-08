import axios from 'axios';
import BrowserStorage from '../store/BrowserStorage';

export interface LoginInputs {
    email: string;
}

class UsersService {
    constructor() {}

    login = (userDetails: LoginInputs) => {
        return axios({
            method: 'post',
            url: `/users`,
            data: {
                email: userDetails.email,
            }
        }).then((response) => {
            const userId = response.data._id;
            BrowserStorage.setUser({
                id: userId,
                ...userDetails
            })
            return userId;
        })
    };
    
    logout = () => {
        return new Promise((resolve) => resolve(BrowserStorage.setUser({})));
    };
}

export default new UsersService();
