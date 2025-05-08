import axios from 'axios';

export interface LoginInputs {
    email: string;
}

class SubmissionsService {
    constructor() {}

    create = (netlistJson: string) => {
        return axios({
            method: 'post',
            url: `/submissions`,
            data: {
                netlistJson,
            }
        });
    };
    
    all = () => {
        return axios({
            method: 'get',
            url: `/submissions`,
        });
    };
}

export default new SubmissionsService();
