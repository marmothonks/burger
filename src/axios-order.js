import axios from 'axios';

const instance = axios.create(
    {baseURL:'https://react-backend-bb.firebaseio.com/'}
);

export default instance;