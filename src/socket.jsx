import { io } from 'socket.io-client';

const socket = io('https://api.sh4pesdevelopment.com', { path: '/api' });

export { socket };