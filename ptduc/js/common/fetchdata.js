$(document).ready(()=> {
  $table = $("table")[0];
  $.each($employee, function (index, value) {
    let newHTMLTag = `
    <tr>
    <td>${index+1}</td>
    <td>${value.ID}</td>
       <td>${value.name}</td>
       <td>${value.insuranceCode}</td>
       <td>${value.sex}</td>
       <td>${value.position}</td>
       <td>${value.department}</td>
       <td>${value.salaryIndex}</td>
       <td>${value.joined === true ? "Đang tham gia" : "Không tham gia"}</td>
       <td>${value.hospital}</td></tr>`;
    $("table").first().append(newHTMLTag);
  });
});
