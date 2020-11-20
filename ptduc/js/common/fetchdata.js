// $(document).ready(() => {
//   var table = $("table")[0];
//   $.get("http://api.manhnv.net/api/employees", (data, status) => {
//     if (status === "success") {
//       employee = data;
//     }

//     var chooseFourPage = 0;
//     var numberofPage =
//       data.length % 20 === 0
//         ? data.length / 20
//         : Math.floor(data.length / 20) + 1;

//     var numberofFourPage =
//       numberofPage % 4 == 0
//         ? numberofPage / 4
//         : Math.floor(numberofPage / 4) + 1;

//     var choosePage = 0;
//     var footerbar = $(".number-bar").first();

//     var colorForChoosePage = () => {
//       footerbar.children().eq(choosePage).css("background-color", "#019160");
//     };
//     colorForChoosePage();

//     /**
//      * Hàm đổ dữ liệu từ vị trí start đến vị trí end
//      * @param {integer} start vị trí bắt đầu
//      * @param {integer} end  vị trí kết thúc
//      */
//     var renderData = (start, end) => {
//       $(".table-content").first().children().remove();
//       for (let i = start; i <= end; i++) {
//         $JoinDate = new Date(employee[i].JoinDate);
//         $day = $JoinDate.getDate();
//         $month = $JoinDate.getMonth();
//         $year = $JoinDate.getFullYear();
//         let newHTMLTag = `
//     <tr>
//     <td>${i + 1}</td>
//     <td class="employeeId">${employee[i].EmployeeId}</td>
//        <td>${employee[i].FullName}</td>
//        <td class = "JoinDate">${$day + "/" + $month + 1 + "/" + $year}</td>
//        <td>${employee[i].Gender}</td>
//        <td>${employee[i].PositionName}</td>
//        <td>${employee[i].DepartmentName}</td>
//        <td>${employee[i].Email}</td>
//        <td>${employee[i].PhoneNumber}</td>
//        <td>${employee[i].WorkStatusName}</td>
//        </tr>`;
//         $(".table-content").first().append(newHTMLTag);
//       }
//     };

//     renderData(0, 19);

//     var colorForChoosePage = () => {
//       footerbar.children().eq(choosePage).css("background-color", "#019160");
//     };

//     var resetNumberBar = () => {
//       footerbar.children().css("background-color", "transparent");
//     };

//     var nextFourPage = () => {
//       if (chooseFourPage < numberofFourPage) {
//         chooseFourPage++;
//         for (let i = 0; i < footerbar.children().length; i++) {
//           footerbar
//             .children()
//             .eq(i)
//             .text(chooseFourPage * 4 + i + 1);
//         }

//         resetNumberBar();
//         choosePage = 0;
//         colorForChoosePage();
//         start = chooseFourPage * 80 + choosePage * 20;
//         renderData(start, start + 19);
//       }
//     };

//     var previousFourPage = () => {
//       if (chooseFourPage > 0) {
//         chooseFourPage--;
//         for (let i = 0; i < footerbar.children().length; i++) {
//           footerbar
//             .children()
//             .eq(i)
//             .text(chooseFourPage * 4 + i + 1);
//         }
//         resetNumberBar();
//         choosePage = 3;
//         colorForChoosePage();
//         start = chooseFourPage * 80 + choosePage * 20;
//         renderData(start, start + 19);
//       }
//     };

//     $(".icon-next-page").click(() => {
//       nextFourPage();
//     });

//     $(".icon-previous-page").click(() => {
//       previousFourPage();
//     });

//     $(".icon-nexttable-page").click(() => {
//       if (  choosePage < 3) {
//         resetNumberBar();
//         choosePage++;
//         let start = chooseFourPage * 80 + choosePage * 20;
//         renderData(start, start + 19);

//         colorForChoosePage();
//       } else {
//         nextFourPage();
//       }
//     });

//     $(".icon-previoustable-page").click(() => {
//       if (choosePage > 0) {
//         resetNumberBar();
//         choosePage--;
//         let start = chooseFourPage * 80 + choosePage * 20;
//         renderData(start, start + 19);

//         colorForChoosePage();
//       } else {
//         previousFourPage();
//       }
//     });
//   });
// });
