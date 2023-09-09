import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"

import{getDatabase, set, ref, onValue} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"

const auth = getAuth()

const dataBase = getDatabase()


const signUp = () => {

    let username = document.getElementById("username").value
    
    let email = document.getElementById("signUp-email").value

    let password = document.getElementById("signUp-password").value

    createUserWithEmailAndPassword(auth, email, password)

        .then((resol) => {

            alert("signup successfully")

            let userId = auth.currentUser.uid
            
            console.log(userId);
            
            let usersReference = ref(dataBase, "users/" + "(" + username + ")"  + userId)
            
            let usersObj = {
                username : username,
                email : email,
                password : password
            }

            set( usersReference, usersObj)

            .then((resol) => {

                alert("printed")

                console.log(username);
            })

            .catch((reject) => {
                
                alert("rejected")
            })
            

           
            // window.location.href = './signIn.html'  // workable
            // window.location = "./signIn.html"
            
            
            
            
            
        })

        .catch((rej) => {

            alert("signup failed!" , rej)

        })


}


let signUpBtn = document.getElementById("signup-button")

if(signUpBtn) {

    signUpBtn.addEventListener("click", signUp)
    
}

// signUpBtn.addEventListener("click", signUp)


else{
    
const login = () => {
    
    let loginEmail = document.getElementById("login-email")

    let loginPassword = document.getElementById("login-password")

    signInWithEmailAndPassword(auth,loginEmail.value, loginPassword.value)

        .then((resol) => {

            alert("successfully login")

            let userId = auth.currentUser.uid

            console.log(userId);
           

            
            // let usernameRef = ref(dataBase, "users/" + userId)
            let userReference = ref(dataBase , "users/" , userId )

            onValue(userReference, (snapshort) => {

                let a = snapshort.val(); // theek working

                // let b = a.name

                console.log(a);

                // console.log(b); /// undefine

                // console.log(snapshort.val().name); // undefine

                console.log(snapshort.val().username);
                
                // console.log('user data: ', snapshort); /// theek work
                // console.log(data.val());/// null
                // console.log(data.value); /// undefine  incorrect in js

                // console.log(data.val().username); // error


                // let userData = data.val().name
                // console.log(userData);
                // console.log(userData)
                // document.getElementById("username").innerHTML = userData
            })


            
            // window.location.href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
            
            
        })

        .catch((rej) => {

            alert("try again")

        })


}


let loginBtn = document.getElementById("login-button")

 loginBtn.addEventListener("click",login )

}




