class BaseJS {
    constructor() {
        this.host = "https://localhost:44340";
        this.apiRouter = null;
        this.filterString = '';
        this.setApiRouter();
        this.loadData();
        this.initEvents();
    }

    setApiRouter() {

    }

    /**
    * Sự kiện cho các button
    * CreatedBy:Nguyễn Trung Nghĩa (12/11/2020)
    */
    initEvents() {
        var me = this;

        //Sự kiện khi nhấn vào button thêm mới:
        document.getElementById('btnAdd').onclick = me.btnAddOnClick.bind(me);

        //Load lại dữ liệu khi nhấn nút Refresh:
        document.getElementsByClassName("btn-refresh")[0].onclick = me.loadData.bind(me);

        //có thể dùng .bind(this) 

        //Sự kiện tìm kiếm nhan viên
        document.getElementsByClassName("search-employee")[0].onchange = function (e) {
            me.setFilterString(e);
            me.filterList();
        };

        document.getElementById("searchDepartment").onchange = function (e) {
            me.setFilterString(e);
            me.filterList();
        };

        document.getElementById("searchPosition").onchange = function (e) {
            me.setFilterString(e);
            me.filterList();
        };

        //Xóa khách hàng được chọn khi nhấn nút Delete:
        document.getElementsByClassName("btn-delete")[0].onclick = me.showDeleteDialog.bind(me);

        document.getElementById('delete').onclick = me.btnDeleteOnClick.bind(me);

        //Sự kiện khi nhấn đóng dialog:
        document.getElementsByClassName('fa-times')[0].onclick = me.hideDialog;
        document.getElementsByClassName('fa-times')[1].onclick = me.hideDialog;

        document.getElementsByClassName('cancel-button')[0].onclick = me.hideDialog;
        document.getElementsByClassName('cancel-button')[1].onclick = me.hideDialog;

        //Lưu dữ liệu khi nhấn nút lưu
        document.getElementsByClassName('save-button')[0].onclick = me.btnSaveOnClick.bind(me);

        //nhấn 1 lần vào hàng trong bảng sẽ tô màu hàng
        $('table tbody').on('click', 'tr', function (e) {
            me.onTableRowClick(e);
        });

        //hiển thị thông tin chi tiết khi nhấn đúp chọn 1 bản ghi trên ds dữ liệu
        $('table tbody').on('dblclick', 'tr', function (e) {
            me.trDbClick(e);
        })

        document.getElementById("Salary").addEventListener("change", (event) => {
            me.onInputSalary(event);
        });

        //format tiền khi nhập lương
        document.getElementById("Salary").addEventListener("blur", (event) => {
            me.validateInputSalary(event);
        })

        //validate bắt buộc nhập
        var inputRequired = document.getElementsByClassName('input-required');
        for (let i = 0; i < inputRequired.length; i++) {
            inputRequired[i].addEventListener("blur", (event) => {
                me.validateInput(event);
            })
        }

        //validate email đúng định dạng
        document.getElementById('Email').addEventListener("blur", (event) => {
            me.validateEmail(event);
        })
            
    }

    /**
    * Ẩn form nhập dữ liệu
    * CreatedBy:Nguyễn Trung Nghĩa (20/11/2020)
    */
    hideDialog() {
        document.getElementsByClassName('dialog-modal')[0].style.display= "none";
        document.getElementsByClassName('modal-delete')[0].style.display = "none";
    }

    /**
    * Load dữ liệu từ api
    * CreatedBy:Nguyễn Trung Nghĩa (12/11/2020)
    */
    loadData() {
        var me = this;
        document.getElementById('loadingIcon').style.display = "block";
        try {
            //load dữ liệu cho các combo box
            //lấy dữ liệu phòng ban
            var selectDepartment = document.getElementById('searchDepartment');
            selectDepartment.innerHTML = '';
            selectDepartment.insertAdjacentHTML('beforeend',`<option value="all" selected="selected">Tất cả phòng ban</option>`);
            me.listDepartment = [];

            var xhrDepartment = new XMLHttpRequest();
            xhrDepartment.withCredentials = true;

            xhrDepartment.open('GET', me.host + "/api/v1/Departments");
            xhrDepartment.setRequestHeader('Content-Type', 'application/json');
            xhrDepartment.send();

            xhrDepartment.onreadystatechange = function () {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhrDepartment.readyState === DONE) {
                    if (xhrDepartment.status === OK) {
                        var response = JSON.parse(xhrDepartment.response);
                        for (let i = 0; i < response.length; i++) {
                            me.listDepartment.push(response[i]);
                            var option = `<option value="${response[i].DepartmentId}">${response[i].DepartmentName}</option>`;
                            selectDepartment.insertAdjacentHTML('beforeend', option);
                        }
                    } else {
                        alert("Không thể tải dữ liệu, vui lòng kiểm tra kết nối!");
                    }
                }
            };

            //lấy dữ liệu chức vụ
            var selectPosition = document.getElementById('searchPosition');
            selectPosition.innerHTML = '';
            selectPosition.insertAdjacentHTML('beforeend',`<option value="all" selected="selected">Tất cả vị trí</option>`);
            me.listPosition = [];

            var xhrPosition = new XMLHttpRequest();
            xhrPosition.withCredentials = true;

            xhrPosition.open('GET', me.host + "/api/v1/Positions");
            xhrPosition.setRequestHeader('Content-Type', 'application/json');
            xhrPosition.send();

            xhrPosition.onreadystatechange = function () {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhrPosition.readyState === DONE) {
                    if (xhrPosition.status === OK) {
                        var response = JSON.parse(xhrPosition.response);
                        for (let i = 0; i < response.length; i++) {
                            me.listPosition.push(response[i]);
                            var option = `<option value="${response[i].PositionId}">${response[i].PositionName}</option>`;
                            selectPosition.insertAdjacentHTML('beforeend', option);
                        }
                    } else {
                        alert("Không thể tải dữ liệu, vui lòng kiểm tra kết nối!");
                    }
                }
            };

            //Lấy thông tin các cột dữ liệu
            document.querySelector('tbody').innerHTML = "";
            var columns = $('table thead th');

            me.listEmployee = [];

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.open('GET', me.host + me.apiRouter);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();

            xhr.onreadystatechange = function () {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        var response = JSON.parse(xhr.response);
                        for (let i = 0; i < response.length; i++) {
                            me.listEmployee.push(response[i]);

                            var tr = $(`<tr class="table-item" recordId=${response[i].EmployeeId} recordCode=${response[i].EmployeeCode}></tr>`);

                            // Lấy thông tin dữ liệu sẽ map với các cột tương ứng
                            $.each(columns, function (index, th) {
                                var td = $(`<td></td>`);
                                var fieldName = $(th).attr('fieldName');
                                var value = response[i][fieldName];

                                var formatType = $(th).attr('formatType');
                                switch (formatType) {
                                    case "Gender":
                                        value = formatGender(value);
                                        break;
                                    case "Date":
                                        value = formatDate(value);
                                        break;
                                    case "Money":
                                        value = formatMoney(value);
                                        td.addClass("table-item-salary");
                                        break;
                                    case "Position":
                                        value = formatPosition(value, me.listPosition);
                                        break;
                                    case "Department":
                                        value = formatDepartment(value, me.listDepartment);
                                        break;
                                    case "WorkStatus":
                                        value = formatWorkStatus(value);
                                        break;
                                    case "Address":
                                        td.addClass("table-item-address");
                                        break;
                                    case "Email":
                                        td.addClass("table-item-email");
                                        break;
                                    default:
                                        break;
                                }
                                td.append(value);
                                $(tr).append(td);
                            })

                            $('table tbody').append(tr);
                            document.getElementById('loadingIcon').style.display = "none";
                        }
                    } else {
                        alert("Không thể tải dữ liệu, vui lòng kiểm tra kết nối!");
                        document.getElementById('loadingIcon').style.display = "none";
                    }
                }
            };
            
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Set tham số truyền vào filter
     * CreatedBy:Nguyễn Trung Nghĩa (03/12/2020)
     * @param {any} e
     */
    setFilterString(e) {
        var me = this;
        var inputSearch = document.getElementById('searchEmployee').value;
        var departmentId = document.getElementById('searchDepartment').value;
        var positionId = document.getElementById('searchPosition').value;
        departmentId = (departmentId == "all" || departmentId == null) ? "" : departmentId;
        positionId = (positionId == "all" || positionId == null) ? "" : positionId;
        me.filterString = "/filter?specs=" + inputSearch + "&departmentId=" + departmentId + "&positionId=" + positionId + "";
    }

    /**
     * Lọc danh sách theo yêu cầu
     * CreatedBy:Nguyễn Trung Nghĩa (03/12/2020)
     * */
    filterList() {
        var me = this;
        document.getElementById('loadingIcon').style.display = "block";
        try {
            document.querySelector('tbody').innerHTML = "";
            var columns = $('table thead th');

            me.listEmployee = [];

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.open('GET', me.host + me.apiRouter + me.filterString);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();

            xhr.onreadystatechange = function () {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        var response = JSON.parse(xhr.response);
                        for (let i = 0; i < response.length; i++) {
                            me.listEmployee.push(response[i]);

                            var tr = $(`<tr class="table-item" recordId=${response[i].EmployeeId} recordCode=${response[i].EmployeeCode}></tr>`);

                            // Lấy thông tin dữ liệu sẽ map với các cột tương ứng
                            $.each(columns, function (index, th) {
                                var td = $(`<td></td>`);
                                var fieldName = $(th).attr('fieldName');
                                var value = response[i][fieldName];

                                var formatType = $(th).attr('formatType');
                                switch (formatType) {
                                    case "Gender":
                                        value = formatGender(value);
                                        break;
                                    case "Date":
                                        value = formatDate(value);
                                        break;
                                    case "Money":
                                        value = formatMoney(value);
                                        td.addClass("table-item-salary");
                                        break;
                                    case "Position":
                                        value = formatPosition(value, me.listPosition);
                                        break;
                                    case "Department":
                                        value = formatDepartment(value, me.listDepartment);
                                        break;
                                    case "WorkStatus":
                                        value = formatWorkStatus(value);
                                        break;
                                    case "Address":
                                        td.addClass("table-item-address");
                                        break;
                                    case "Email":
                                        td.addClass("table-item-email");
                                        break;
                                    default:
                                        break;
                                }
                                td.append(value);
                                $(tr).append(td);
                            })

                            $('table tbody').append(tr);
                        }
                    } else {
                        alert("Không thể tải dữ liệu, vui lòng kiểm tra kết nối!");
                    }
                }
            };
            document.getElementById('loadingIcon').style.display = "none";
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Hàm xử lí khi nhấn button thêm khách hàng
     * CreatedBy: NTNghia (18/11/2020)
     * */
    btnAddOnClick() {
        var elements = document.getElementsByClassName('input-required');
        for (let i = 0; i < elements.length; i++) {
            elements[i].value = null;
            elements[i].classList.remove('border-red');
        }

        //Hiển thị dialog thêm nhân viên
        document.getElementsByClassName('dialog-modal')[0].style.display = "flex";
        document.getElementById('loadingIcon').style.display = "block";
        document.getElementById('Gender').value = "male";
        document.getElementById('WorkStatus').value = "in";

        try {
            var me = this;
            me.FormMode = 'Add';

            //load dữ liệu cho các combo box
            //lấy dữ liệu phòng ban
            var selectDepartment = document.getElementById('DepartmentId');
            selectDepartment.innerHTML = '';
            me.listDepartment = [];

            var xhrDepartment = new XMLHttpRequest();
            xhrDepartment.withCredentials = true;

            xhrDepartment.open('GET', me.host + "/api/v1/Departments");
            xhrDepartment.setRequestHeader('Content-Type', 'application/json');
            xhrDepartment.send();

            xhrDepartment.onreadystatechange = function () {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhrDepartment.readyState === DONE) {
                    if (xhrDepartment.status === OK) {
                        var response = JSON.parse(xhrDepartment.response);
                        for (let i = 0; i < response.length; i++) {
                            me.listDepartment.push(response[i]);
                            var option = `<option value="${response[i].DepartmentId}" selected="selected">${response[i].DepartmentName}</option>`;
                            selectDepartment.insertAdjacentHTML('beforeend', option);
                        }
                    } else {
                        alert("Không thể tải dữ liệu, vui lòng kiểm tra kết nối!");
                    }
                }
            };

            //lấy dữ liệu chức vụ
            var selectPosition = document.getElementById('PositionId');
            selectPosition.innerHTML = '';
            me.listPosition = [];

            var xhrPosition = new XMLHttpRequest();
            xhrPosition.withCredentials = true;

            xhrPosition.open('GET', me.host + "/api/v1/Positions");
            xhrPosition.setRequestHeader('Content-Type', 'application/json');
            xhrPosition.send();

            xhrPosition.onreadystatechange = function () {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhrPosition.readyState === DONE) {
                    if (xhrPosition.status === OK) {
                        var response = JSON.parse(xhrPosition.response);
                        for (let i = 0; i < response.length; i++) {
                            me.listPosition.push(response[i]);
                            var option = `<option value="${response[i].PositionId}" selected="selected">${response[i].PositionName}</option>`;
                            selectPosition.insertAdjacentHTML('beforeend', option);
                        }
                    } else {
                        alert("Không thể tải dữ liệu, vui lòng kiểm tra kết nối!");
                    }
                }
            };
            document.getElementById('loadingIcon').style.display = "none";
        } catch (e) {
            console.log(e);
        }
    }

    /**
    * Hàm xử lí khi nhấn button lưu
    * CreatedBy: NTNghia (18/11/2020)
    * */
    btnSaveOnClick() {
        var me = this;
        document.getElementById('iconSave').style.display = 'none';
        document.getElementById('pSave').style.display = 'none';
        document.getElementById('loadingIconSave').style.display = 'block';
        try {
            //thu thập dữ liệu được nhập -> build thành object
            var employee = {}

            //lấy tất cả control nhập liệu:
            var input = document.getElementsByTagName('input');
            for (var i = 0; i < input.length; i++) {
                var attr = input[i].id;
                var value = input[i].value;

                if (attr == '') {
                    continue
                }
                else if (attr == 'Salary') {
                    employee[attr] = me.EmployeeSalary;
                }
                else {
                    employee[attr] = value;
                }
            }

            var select = document.getElementsByTagName('select');
            for (var i = 0; i < select.length; i++) {
                var attr = select[i].id;
                var value = select[i].value;

                if (attr == '') {
                    continue
                }
                else if (attr == 'Gender') {
                    if (value == "male")
                        employee[attr] = 1;
                    else if (value == "female")
                        employee[attr] = 0;
                    else
                        employee[attr] = 2;
                }
                else if (attr == 'WorkStatus') {
                    if (value == "in")
                        employee[attr] = 1;
                    else
                        employee[attr] = 0;
                }
                else
                    employee[attr] = value;
            }
 
            console.log(employee);

            if (me.FormMode == 'Edit') {
                employee.EmployeeId = me.recordId;
                //gọi service tương ứng thực hiện lưu trữ dữ liệu
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.open('PUT', me.host + me.apiRouter + '/' + me.recordId);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(employee));

                xhr.onreadystatechange = function () {
                    var DONE = 4; // readyState 4 means the request is done.
                    var OK = 200; // status 200 is a successful return.
                    if (xhr.readyState === DONE) {
                        document.getElementById('iconSave').style.display = 'block';
                        document.getElementById('pSave').style.display = 'block';
                        document.getElementById('loadingIconSave').style.display = 'none';
                        if (xhr.status === OK) {
                            document.getElementsByClassName('dialog-modal')[0].style.display = "none";
                            document.getElementById('snackbar').innerHTML = "Sửa thành công!";
                            document.getElementById('snackbar').style.backgroundColor = "#BAFFE7";
                            me.showToast();
                            me.loadData();
                        } else {
                            var response = JSON.parse(xhr.responseText);
                            var stringRes = response.Data;
                            document.getElementById('snackbar').innerHTML = stringRes;
                            document.getElementById('snackbar').style.backgroundColor = "#FFCECE";
                            me.showToast();
                        }
                    }
                };
            }
            else {
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.open('POST', me.host + me.apiRouter);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(employee));

                xhr.onreadystatechange = function () {
                    var DONE = 4; // readyState 4 means the request is done.
                    var OK = 200; // status 200 is a successful return.
                    if (xhr.readyState === DONE) {
                        document.getElementById('iconSave').style.display = 'block';
                        document.getElementById('pSave').style.display = 'block';
                        document.getElementById('loadingIconSave').style.display = 'none';
                        if (xhr.status === OK) {
                            document.getElementsByClassName('dialog-modal')[0].style.display = "none";
                            document.getElementById('snackbar').innerHTML = "Thêm thành công!";
                            document.getElementById('snackbar').style.backgroundColor = "#BAFFE7";
                            me.showToast();
                            me.loadData();
                        } else {
                            var response = JSON.parse(xhr.responseText);
                            var stringRes = response.Data;
                            document.getElementById('snackbar').innerHTML = stringRes;
                            document.getElementById('snackbar').style.backgroundColor = "#FFCECE";
                            me.showToast();
                        }
                    }
                };
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
    * Hàm xử lí khi nhấn vào 1 hàng trong bảng
    * CreatedBy: NTNghia (19/11/2020)
    * */
    onTableRowClick(e) {
        var me = this;
        var td = document.getElementsByTagName('td')
        for (var i = 0; i < td.length; i++) {
            td[i].classList.remove('row-selected');
        }

        var rowChildren = e.target.parentElement.childNodes;
        for (var i = 0; i < rowChildren.length; i++) {
            rowChildren[i].classList.add('row-selected');
        }

        me.recordId = e.target.parentElement.getAttribute('recordId');
        me.recordCode = e.target.parentElement.getAttribute('recordCode');
    }

    /**
    * Hàm xử lí khi nhấn xóa nhân viên
    * CreatedBy: NTNghia (19/11/2020)
    * */
    showDeleteDialog() {
        var me = this;

        if (me.recordCode != null) {
            document.getElementsByClassName('modal-delete')[0].style.display = "flex";
            document.getElementById('alertInfo').innerHTML = `Bạn có chắc chắn muốn xóa nhân viên ${me.recordCode}?`;
        }
        else {
            document.getElementById('snackbar').innerHTML = "Vui lòng chọn nhân viên cần xóa!";
            document.getElementById('snackbar').style.backgroundColor = "#FFE7AF";
            me.showToast();
        }
    }

    /**
    * Hàm xử lí khi nhấn button xóa
    * CreatedBy: NTNghia (19/11/2020)
    * */
    btnDeleteOnClick() {
        var me = this;
        document.getElementById('pDelete').textContent = '';
        document.getElementById('loadingIconDelete').style.display = 'block';
        try {
            //Gọi service lấy thông tin chi tiết qua id
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.open('DELETE', me.host + me.apiRouter + `/` + me.recordId);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();

            xhr.onreadystatechange = function () {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhr.readyState === DONE) {
                    document.getElementById('pDelete').textContent = 'Đồng ý';
                    document.getElementById('loadingIconDelete').style.display = 'none';
                    if (xhr.status === OK) {
                        document.getElementsByClassName('modal-delete')[0].style.display = "none";
                        document.getElementById('snackbar').innerHTML = 'Xóa thành công!';
                        document.getElementById('snackbar').style.backgroundColor = "#BAFFE7";
                        me.showToast();
                        me.loadData();
                    } else {
                        document.getElementsByClassName('modal-delete')[0].style.display = "none";
                        document.getElementById('snackbar').innerHTML = 'Xóa không thành công!';
                        document.getElementById('snackbar').style.backgroundColor = "#FFCECE";
                        me.showToast();
                    }
                }
            };
        } catch (e) {
            console.log(e);
        }
    }

    /**
    * Hàm xử lí khi nhấn 2 lần vào 1 hàng trong bảng
    * CreatedBy: NTNghia (18/11/2020)
    * */
    trDbClick(e) {
        var me = this;
        var elements = document.getElementsByClassName('input');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('border-red');
        }

        document.getElementsByClassName('dialog-modal')[0].style.display= "flex";
        document.getElementById('loadingIcon').style.display = "block";
        me.FormMode = 'Edit';
        try {
            //load dữ liệu cho các combo box
            //lấy dữ liệu phòng ban
            var selectDepartment = document.getElementById('DepartmentId');
            selectDepartment.innerHTML = '';
            me.listDepartment = [];

            var xhrDepartment = new XMLHttpRequest();
            xhrDepartment.withCredentials = true;

            xhrDepartment.open('GET', me.host + "/api/v1/Departments");
            xhrDepartment.setRequestHeader('Content-Type', 'application/json');
            xhrDepartment.send();

            xhrDepartment.onreadystatechange = function () {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhrDepartment.readyState === DONE) {
                    if (xhrDepartment.status === OK) {
                        var response = JSON.parse(xhrDepartment.response);
                        for (let i = 0; i < response.length; i++) {
                            me.listDepartment.push(response[i]);
                            var option = `<option value="${response[i].DepartmentId}">${response[i].DepartmentName}</option>`;
                            selectDepartment.insertAdjacentHTML('beforeend', option);
                        }
                    } else {
                        alert("Không thể tải dữ liệu, vui lòng kiểm tra kết nối!");
                    }
                }
            };

            //lấy dữ liệu chức vụ
            var selectPosition = document.getElementById('PositionId');
            selectPosition.innerHTML = '';
            me.listPosition = [];

            var xhrPosition = new XMLHttpRequest();
            xhrPosition.withCredentials = true;

            xhrPosition.open('GET', me.host + "/api/v1/Positions");
            xhrPosition.setRequestHeader('Content-Type', 'application/json');
            xhrPosition.send();

            xhrPosition.onreadystatechange = function () {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhrPosition.readyState === DONE) {
                    if (xhrPosition.status === OK) {
                        var response = JSON.parse(xhrPosition.response);
                        for (let i = 0; i < response.length; i++) {
                            me.listPosition.push(response[i]);
                            var option = `<option value="${response[i].PositionId}">${response[i].PositionName}</option>`;
                            selectPosition.insertAdjacentHTML('beforeend', option);
                        }
                    } else {
                        alert("Không thể tải dữ liệu, vui lòng kiểm tra kết nối!");
                    }
                }
            };

            //Lấy khóa chính của bản ghi
            var recordId = me.recordId;

            //Gọi service lấy thông tin chi tiết qua id
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.open('GET', me.host + me.apiRouter + `/${recordId}`);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();

            xhr.onreadystatechange = function () {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        //Binding lên form chi tiết:
                        var res = JSON.parse(xhr.response);
                        var input = document.getElementsByTagName('input');
                        for (var i = 0; i < input.length; i++) {
                            input[i].value = "";
                            var attr = input[i].id;
                            var value = res[attr];
                            if (value != null) {
                                if (input[i].getAttribute('type') == 'date') {
                                    input[i].value = formatDob(value);
                                }
                                else if (input[i].id == 'Salary') {
                                    input[i].value = formatMoney(value);
                                }
                                else {
                                    input[i].value = value;
                                }
                            }
                        }

                        var select = document.getElementsByTagName('select');
                        for (var i = 0; i < select.length; i++) {
                            var attr = select[i].id;
                            var value = res[attr];
                            if (select[i].id == 'Gender') {
                                if (value == 0) {
                                    select[i].value = "female";
                                }
                                else if (value == 1) {
                                    select[i].value = "male";
                                }
                                else {
                                    select[i].value = "bede";
                                }
                            }
                            else if (select[i].id == 'WorkStatus') {
                                if (value == 1) {
                                    select[i].value = "in";
                                }
                                else {
                                    select[i].value = "out";
                                }
                            }
                            else
                                select[i].value = value;
                        }
                    } else {
                        alert("Không thể tải dữ liệu, vui lòng kiểm tra kết nối!");
                    }
                }
            };
            
            document.getElementById('loadingIcon').style.display = "none";
        } catch (e) {
            console.log(e);
            document.getElementById('loadingIcon').style.display = "none";
        }
    }

    /**
    * Hàm kiểm tra nhập thông tin input
    * CreatedBy: NTNghia (18/11/2020)
    * */
    validateInput(e) {
        //Kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo
        var value = e.currentTarget.value;
        if (!value) {
            //this.classList.add("border-red");
            e.currentTarget.classList.add('border-red');
            e.currentTarget.setAttribute('title', 'Trường này không được phép để trống!');
            e.currentTarget.setAttribute('validate', 'false');
        } else {
            e.currentTarget.classList.remove('border-red');
            e.currentTarget.setAttribute('validate', 'true');
        }
    }

    /**
    * Hàm kiểm tra nhập thông tin tiền lương
    * CreatedBy: NTNghia (03/12/2020)
    * */
    validateInputSalary(e) {
        var me = this;
        //Kiểm tra dữ liệu đã nhập, nếu sai thì cảnh báo
        var money = me.formatSalary(e.currentTarget.value);
        console.log(money);
        if (money == "NaN") {
            //this.classList.add("border-red");
            e.currentTarget.classList.add('border-red');
            e.currentTarget.setAttribute('title', 'Không thể định dạng tiền lương!');
            e.currentTarget.setAttribute('validate', 'false');
        } else {
            e.currentTarget.classList.remove('border-red');
            e.currentTarget.setAttribute('validate', 'true');
            e.currentTarget.value = money;
        }
    }

    /**
    * Hàm kiểm tra email đã đúng định dạng?
    * CreatedBy: NTNghia (18/11/2020)
    * */
    validateEmail(e) {
        var value = e.currentTarget.value;
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!testEmail.test(value)) {
            e.currentTarget.classList.add('border-red');
            e.currentTarget.setAttribute('title', 'Email không đúng định dạng!');
            e.currentTarget.setAttribute('validate', 'false');
        }
        else {
            e.currentTarget.classList.remove('border-red');
            e.currentTarget.setAttribute('validate', 'true');
        }
    }

    /**
    * Hàm format định dạng tiền
    * CreatedBy: NTNghia (18/11/2020)
     * */
    formatSalary(money) {
        var format = parseInt(money.replace(/,/g, ""))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        //$(this).val(format);
        return format;
    }

    /**
    * Hàm bắt sự kiện khi nhập lương
    * CreatedBy: NTNghia (03/12/2020)
    * */
    onInputSalary(e) {
        var me = this;
        me.EmployeeSalary = event.target.value;
        console.log(me.EmployeeSalary);
    }

    showToast() {
        // Add the "show" class to DIV
        document.getElementById('snackbar').classList.add("show");

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () { document.getElementById('snackbar').classList.remove("show"); }, 3500);
    }
}