// var res = document.getElementsByClassName("input-icon");
// var length = res.length;

// /**
//  * Bắt sự kiện khi chọn input, viền các ô sẽ chuyển thành màu xanh
//  * Author:Phương Trung Đức(08/11/2020)
//  */
// for (var i = 0; i < length; i++) {
//     document
//         .getElementsByClassName("input-input-icon")
//     [i].addEventListener("focusin", (e) => {
//         var grandFather = e.target.parentNode.parentNode;
//         grandFather.style.borderColor = "#019160";
//     });
//     document
//         .getElementsByClassName("input-input-icon")
//     [i].addEventListener("focusout", (e) => {
//         var grandFather = e.target.parentNode.parentNode;
//         grandFather.style.borderColor = "#bbbbbb";
//     });
// }

// /**
//  * bắt sự kiện chọn tab trên sidebar, tab được chọn hiển thị màu xanh
//  * Author:Phương Trung Đức(08/11/2020)
//  */
// var sideBar = document.getElementsByClassName("sidebar-content")[0];
// let sideBarChoose = localStorage.getItem("sideBarChoose") || 0;
// sideBar.children[sideBarChoose].style.backgroundColor = "#019160";
// for (let i = 0; i < sideBar.childElementCount; i++) {
//     sideBar.children[i].addEventListener("click", () => {
//         sideBar.children[sideBarChoose].style.backgroundColor = "transparent";
//         sideBarChoose = i;
//         localStorage.setItem("sideBarChoose", i);
//         sideBar.children[i].style.backgroundColor = "#019160";
//     });
// }

// /**
//  * Bắt sự kiện ấn nút chuyển page
//  * Author:Phương Trung Đức(08/11/2020)
//  */
// var numberofPage = 100;
// var choosePage = 0;
// var footerbar = document.getElementsByClassName("number-bar")[0];
// var nextPage = () => {
//     if (choosePage < numberofPage) {
//         choosePage++;
//         for (let i = 0; i < footerbar.children.length; i++) {
//             footerbar.children[i].innerHTML = choosePage * 4 + i + 1;
//         }
//         choosePageTable = 0;
//     }
// };
// var previousPage = () => {
//     if (choosePage > 0) {
//         choosePage--;
//         for (let i = 0; i < footerbar.children.length; i++) {
//             footerbar.children[i].innerHTML = choosePage * 4 + 1 + i;
//         }
//         choosePageTable = 3;
//     }
// };

// /**
//  * Bắt sự kiện chuyển xanh đánh dấu trang trên table đang được chọn
//  * Author:Phương Trung Đức(08/11/2020)
//  */

// // var choosePageTable = 0;
// // footerbar.children[choosePageTable].style.backgroundColor = "#019160";
// // for (let i = 0; i < footerbar.children.length; i++) {
// //     footerbar.children[i].addEventListener("click", () => {
// //         for (let j = 0; j < footerbar.children.length; j++) {
// //             footerbar.children[j].style.backgroundColor = "transparent";
// //         }
// //         choosePageTable = i;
// //         footerbar.children[i].style.backgroundColor = "#019160";
// //     });
// // }

// // var nextPageTable = () => {
// //     if (choosePageTable == 3) {
// //         footerbar.children[choosePageTable].style.backgroundColor = "transparent";
// //         nextPage();
// //     } else {
// //         footerbar.children[choosePageTable].style.backgroundColor = "transparent";
// //         choosePageTable++;
// //     }
// //     footerbar.children[choosePageTable].style.backgroundColor = "#019160";
// // };

// // var previousPageTable = () => {
// //     if (choosePageTable == 0) {
// //         footerbar.children[choosePageTable].style.backgroundColor = "transparent";
// //         previousPage();
// //     } else {
// //         footerbar.children[choosePageTable].style.backgroundColor = "transparent";
// //         choosePageTable--;
// //     }
// //     footerbar.children[choosePageTable].style.backgroundColor = "#019160";
// // };

// //var newHTMLTag = `<td> 11</td>
// //        <td>MS55568</td>
// //        <td>Nguyễn Trung Nghĩa</td>
// //        <td>113114115</td>
// //        <td>Nữ</td>
// //        <td>Tổng thống</td>
// //        <td>Nhà trắng</td>
// //        <td>0</td>
// //        <td>Đang tham gia</td>
// //        <td>Trạm y tế Bách Khoa</td>`;
// //var row = document.createElement("tr");
// //row.innerHTML = newHTMLTag;
// //document.getElementsByTagName("table")[0].appendChild(row);


