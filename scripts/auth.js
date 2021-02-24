//account display
let account = document.querySelector(".account-details")


//access to the  elements class with logged in and logged out
const loggedInLinks = document.querySelectorAll('.logged-in')
const loggedOutLinks = document.querySelectorAll('.logged-out')

//to toggle depending on the situation

const setUpUi = (user) => {

    if (user) {
        // to get bio display
        // to access the database to display bio
        db.collection('users').doc(user.uid).get().then((doc)=>{
            const html = `
            <div> logged in as : ${user.email} </div>
            <div> ${doc.data().bio} </div>

        `;
        account.innerHTML = html

        })
          

        // if i am logged in display the logged in links 
        loggedInLinks.forEach(item => {
            item.style.display = 'block'
        });

        loggedOutLinks.forEach(item => {
            item.hidden = true
        });

    } else {
        loggedInLinks.forEach(item => {
            item.hidden = true
        });

        loggedOutLinks.forEach(item => {
            item.style.display = 'block'
        });

        account.innerHTML = ''
    }
}


// listen for auth status change
auth.onAuthStateChanged(user => {
    console.log(user)
    if (user) {
        //to get and addd guides with firestore
        // for realtime data change .get == .onsnapshot
        db.collection('guides').onSnapshot((snapshot) => {
            console.log(snapshot.docs)
            renderGuide(snapshot.docs)
            setUpUi(user)
        }, err => {
            console.log(err)
        })
    } else {
        renderGuide([])
        setUpUi()
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

        //for the bio i will create a users collection and add a biography field
        return db.collection('users').doc(cred.user.uid).set({
            bio:signupForm["signup-bio"].value
        });

    }).then(() => {
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


//create new guides

let guideForm = document.querySelector('#create-form')
guideForm.addEventListener('submit', (e) => {
    e.preventDefault()

    db.collection('guides').add({
        title: guideForm['title'].value,
        content: guideForm['content'].value
    }).then(() => {
        const modal = document.querySelector('#modal-create')
        M.Modal.getInstance(modal).close();
        guideForm.reset()
    })




})


