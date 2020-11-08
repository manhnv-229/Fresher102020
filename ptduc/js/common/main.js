var res = document.getElementsByClassName("input-icon");
var length = res.length;
for (var i = 0; i < length; i++) {
  document
    .getElementsByClassName("input-input-icon")
    [i].addEventListener("focusin", (e) => {
      var grandFather = e.target.parentNode.parentNode;
      grandFather.style.borderColor = "#019160";
    });
  document
    .getElementsByClassName("input-input-icon")
    [i].addEventListener("focusout", (e) => {
      var grandFather = e.target.parentNode.parentNode;
      grandFather.style.borderColor = "#bbbbbb";
    });
}
var sideBar = document.getElementsByClassName("sidebar-content")[0];
let sideBarChoose = localStorage.getItem('sideBarChoose')||0;
sideBar.children[sideBarChoose].style.backgroundColor = "#019160";
for (let i = 0; i < sideBar.childElementCount; i++) {
  sideBar.children[i].addEventListener("click", () => {
    sideBar.children[sideBarChoose].style.backgroundColor = "#ffffff";
    localStorage.setItem("sideBarChoose", i);
    sideBar.children[i].style.backgroundColor = "#019160";
  });
}
