// access to the form through the id
const signupForm = document.getElementById('signup-form');

// access to the input value when i submit the form
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //values inputed
    console.log(email, password)

//sign up the user into the firebase auth
auth.createUserWithEmailAndPassword(email,password).then(cred=>{
    console.log(cred)
    console.log(cred.user)
    const modal = document.querySelector('#modal-signup')
    M.Modal.getInstance(modal).close();
    signupForm.reset();
})


})
//log out
const logout =document.getElementById('logout')
logout.addEventListener('click',(e)=>{
    e.preventDefault();
auth.signOut().then(()=>{
    console.log('user signed out')
})
})
