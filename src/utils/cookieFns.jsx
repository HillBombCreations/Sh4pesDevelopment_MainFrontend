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