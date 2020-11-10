const firebaseConfig = {
  apiKey: "AIzaSyCqlvCy9rhIyeQRd03X3LQKCvbiHfp7cHY",
  authDomain: "fir-demo-379c7.firebaseapp.com",
  databaseURL: "https://fir-demo-379c7.firebaseio.com",
  projectId: "fir-demo-379c7",
  storageBucket: "fir-demo-379c7.appspot.com",
  messagingSenderId: "848650817866",
  appId: "1:848650817866:web:d2dfebde125de43f95b1b3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//now in order to save this data to the cloud
//we need to make a doc reference to specify which doc I want to place this data in the cloud
//1. grab reference to firestore
const firestore = firebase.firestore();
//2.set up doc ref. so if its created then okay, if its not created then this document will be created and the doc inside it also
//here samples refer to the document and madness the field.

const city = document.getElementById("city");
const country = document.getElementById("country");
const submitBtn = document.getElementById("submit");
const cityList = document.getElementById("cityList");
const form = document.getElementById("form");

const destinationRef = firestore.collection("destination");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //   console.log(` values are ${city)}, ${country}`);

  const { serverTimestamp } = firebase.firestore.FieldValue;

  destinationRef
    .add({
      city: city.value,
      country: country.value,
      createdAt: serverTimestamp(),
    })
    .then(() => {
      console.log("Destination entry successful");
      window.location.reload();
    })
    .catch((err) => {
      console.log("oops destination entry error", err);
    });

  form.reset();

  
});

getDestinationList = () => {
  destinationRef.where('city', '==','mumbai').get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderCity(doc);
    });
  });
};

getDestinationList();
//function to create and render cities
function renderCity(doc) {
  const li = document.createElement("li");
  const city = document.createElement("span");
  const country = document.createElement("span");
  const delBtn = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  city.textContent = doc.data().city + ",";
  country.textContent = doc.data().country;
  delBtn.textContent = "X";
  delBtn.className = "delBtn";

  li.appendChild(city);
  li.appendChild(country);
  li.appendChild(delBtn);

  cityList.appendChild(li);

  //deleting data
  const delButton = document.querySelector(".delBtn");

  delButton.addEventListener("click", (e) => {
    const id = e.target.parentElement.getAttribute("data-id");
    destinationRef.doc(id).delete();
    console.log('deleted')
    
  });
  
}

// getDestinationList = () => {
//   destinationRef.onSnapshot((list) => {
//     const listItems = list.docs.map((doc) => {
//       return `
//       <div class="list">
//         <li data-id="${doc.id}">
//           <span>${doc.data().city},${doc.data().country}</span>
//           <button onclick="deleteItem()" class="deleteBtn">X</button>
//         </li>
//       </div>
//       `;
//     });
//     cityList.innerHTML = listItems;
//   });
// };

// destinationRef
//   .where("city", "==", city.value)
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot
//       .forEach((doc) => {
//         console.log(doc);
//       })
//       .then(() => {
//         console.log("delete success");
//       })
//       .catch((err) => console.log("error is", err));
//   });
// .onSnapshot((list) => {
//   const deleteItemList = list.doc.map((doc) => {
//   })
// })
