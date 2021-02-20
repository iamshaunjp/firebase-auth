// listen for auth status change
auth.onAuthStateChanged(user => {
    if(user){
        //to get and addd guides with firestore
        db.collection('guides').get().then((snapshot) => {
            console.log(snapshot.docs)
            renderGuide(snapshot.docs)
        })
    }else{
        renderGuide([])
    }

    (user) ? console.log('user is loggedin', user) : console.log('user is logged out')


})






// the signup form
const signupForm = document.querySelector('#signup-form')

// access to the input value when i submit the form
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //values inputed
    console.log(email, password)

    //sign up the user into the firebase auth
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred)
        const modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })

})


//log out
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
})

//log in
const login = document.querySelector('#login-form')
login.addEventListener('submit', e => {
    e.preventDefault();
    const email = login["login-email"].value
    const password = login["login-password"].value

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred)
        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close();
        login.reset();
    })

})


