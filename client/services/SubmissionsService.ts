import axios from 'axios';

export interface LoginInputs {
    email: string;
}

class SubmissionsService {
    constructor() {}

    create = (userId: string, netlistJson: string) => {
        return axios({
            method: 'post',
            url: `/submissions`,
            data: {
                user_id: userId,
                netlist_json: netlistJson,
            },
            headers: {
                'x-netlist-userid': userId
            }
        });
    };
    
    all = (userId: string) => {
        return axios({
            method: 'get',
            url: `/submissions`,
            headers: {
                'x-netlist-userid': userId
            }
        });
    };
}

export default new SubmissionsService();
