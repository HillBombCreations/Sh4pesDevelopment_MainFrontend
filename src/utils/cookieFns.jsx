import axios from 'axios';

function cookieFns() {
    const eatCookie = () => {
        // mmm yum yum yum
        axios.post(
            'https://api.sh4pesdevelopment.com/api/user/logout', {},
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        ).then(() => window.location.replace('/'))
        .catch(err => console.error(err));
    }
    return {
        eatCookie,
    };
}

export default cookieFns;