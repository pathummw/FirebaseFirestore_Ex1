const personList = document.querySelector('#personList');
const form = document.querySelector('#formId');




function renderPerson(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let age = document.createElement('span');
    let weight = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    age.textContent = doc.data().age;
    weight.textContent = doc.data().weight;
    /* age.textContent = doc.data().name; */

    li.appendChild(name);
    li.appendChild(age);
    li.appendChild(weight);

    personList.appendChild(li);
}





// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBpQF1sdA02M1rbVpG8pgjt-PgjAOAiFf0",
    authDomain: "bmi-calculator-813e9.firebaseapp.com",
    projectId: "bmi-calculator-813e9",
    storageBucket: "bmi-calculator-813e9.appspot.com",
    messagingSenderId: "659740951942",
    appId: "1:659740951942:web:c5e3a856f1d18c9bc65807",
    measurementId: "G-Q8C6C1PQ95"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

db.collection('bmi').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        renderPerson(doc);
    });
})


//Saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('bmi').add({
        name: form.name.value,
        age: form.age.value,
        weight: form.weight.value
    })
    form.name.value = '';
    form.age.value = '';
    form.weight.value = '';
})