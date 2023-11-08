import { io } from 'socket.io-client';

const URL = 'https://api.ggtoners.com';
const socket = io(URL);

export { socket };