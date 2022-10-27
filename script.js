import Api from "./api.js";

let user = document.cookie;
console.log("u", user);
if (!user) {
    user = prompt("Пользователь не найден, укажите имя пользователя", "vesnushka19");
    document.cookie = `user=${user}`;
} else {
    user = user.split("=")[1];
};

var api = new Api(user);

const container = document.querySelector(".container");
const btn = document.querySelector(".dashboard").firstElementChild;
const popupList = document.querySelectorAll(".popup");
const popBox = document.querySelector(".popup-wrapper");
const del = document.querySelector(".del");

let catsList = localStorage.getItem("cats");
if (catsList) {
    catsList = JSON.parse(catsList);
}
console.log(catsList);

const addForm = document.forms.add;
addForm.addEventListener("submit", function(e) {
   addCat(e, api, Array.from(popupList), catsList);
});

if (!catsList) {
api.getCats()
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.message === "ok") {
            localStorage.setItem("cats", JSON.stringify(data.data));
            data.data.forEach(cat => {
                createCard(cat, container, Array.from(popupList));
            });
        } else {
            showPopup(Array.from(popupList), "info", data.message);
        }
    });
} else {
        catsList.forEach(cat => {
        createCard(cat, container, Array.from(popupList));
    });
}
popupList.forEach(p => {
    p.firstElementChild.addEventListener("click", e => {
        p.classList.remove("active");
        popBox.classList.remove("active");
    });
});

btn.addEventListener("click", e => {
    showPopup(Array.from(popupList), "add");
});

popBox.addEventListener("click", function(e) {
    if (e.target === this) {
        popBox.classList.remove("active");
        popupList.forEach(p => {
            if (p.classList.contains("active")) {
                p.classList.remove("active");
            }
        })
    }
});

// let dashboard = document.createElement("div");
// dashboard = document.querySelector(".dashboard");
// dashboard.addEventListener("click", function(e) {
//     if (e.target === this) {
//         dashboard.remove("active");
//         dashboard.forEach(p => {
//             if (p.dashboard.contains("active")) {
//                 p.dashboard.remove("active");
//             }
//         })
//     }
// });

del.addEventListener("click", function(e) {
    body.remove(lastChild);
    if (data.message === "ok") {
        localStorage.removeItem(JSON.stringify(body.lastChild));
    }
});