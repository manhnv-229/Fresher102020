/**
 * Class quản lý các sự kiện chung của trang web:
 * Author: TVHa (10/11/2020)
 * */
class BaseJS {
    constructor() {
        this.obj = [HTMLTableRowElement];
        this.initEvents();
        this.loadData();
        this.rigthClick();
    }

    /**
     * Hàm xử lý các sự kiện chung của trang web:
     * Author: TVHa (11/11/2020)
     * */
    initEvents() {
        try {
            //lưu vết lựa chọn người dùng
            $("table").on("click", "tbody tr", this.rowOnClick);
            // Nhấn nút "Huỷ" --> thoát form dialog:
            $('#btnCancel').click(this.btnCloseOnClick.bind(this));
            $('.title-button-close').click(this.btnCloseOnClick.bind(this));
            $('#btnNo').click(this.btnCloseOnClick.bind(this));
            $("#btnOK").click(this.btnErrorOnClickOK.bind(this));
            // Nhấn nút "Thêm lao động" --> hiện form dialog nhập liệu:
            $('#btnAdd').click(this.btnAddOnClick.bind(this));
            // Chuột phải vào bản ghi, chọn "Sửa" --> hiện form và mapping dữ liệu sẵn:
            $('#btnEdit').click(this.btnEditOnClick.bind(this));
            // Sự kiện nhấn nút "Lưu" --> thêm hoặc sửa:
            $('#btnSave').click(this.btnSaveOnClick.bind(this));
            $('#btnSaveAndAdd').click(this.btnSaveAndAddOnClick.bind(this));
            // Chuột phải vào bản ghi, nhán nút  "Xoá" --> đưa ra thông báo 'Có chắc muốn xoá bản ghi', xử lý:
            $('.dialog-confirm #btnYes').click(this.deleteObj.bind(this));
            $('#btnDelete').click(this.btnDeleteOnClick.bind(this));
            // Nhân bản 1 bản ghi:
            $('#btnDuplicate').click(this.btnDuplicate.bind(this));
            // Load lại dữ liệu:
            $("#btnLoad").click(this.btnReloadOnClick.bind(this));
            // Bấm phím "Tab" trên form dialog:
            $('#btnHelpDialog').blur(this.targetToStart);
            $('#btnNo').blur(function () {
                $('#btnYes').focus();
            })
            // định dạng tiền tệ trực tiếp trên form dialog:
            $(".money").keyup(this.formatMoney);
            // Xử lý phím tắt:
            $(document).keypress(this.KeyOnPress.bind(this));
            // #region Phân trang
            $("#pageNext").click(this.PagingNext.bind(this)); // Trang kế tiếp
            $("#pagePrev").click(this.PagingPrev.bind(this)); // Trang trước đó
            $("#pageFirst").click(this.PagingFirst.bind(this)); // Trang đầu tiên 
            $("#pageLast").click(this.PagingLast.bind(this)); // Trang cuối cùng
            $("#txbNumberRecord").change(this.PagingRecordOnChange.bind(this)); // Thay đổi số bản ghi 1 trang
            $("#txtPageNumber").change(this.PagingOnChange.bind(this)); // Thay đổi số trang
            // #endregion Phân trang

            // #region Tải ảnh
            $('#btnUpload').click(function () {
                $('#avatarUpload').trigger('click');
                $('#avatarUpload').change(function () {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $('#avatar').attr('src', e.target.result);
                    }
                    reader.readAsDataURL(this.files[0]);
                })
            });
            $('#btn-remove').click(function () {
                $('#avatar').attr('src', "/content/img/default-avatar.jpg");
            })
            // #endregion Tải ảnh
        } catch{
            $(".dialog-modal.error").show();
            $("#errorMessage").html("Bảo trì!");
            $(".dialog-error").show();
            $("#btnOK").focus();
        }
    }

    // #region Phân trang (hàm)
    /**
     * Tiến lên 1 trang
     * Author: TVHa (21/11/2020)
     * */
    PagingNext() {
        try {
            var currentPageNumber = $('#txtPageNumber').val();
            if (currentPageNumber) {
                $("#txtPageNumber").val(Number(currentPageNumber) + 1);
            }
            this.loadData();
        } catch{
        }
    }
    /**
     * Lùi lại 1 trang
     * Author: TVHa (21/11/2020)
     * */
    PagingPrev() {
        try {
            var currentPageNumber = $('#txtPageNumber').val();
            if (currentPageNumber && currentPageNumber > 0) {
                $("#txtPageNumber").val(Number(currentPageNumber) - 1);
            }
            this.loadData();
        } catch{
        }

    }
    /**
     * Về trang đầu tiên
     * Author: TVHa (21/11/2020)
     * */
    PagingFirst() {
        try {
            $("#txtPageNumber").val(1);
            this.loadData();
        } catch{
        }
    }
    /**
     * Tới trang cuối cùng
     * Author: TVHa (21/11/2020)
     * */
    PagingLast() {
        try {
            var pageLast = $("#pageLast").data('totalPage');
            $("#txtPageNumber").val(pageLast);
            this.loadData();
        } catch{
        }
    }
    PagingRecordOnChange() {
        this.loadData();
    }
    PagingOnChange() {
        this.loadData();
    }
    // #endregion Phân trang (hàm)

    // #region Hàm Dựng
    /**
     * (Hàm dựng) Lấy dữ liệu
     * Author: TVHa (14/11/2020)
     * */
    getData() {
        this.Data = [];
        // Các lớp kế thừa sẽ override lại hàm này
    }

    /**
     * (Hàm dựng) Lấy dữ liệu của 1 đối tượng
     * Author: TVHa (14/11/2020)
     * */
    getObjData(recordId) {
        this.Obj = {};
        // Các lớp kế thừa sẽ override lại hàm này
    }

    /**
     * (Hàm dựng) Lưu dữ liệu xuống DB
     * Author: TVHa (14/11/2020)
     * @param {object} obj
     * @param {string} Method
     */
    saveToDB(obj, Method) {
        // Các lớp kế thừa sẽ override lại hàm này
    }

    /**
     * (Hàm dựng) Gửi thông điệp xoá đối tượng xuống DB
     * Author: TVHa (14/11/2020)
     * @param {object} recordId
     */
    deleteFromDB(recordId) {
        // Các lớp kế thừa sẽ override lại hàm này
    }
    // #endregion Hàm dựng

    // #region Phương thức chính
    /**
     * Load dữ liệu
     * Author: TVHa (12/11/2020)
     * */
    loadData() {
        try {
            // Disable các nút:
            $('#btnDuplicate,#btnEdit,#btnDelete,#btnMerge').addClass('hiden');
            // Lấy dữ liệu từ các lớp kế thừa:
            this.getData();
            // Xoá dữ liệu cũ:
            $('table tbody').empty();
            // Đọc thông tin các cột dữ liệu:
            var columns = $('table thead th');
            $('.loading').show();
            // Binding dữ liệu lên table:
            $.each(this.Data, function (i, obj) {
                var tr = $(`<tr class="task"></tr>`);
                $(tr).data('recordId', obj.EmployeeId);
                // Lấy thông tin dữ liệu sẽ map tương ứng với các cột:
                $.each(columns, function (index, th) {
                    var fieldName = $(th).attr('fieldName');
                    var format = $(th).attr('formatType');
                    var value = obj[fieldName], td;
                    if (value == null) value = "";
                    if (fieldName == 'Gender')
                        fieldName = 'GenderName';
                    switch (formatType) {
                        case "money":
                            td.addClass("text-align-right");
                            value = formatMoney(value);
                            break;
                        case 'date':
                            td.addClass("text-align-center");
                            value = formatDate(value);
                            break;
                        default:
                            break;
                    }
                    td.append(value);
                    $(tr).append(td);
                })
                // binding dữ liệu lên UI
                $('table tbody').append(tr);
                $('.loading').hide();
            })
        }
        catch (e) {
            $(".dialog-modal.error").show();
            $("#errorMessage").html("Có lỗi xảy ra, vui lòng thử lại!");
            $(".dialog-error").show();
            $("#btnOK").focus();
        }
    }

    /**
    * Edit dữ liệu
    * Author: TVHa (12/11/2020)
    * */
    btnEditOnClick() {
        try {
            var temp = this;
            // lấy employeeId
            var recordId = temp.data('recordId');
            this.getObjData(recordId); // Lấy dữ liệu của đối tượng được chọn (thực hiện tại các lớp kế thừa)
            if (temp.Obj != null) {
                // Đặt lại validate:
                $('input[required]').removeClass("required-error");
                $('input[required]').removeAttr("placeholder");
                // Hiện form sửa thông tin:
                dialogDetail.dialog('open');
                var inputs = $("input[fieldName], select[fieldName]");
                // Binding dữ liệu lên form chi tiết:
                $.each(inputs, function (index, input) {
                    var propertyName = $(input).attr('fieldName');
                    var formatType = $(input).attr('formatType');
                    if (formatType == "date") {
                        $(input).val(commonJS.formatDateForInput(temp.Obj[propertyName]));
                    } else if (formatType == "money") {
                        $(input).val(commonJS.formatMoney(temp.Obj[propertyName]));
                    }
                    else {
                        $(input).val(temp.Obj[propertyName]);
                    }
                })
                $("#txtEmployeeCode").attr('disabled', 'disabled');// Không cho sửa mã
                // Chuyển trạng thái cho nút "Save" thành "Edit":
                temp.recordId = recordId;
                temp.formMode = "Edit";

            }
        }
        catch (e) {
            $(".dialog-modal.error").show();
            $("#errorMessage").html("Có lỗi xảy ra, vui lòng thử lại!");
            $(".dialog-error").show();
            $("#btnOK").focus();
        }
    }

    /**
     * Sự kiện nhấn nút "Save":
     * Author: TVHa (12/11/2020)
     * */
    btnSaveOnClick() {
        try {
            // Validate dữ liệu trước khi thêm hoặc sửa lần nữa:
            var inputRequireds = $('input[required]');
            var isValid = true;
            $.each(inputRequireds, function (i, item) {
                var valid = $('input').trigger("blur");
                if (isValid && valid.hasClass("required-error"))
                    isValid = false;
            })
            if (isValid == false)
                return;
            // Check email:
            var email = $("#email").val();
            const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (reg.test(String(email).toLowerCase()) == false) {
                $("#email").addClass('required-error');
                $("#email").attr('title', 'Email không đúng định dạng!');
                return false;
            }
            // Check xem là thêm mới hay sửa thông tin:
            var temp = this;
            var method = "POST"; // Mặc định là thêm
            if (temp.formMode == "Edit")
                method = "PUT";
            var obj = {};
            var inputs = $("input[fieldName], select[fieldName]");
            $.each(inputs, function (index, field) {
                var fieldName = $(field).attr('fieldName');
                if (fieldName == "Salary") {
                    obj[fieldName] = Number($(field).val().split('.').join(''));
                } else {
                    obj[fieldName] = $(field).val();
                }
            })
            // Lưu dữ liệu:
            console.log(obj);
            this.saveToDB(obj, method); // Lưu dữ liệu xuống DB (Thực hiện tại các lớp kế thừa)
        } catch (e) {
            $(".dialog-modal.error").show();
            $("#errorMessage").html("Có lỗi xảy ra, vui lòng thử lại!");
            $(".dialog-error").show();
            $("#btnOK").focus();
        }
    }

    /**
     * Sự kiện xoá đối tượng
     * Author: TVHa (12/11/2020)
     * */
    btnDeleteOnClick() {
        try {
            //  Hiện form yêu cầu xác nhận:
            $('.dialog-modal.error').show();
            $("#confirmMessage").html("Bạn có chắc chắn muốn xoá nhân viên đã chọn không?");
            $('.dialog-confirm').show();
            $('.dialog-confirm #btnYes').focus();
        } catch (e) {
            $(".dialog-modal.error").show();
            $("#errorMessage").html("Có lỗi xảy ra, vui lòng thử lại!");
            $(".dialog-error").show();
            $("#btnOK").focus();
        }
    }

    /**
     * Thực hiện việc xóa đối tượng
     * Author: TVHa (12/11/2020)
     * */
    deleteObj() {
        try {
            this.btnCloseOnClick();
            var recordId = $(taskItemInContext).data('recordId');
            this.deleteFromDB(recordId);
        } catch (e) {
            $(".dialog-modal").show();
            $("#errorMessage").html("Có lỗi xảy ra, vui lòng thử lại!");
            $(".dialog-error").show();
            $("#btnOK").focus();
        }
    }

    /**
     * Lấy ra mã lớn nhất
     * Author: TVHa (30/11/2020)
     * */
    getMaxCode() {
        $.ajax({
            url: "/api/employees/getcode/maxcode",
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            async: false
        }).done(function (res) {
            $("#txtEmployeeCode").val(res.responseText);
        }).fail(function (res) {
            $("#txtEmployeeCode").val(res.responseText);
        })
    }

    /**
     * Nhân bản đối tượng
     * Author: TVHa (30/11/2020)
     * */
    btnDuplicate() {
        try {
            var temp = this;
            var recordId = temp.data('recordId');
            this.getObjData(recordId); // Lấy dữ liệu của nhân viên cần nhân bản
            this.getMaxCode(); //Lấy ra mã nhân viên lớn nhất
            this.recordId = null; // Cho id = null;
            this.Obj.EmployeeCode = $("#txtEmployeeCode").val(); // Gán mã nhân viên mới là mã lớn nhất
            this.saveToDB(this.Obj, "POST");
        } catch (e) {
            $(".dialog-modal").show();
            $("#errorMessage").html("Có lỗi xảy ra, vui lòng thử lại!");
            $(".dialog-error").show();
        }
    }
    // #endregion Phương thức chính

    // #region rightClick
    /**
    * Hàm xử lý sự kiện nhấn chuột phải vào 1 bản ghi -> hiện ra contextmenu:
    * Author: TVHa (19/11/2020)
    */
    rigthClick() {
        var temp = this;
        "use strict";

        // #region Hàm bổ trợ
        /**
        * Hàm kiểm tra vị trí click chuột phải có phải vùng có class là "className" hay không:
        * @param {Object} e sự kiện
        * @param {String} className tên class muốn kiểm tra
        * @return {Boolean}
        * Author: TVHa (21/11/2020)
        */
        function clickInsideElement(e, className) {
            var el = e.srcElement || e.target;

            if (el.classList.contains(className)) {
                return el;
            } else {
                while (el = el.parentNode) {
                    if (el.classList && el.classList.contains(className)) {
                        return el;
                    }
                }
            }
            return false;
        }

        /**
        * Hàm lấy vị trí chính xác của chuột:
        * @param {Object} e nơi đặt con trỏ chuột
        * @return {Object} trả về giá trị toạ độ đặt con trỏ chuột
        * Author: TVHa (21/11/2020)
        */
        function getPosition(e) {
            var posx = 0;
            var posy = 0;

            if (!e) var e = window.event;

            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            return {
                x: posx,
                y: posy
            }
        }
        // #endregion Hàm bổ trợ

        // #region Hàm chính
        var contextMenuClassName = "context-menu";
        var contextMenuItemClassName = "context-menu__item";
        var contextMenuLinkClassName = "context-menu__link";
        var contextMenuActive = "context-menu--active";

        var taskItemClassName = "task";
        var taskItemInContext;

        var clickCoords;
        var clickCoordsX;
        var clickCoordsY;

        var menu = document.querySelector("#context-menu");
        var menuItems = menu.querySelectorAll(".context-menu__item");
        var menuState = 0;
        var menuWidth;
        var menuHeight;
        var menuPosition;
        var menuPositionX;
        var menuPositionY;

        var windowWidth;
        var windowHeight;

        /**
        * Hàm khởi tạo:
        * Author: TVHa (21/11/2020)
        */
        function init() {
            contextListener();
            clickListener();
            keyupListener();
            resizeListener();
        }

        /**
        * Hàm bắt sự kiện mở contextmenu:
        * Author: TVHa (21/11/2020)
        */
        function contextListener() {
            document.addEventListener("contextmenu", function (e) {
                taskItemInContext = clickInsideElement(e, taskItemClassName);

                if (taskItemInContext) {
                    e.preventDefault();
                    toggleMenuOn();
                    positionMenu(e);
                } else {
                    taskItemInContext = null;
                    toggleMenuOff();
                }
            });
        }

        /**
        * Hàm bắt sự kiện click vào bản ghi:
        * Author: TVHa (21/11/2020)
        */
        function clickListener() {
            document.addEventListener("click", function (e) {
                var clickeElIsLink = clickInsideElement(e, contextMenuLinkClassName);

                if (clickeElIsLink) {
                    e.preventDefault();
                    menuItemListener(clickeElIsLink);
                } else {
                    var button = e.which || e.button;
                    if (button === 1) {
                        toggleMenuOff();
                    }
                }
            });
        }

        /**
        * Hàm xử lý nhấn phím [Esc] --> ẩn contextmenu:
        * Author: TVHa (21/11/2020)
        */
        function keyupListener() {
            window.onkeyup = function (e) {
                if (e.keyCode === 27) {
                    toggleMenuOff();
                }
            }
        }

        /**
        * Hàm xử lý sự kiện thay đổi kích thước cửa sổ --> ẩn contextmenu:
        * Author: TVHa (21/11/2020)
        */
        function resizeListener() {
            window.onresize = function (e) {
                toggleMenuOff();
            };
        }

        /**
        * Hàm hiện contextmenu:
        * Author: TVHa (21/11/2020)
        */
        function toggleMenuOn() {
            if (menuState !== 1) {
                menuState = 1;
                menu.classList.add(contextMenuActive);
            }
        }

        /**
        * Hàm ẩn contextmenu:
        * Author: TVHa (21/11/2020)
        */
        function toggleMenuOff() {
            if (menuState !== 0) {
                menuState = 0;
                menu.classList.remove(contextMenuActive);
            }
        }

        /**
        * Hàm đặt contextmenu đúng vị trí:
        * @param {Object} e vị trí đặt chuột
        * Author: TVHa (21/11/2020)
        */
        function positionMenu(e) {
            clickCoords = getPosition(e);
            clickCoordsX = clickCoords.x;
            clickCoordsY = clickCoords.y;

            menuWidth = menu.offsetWidth + 4;
            menuHeight = menu.offsetHeight + 4;

            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;

            if ((windowWidth - clickCoordsX) < menuWidth) {
                menu.style.left = windowWidth - menuWidth + "px";
            } else {
                menu.style.left = clickCoordsX + "px";
            }

            if ((windowHeight - clickCoordsY) < menuHeight) {
                menu.style.top = windowHeight - menuHeight + "px";
            } else {
                menu.style.top = clickCoordsY + "px";
            }
        }

        /**
        * Hàm thực thi hành động khi nhấn vào tuỳ chọn:
        * @param {HTMLElement} link tuỳ chọn vừa được click
        * Author: TVHa (21/11/2020)
        */
        function menuItemListener(link) {
            console.log("Task item in content - " + taskItemInContext + ", Task action - " + link.getAttribute("data-action"));

            if (link.getAttribute('data-action') == 'Edit') {
                temp.formMode = 'Edit';
                temp.btnEditOnClick();
            }
            else {
                temp.formMode = 'Delete';
                temp.btnDeleteOnClick();
            }
            toggleMenuOff();
        }
        // #endregion Hàm chính

        // Chạy chương trình:
        init();
    }
    // #endregion rightClick

    // #region oldCode
    //initEvents() {
    //    var temp = this;

    //    // Sự kiện click nút load lại dữ liệu:
    //    $('#btnRefresh').click(function () {
    //        temp.loadData();
    //    }.bind(this))

    //    // Sự kiện click nút thêm mới:
    //    $('#btnAdd').click(function () {
    //        try {
    //            temp.formMode = 'Add';
    //            dialogDetail.dialog('open');
    //            $('input').val(null);
    //            // Lấy dữ liệu cho các combobox:
    //            //temp.loadComboBox();
    //        } catch (e) {
    //            $('.loading').hide();
    //            console.log(e);
    //        }
    //    })

    //    // Sự kiện click nút huỷ:
    //    $('#btnCancel').click(function () {
    //        dialogDetail.dialog('close');
    //    })

    //    // Sự kiện khi click nút lưu:
    //    $('#btnSave').click(function () {
    //        // Validate dữ liệu:
    //        inputValidates();
    //        // Kiểm tra xem phương thức hiện tại là thêm hay sửa:
    //        if (temp.formMode == 'Add') {
    //            btnSaveMethod('POST');
    //        }
    //        else if (temp.formMode == 'Edit') {
    //            var id = temp.recordId;
    //            btnSaveMethod('PUT', id);
    //        }
    //    }.bind(this))

    //    //Hiển thị thông tin chi tiết khi nhấn đúp chuột vào 1 bản ghi:
    //    $('table tbody').on('dblclick', 'tr', function () {
    //        temp.formMode = 'Edit';
    //        dialogDetail.dialog('open');
    //        var obj = this;
    //        temp.loadEditForm(obj);
    //    })

    //    /**
    //     * Hàm xác định và thực hiện phương thức cho nút [Save] (thêm / sửa):
    //     * @param {string} method
    //     * @param {string} status
    //     * @param {string} id
    //     * Author: TVHa (18/11/2020)
    //     */
    //    function btnSaveMethod(method, id) {
    //        //  Thu thập thông tin dữ liệu được nhập -> build thành object:
    //        var inputs = $('input[fieldName], select[fieldValue]');
    //        var obj = {};
    //        $.each(inputs, function (index, input) {
    //            var propertyName = $(this).attr('fieldName');
    //            // Check trường hợp input là select thì lấy giá trị Id của nó:
    //            if ($(this).attr('type') == 'select')
    //                propertyName = $(this).attr('fieldValue');
    //            var value = $(this).val();
    //            // Check trường hợp input là radio thì chỉ lấy giá trị checked:
    //            if ($(this).attr('type') == 'radio') {
    //                if (this.checked)
    //                    obj[propertyName] = value;
    //            }
    //            else
    //                obj[propertyName] = value;
    //        })
    //        console.log(obj);
    //        obj.EmployeeId = id;
    //        temp.callService(method, id, obj);
    //    }

    //    /**
    //     * Hàm kiểm tra tính đúng đắn của input:
    //     * Author: TVHa (12/11/2020)
    //     * */
    //    function inputValidates() {
    //        var inputValidates = $('input[required], input[type="email"]');
    //        $.each(inputValidates, function (index, input) {
    //            $(input).trigger('blur');
    //        })
    //        var inputNotValids = $('input[validate="false"]');
    //        if (inputNotValids && inputNotValids.length > 0) {
    //            alert('Dữ liệu không hợp lệ, vui lòng kiểm tra lại!');
    //            inputNotValids[0].focus();
    //            return;
    //        }
    //    }

    //    /**
    //     * Validate bắt buộc nhập với các trường required:
    //     * Author: TVHa (15/11/2020)
    //     * */
    //    $('input[required]').blur(function () {
    //        //Kiểm tran dữ liệu khi nhập, nếu để trống -> cảnh báo:
    //        var value = $(this).val();
    //        if (!value) {
    //            $(this).addClass('border-red');
    //            $(this).attr('validate', false);
    //            $(this).attr('title', 'Trường này không được để trống!');
    //        }
    //        else {
    //            $(this).removeClass('border-red');
    //            $(this).attr('validate', true);
    //            $(this).removeAttr('title', 'Trường này không được để trống!');
    //        }
    //    })

    //    /**
    //     *Validate bắt buộc nhập và đúng định dạng với trường email:
    //     * Author: TVHa (15/11/2020)
    //     * */
    //    $('input[type="email"]').blur(function () {
    //        var value = $(this).val();
    //        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    //        if (!testEmail.test(value)) {
    //            $(this).addClass('border-red');
    //            $(this).attr('validate', false);
    //            $(this).attr('title', 'Email không đúng định dạng!');
    //        }
    //        else {
    //            $(this).removeClass('border-red');
    //            $(this).attr('validate', true);
    //            $(this).removeAttr('title', 'Email không đúng định dạng!');
    //        }
    //    })


    //}

    ///**
    //* Hàm load dữ liệu:
    //* Author: TVHa (12/11/2020)
    //* */
    //loadData() {
    //    var temp = this;

    //    try {
    //        $('table tbody').empty();
    //        // Lấy thông tin các cột dữ liệu:
    //        var columns = $('table thead th');
    //        var tempId = temp.apiRouter == 'api/employees' ? 'CustomerId' : 'EmployeeId';
    //        $('.loading').show();
    //        $.ajax({
    //            url: temp.host + temp.apiRouter,
    //            method: "GET",
    //            async: false,
    //        }).done(function (res) {
    //            $.each(res, function (index, obj) {
    //                var tr = $(`<tr class="task"></tr>`);
    //                $(tr).data('recordId', obj.tempId);
    //                // Lấy thông tin dữ liệu sẽ map tương ứng với các cột:
    //                $.each(columns, function (index, th) {
    //                    var td = $(`<td><div><span></span></div></td>`);
    //                    var fieldName = $(th).attr('fieldName');
    //                    if (fieldName == 'Gender')
    //                        fieldName = 'GenderName';
    //                    var value = obj[fieldName];
    //                    var formatType = $(th).attr('formatType');
    //                    switch (formatType) {
    //                        case "ddmmyyyy":
    //                            td.addClass("text-align-center");
    //                            value = formatDate(value);
    //                            break;
    //                        case "money":
    //                            td.addClass("text-align-right");
    //                            value = formatMoney(value);
    //                            break;
    //                        default:
    //                            break;
    //                    }
    //                    td.append(value);
    //                    $(tr).append(td);
    //                })
    //                $('table tbody').append(tr);
    //                $('.loading').hide();
    //            })
    //        }).fail(function (res) {
    //            $('.loading').hide();
    //        })
    //    }
    //    catch (e) {
    //        console.log(e);
    //    }
    //}

    ///**
    //* Hàm gọi service thực thi phương thức thêm/sửa/xoá trên server:
    //* @param {string} method phương thức được gọi
    //* @param {object} obj đối tượng được gọi
    //* @param {string} id id của đối tượng
    //* Author: TVHa (20/11/2020)
    //*/
    //callService(method, id, obj) {
    //    var temp = this;

    //    //  Gọi service tương ứng thực hiện tác vụ:
    //    $.ajax({
    //        url: temp.host + temp.apiRouter,
    //        method: method,
    //        data: JSON.stringify(obj),
    //        contentType: 'application/json'
    //        // Đưa ra thông báo, ẩn form chi tiết, load lại dữ liệu khi đã thêm/sửa/xoá thành công:
    //    }).done(function (res) {
    //        alert('Thàng công!!');
    //        dialogDetail.dialog('close');
    //        temp.loadData();
    //    }).fail(function (res) {
    //        console.log(res);
    //    })
    //}

    

    ///**
    //* Hàm nạp dữ liệu cho dialog khi nhấn nút [Sửa] hoặc double-click vào 1 bản ghi:
    //* @param {[object HTMLTableRowElement]} obj
    //* Author: TVHa (20/11/2020)
    //*/
    //loadEditForm(obj) {
    //    var temp = this;

    //    // Lấy khoá chính của bản ghi:
    //    var recordId = $(obj).data('recordId');
    //    temp.recordId = recordId;
    //    // Gọi service lấy thông tin chi tiết qua Id:
    //    $.ajax({
    //        url: temp.host + temp.apiRouter + `/${recordId}`,
    //        method: 'GET',
    //    }).done(function (res) {
    //        //Binding dữ liệu lên form chi tiết:
    //        var inputs = $('input[fieldName], select[fieldName]');
    //        $.each(inputs, function (index, input) {
    //            var propertyName = $(this).attr('fieldName');
    //            var value = res[propertyName];
    //            // Check trường ngày tháng năm sinh:
    //            if (propertyName == 'DateOfBirth') {
    //                var date = new Date(value);
    //                if (Number.isNaN(date.getTime()) == NaN)
    //                    return '';
    //                else {
    //                    var day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();
    //                    if (day < 10)
    //                        day = '0' + day;
    //                    if (month < 10)
    //                        month = '0' + month;
    //                    var result = year + '-' + month + '-' + day;
    //                    $(this).val(result);
    //                }
    //            }
    //            // Check trường nhóm khách hàng:
    //            else if (propertyName == 'CustomerGroupName') {
    //                temp.loadComboBox();
    //                $(this).val(value);
    //            }
    //            // Check trường giới tính:
    //            else if (propertyName == 'Gender') {
    //                if (value == 0)
    //                    $(this).val(0);
    //            }
    //            else
    //                $(this).val(value);
    //        })
    //    }).fail(function (res) {
    //        console.log(res);
    //    })
    //}

    ///**
    //* Hàm load dữ liệu cho ô các combo-box:
    //* Author: TVHa (17/11/2020)
    //* */
    //loadComboBox() {
    //    var temp = this;

    //    var selects = $('select[fieldValue]');
    //    selects.empty();
    //    $.each(selects, function (index, select) {
    //        var api = $(select).attr('api');
    //        var fieldName = $(select).attr('fieldName');
    //        var fieldValue = $(select).attr('fieldValue');
    //        $('.loading').show();
    //        // Lấy dữ liệu:
    //        $.ajax({
    //            url: temp.host + api,
    //            method: 'GET'
    //        }).done(function (res) {
    //            if (res) {
    //                $.each(res, function (index, obj) {
    //                    var option = $(`<option value="${obj[fieldValue]}">${obj[fieldName]}</option>`);
    //                    selects.append(option);
    //                })
    //            }
    //            $('.loading').hide();
    //        }).fail(function (res) {

    //        })
    //    })
    //}
    // #endregion oldCode
}