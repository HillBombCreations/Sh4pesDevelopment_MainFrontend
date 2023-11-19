import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', { path: '/api/socket.io' });

export { socket };