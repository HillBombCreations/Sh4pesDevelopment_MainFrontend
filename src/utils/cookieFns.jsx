import axios from 'axios';

function cookieFns() {
    const eatCookie = () => {
        // mmm yum yum yum
        axios.post(
            'http://localhost:5000/api/user/logout', {},
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        ).then(() => {
            document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.replace('/');
        }).catch(err => console.error(err));
    }
    const serveCookie = (cname) => {
        let name = cname + '=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return '';
    }
    return {
        eatCookie,
        serveCookie,
    };
}

export default cookieFns;