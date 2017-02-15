function requireAuth(nextState, replace) {
    const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/));
    const data = JSON.parse(localStorage.getItem(key));
    if (data == null) {
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname,
            },
        });
    }
}

module.exports = requireAuth;

//Ref: User based security when accessing data
//https://firebase.google.com/docs/storage/security/user-security
