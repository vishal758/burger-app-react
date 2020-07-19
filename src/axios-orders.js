import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-react-app-50038.firebaseio.com/'
})

export default instance