import cookie from "js-cookie";

// set in cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// get from cookie such as stored token
export const getCookie = (key, value) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from local storage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    console.log('AUTHENTICATE helper signin response',response)
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}
//access user info from localstorage
export const isAuth = () => {
    if (window !== "undefined") {
        const cookieChecked = getCookie('token')
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
      }   
}

export const signout = next => {
    removeCookie('token')
    removeLocalStorage('user')
    next();
}