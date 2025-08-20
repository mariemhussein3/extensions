let myRow = document.querySelector("#myRow");
let theme = document.querySelector("#theme");
let btnSubmit = document.querySelector("#btnSubmit");
let btnClose = document.querySelectorAll(".btn-close");
let modal = document.querySelector(".modal");
let iconLogo = document.querySelector(".icon-logo");
let listOfAncour = document.querySelectorAll(".list a");
let data = [];
let currentIndex;
if (localStorage.getItem("data")) {
  data = JSON.parse(localStorage.getItem("data"));
  displayCards(data);
} else {
  getData();
}
async function getData() {
  try {
    let respone = await fetch(`./data.json`);
    data = await respone.json();
    localStorage.setItem("data", JSON.stringify(data));
    displayCards(data);
    // console.log(data);
  } catch (err) {
    console.log(err);
  }
}

for (let i = 0; i < listOfAncour.length; i++) {
  listOfAncour[i].addEventListener("click", function (e) {
    e.preventDefault();
    // if there is class active on someone=>will remove
    for (let j = 0; j < listOfAncour.length; j++) {
      listOfAncour[j].classList.remove("active");
    }
    listOfAncour[i].classList.add("active");
    if (listOfAncour[i].classList.contains("active-filter")) {
      displayCards(data.filter((el) => el.isActive));
      localStorage.setItem("data", JSON.stringify(data));
    } else if (listOfAncour[i].classList.contains("in-active")) {
      displayCards(data.filter((el) => !el.isActive));
      localStorage.setItem("data", JSON.stringify(data));
    } else {
      displayCards(data);
      localStorage.setItem("data", JSON.stringify(data));
    }
  });
}
function displayCards(data) {
  let temp = ``;
  for (let i = 0; i < data.length; i++) {
    let { name, logo, description, isActive } = data[i];
    // console.log(data);

    temp += `<div class="col">
            <div class="card">
              <div class="header-card">
                <img src=${logo} alt="" />
                <div class="content-header-card">
                  <h3>${name}</h3>
                  <p>
                   ${description}
                  </p>
                </div>
              </div>
              <div class="footer-card">
               <div class="remove">
                <span onclick="handleConfirm(${i})">Remove</span>
               </div>
                  <div class="for-switch"><label class="switch">
                    <input type="checkbox" onchange=" handleSwitch(${i},this)"  class="checkInput" ${
      isActive && "checked"
    }/>
                    <span class="slider round"></span>
                  </label></div>
              </div>
            </div>
          
          </div>`;
  }
  myRow.innerHTML = temp;
}
function handleSwitch(i, input) {
  data[i].isActive = input.checked;
  displayCards(data);
  localStorage.setItem("data", JSON.stringify(data));

  console.log(input.checked);
}

// theme
document.body.classList.add(localStorage.getItem("theme") || "light-mode"); //default
theme.addEventListener("click", function () {
  if (document.body.classList.contains("light-mode")) {
    document.body.classList.replace("light-mode", "dark-mode");
    localStorage.setItem("theme", "dark-mode");
  } else {
    document.body.classList.replace("dark-mode", "light-mode");
    localStorage.setItem("theme", "light-mode");
  }
});

// open modal
function handleConfirm(i) {
  modal.style.display = "block";
  currentIndex = i;
}
// close modal
for (let i = 0; i < btnClose.length; i++) {
  btnClose[i].addEventListener("click", () => {
    modal.style.display = "none";
    
  });
}
// delete
btnSubmit.addEventListener("click", function () {
  handleDelete(currentIndex);
});
function handleDelete(currentIndex) {
  console.log(currentIndex);

  data.splice(currentIndex, 1);
  modal.style.display = "none";

  localStorage.setItem("data", JSON.stringify(data));
  displayCards(data);
}
