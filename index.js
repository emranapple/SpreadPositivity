// FIREBASE FUNCTIONS
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// APP SETTINGS
const appSettings = {
    databaseURL: "https://addtocart-ea02a-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const textInDB = ref(database, "textList")

// VARIABLE FOR DOM
const textFieldEl = document.getElementById('text-field')
const publishBtnEl = document.getElementById('publish-btn')
const textEl = document.getElementById('text-el')
const fromEL = document.getElementById('from-el')

// PUSH VALUE TO FIREBASE DB
publishBtnEl.addEventListener('click', function () {
    let inputValue = textFieldEl.value
    push(textInDB, inputValue)

})

// FETCHING VALUE FROM FIREBASE
onValue(textInDB, function(snapshot) {
    let textArray = Object.values(snapshot.val())
    clearTextEList()
    for (let i = 0; i < textArray.length; i++) {
        appendMessageToDiv(textArray[i])
        
    }
    clearTextField()
})

// 
function appendMessageToDiv(text) {
    textEl.innerHTML += `<p id='p-content-el'>${text}</p>` 
}

function clearTextEList() {
    textEl.innerHTML = ''
}

function clearTextField() {
    textFieldEl.value = ''
}


