import axios from 'axios'

const API_ENDPOINT = 'http://localhost:9000'

export default {
    fetchAll() {
        return axios.get(`${API_ENDPOINT}/collaborateurs`)
            .then(response => response.data)
            .then(response => {
                if (response.error === 1){
                    return Promise.reject(response)
                } else {
                    return Promise.resolve(response)
                }
            })
    },
    remove(user) {
        return axios.delete(`${API_ENDPOINT}/collaborateur/${user.id}`)
            .then(res => res.data)
            .then(res => {
                if (res.error == 1) {
                    return Promise.reject(res);
                } else {
                    return Promise.resolve(res);
                }
            });
  },
}
