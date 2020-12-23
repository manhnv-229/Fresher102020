﻿
class Base {
    constructor() {
        var me = this;
        me.Host = "https://localhost:44323";
        me.Route = "";
        me.ObjectName = "";
    }

    getRoute() {
        var me = this;
        me.ObjectName = $(`.content-body:visible`).attr("fieldName");
        me.Route = "/api/v1/" + me.ObjectName + "s";
        return me.Route;
    }


    /* Hàm thực hiện khởi tạo sự kiện
     * CreatedBy dtnga (21/11/2020)
     * */
    initEvent() {
        try {
            var me = this;
            $(`.content-body:visible`).find(`#btn-add`).on("click", function () {
                me.onClick_btnAdd(this);
            });
            $(`.content-body:visible`).find(`#btn-delete`).on("click", function () {
                me.onClick_btnDelete(this);
            });
            $(`.content-body:visible`).find(`#btn-refresh`).on("click", me.onClick_btnRefresh.bind(me));
            $(`#btn-create`).on("click", me.onClick_btnCreate.bind(me));
            $(`#btn-clear`).on("click", me.onClick_btnClear.bind(me));
            // TODO sự kiện khi nhập trường Tìm kiếm

            // TODO Sự kiện khi chọn filter

            // format khi nhập liệu số tiền
            me.autoFormatMoney();
            me.addFocusSupport();
            // Sự kiện khi thao tác với từng hàng dữ liệu trong bảng
            $(`table tbody`).on("click", "tr", me.tr_onClick);
            $(`table tbody`).on("dblclick", "tr", function () {
                me.onDblClick_trow(this);
            });
            // sự kiện khi tick vào checkbox/ nhiều checkbox
            $(`table thead input[type="checkbox"]`).on("click", me.onClickCheckAll);
            // sự kiện khi blur các trường input
            $(`input`).blur(me.onBlur_inputField);

            // Sự kiện khi click navitem
            $('.nav-item').on('click', function () {
                $('.nav-item').removeClass('select-menu-item');
                $('.nav-item .nav-item-icon ').removeClass('active');
                $(this).addClass('select-menu-item');
                $(this).find(`.nav-item-icon`).addClass("active");
                // Ẩn các content
                $(`.content-body`).addClass("displayNone");
                // Hiển thị content tương ứng
                var fieldName = $(this).attr("fieldName");
                var content = $(`.content-body[fieldName="` + fieldName + `"]`);
                $(content).removeClass("displayNone");
                $(`.content-header-title`).text(content.attr("titleName"));
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Sinh combobox với danh sách option cho trước
     * CreatedBy dtnga (10/12/2020)
     * @param {object} data danh sách option
     * @param {Element} targetCombo comboBox cần gen dữ liệu
     */
    createComboBox(data, targetCombo) {
        try {
            var me = this;
            var targetCombo = $(targetCombo);
            var fieldName = $(targetCombo).attr("fieldName");
            var comboSelectBox = $(`<div class="m-input selected-box">
                                       <input class="" type="search"/>
                                       <div class="arrow-button">
                                            <div class="m-icon arrow-icon"></div>
                                       </div>
                                     </div>`);
            targetCombo.append(comboSelectBox);
            var wrapper = $(`<div class="wrapper displayNone"> </div>`);
            var comboItemBox = $(`<div class="inner-wrapper combo-item-box "> </div>`);
            var optionIcon = `<div class="option-icon">
                                   <div class="displayNone m-icon check-icon"></div>
                               </div>`;
            var idPropName = fieldName + "Id";
            var namePropname = fieldName + "Name";
            $.each(data, function (index, item) {
                var optionName = item[namePropname];
                var optionId = item[idPropName];
                var optionText = `<div class="option-text">` + optionName + `</div>`;
                var option = $(`<div class="item combo-item "></div>`);
                $(option).data("keyId", optionId);
                var comboItem = $(optionIcon + optionText);
                option.append(comboItem);
                comboItemBox.append(option);
            })
            wrapper.append(comboItemBox);
            targetCombo.append(wrapper);
            // sự kiện khi click ra ngoài combo-item-box => đóng comboItemBox
            me.detectClickOutside(wrapper);
            // Focus vào item đầu tiên
            $(comboItemBox).find(`.item:first-child`).addClass("item-hover");
            // Khởi tạo sự kiện cho từng thành phần
            var comboInputField = $(targetCombo).find(`.selected-box input`);
            var comboButton = $(targetCombo).find(`.arrow-button`);
            // Sự kiện khi focus/blur trường nhập liệu tại combobox
            //TODO tạo auto complete cho input field
            $(comboInputField).focus(function () {
                $(targetCombo).addClass("green-border");
            })
            $(comboInputField).blur(function () {
                $(targetCombo).removeClass("green-border");
            })
            me.detectKeyCode(comboInputField);
            // Sự kiện khi click erase icon trong input search
            $(comboInputField).on("search", function () {
                $(targetCombo).data("keyId", null);
            });
            // sự kiện khi click chọn combo item
            $(comboItemBox).find(`.item`).on("click", function () {
                me.onSelect_comboItem(this);
            });
            // Sự kiện khi click arrow icon tại combo box
            $(comboButton).on("click", function () {
                me.onClick_btnComboBoxButton(comboButton);
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Sự kiện khi click button tại combobox
     * CreatedBy dtnga (10/12/2020)
     * */
    onClick_btnComboBoxButton(comboButton) {
        var me = this;
        if (!$(comboButton).hasClass("arrow-button-clicked")) {
            // quay ngược arrow icon
            $(comboButton).addClass("rotate");
            $(comboButton).addClass(`arrow-button-clicked`);
            // combobox
            var comboBox = $(comboButton).closest(`.m-box`);
            $(comboBox).addClass("green-border");

            var comboItemBox = $(comboBox).find(`.wrapper`);
            if ($(comboItemBox).hasClass("displayNone")) {
                $(comboItemBox).removeClass("displayNone");
                $(comboBox).find(`input`).focus();
            }
            return;
        }
        //else {
        //    alert("sdsd");
        //    // quay ngược arrow icon
        //    $(comboButton).removeClass("rotate");
        //    $(comboButton).removeClass("arrow-button-clicked");
        //    // combobox
        //    var comboBox = $(comboButton).closest(`.m-box`);
        //    $(comboBox).removeClass("green-border");
        //    // box chứa các option
        //    var comboItemBox = $(comboBox).find(`.wrapper`);
        //    $(comboItemBox).addClass("displayNone");
        //}
    }

    /**
     * Sự kiện khi chọn item
     * CreatedBy dtnga(10/12/2020)
     * @param {element} selectedItem item được chọn
     */
    onSelect_comboItem(selectedItem) {
        var me = this;
        var item = selectedItem;
        // combobox
        var comboBox = $(item).closest(`.m-box`);
        $(comboBox).removeClass("green-border");
        // Arrow-button
        $(comboBox).find(`.arrow-button`).removeClass("rotate");
        $(comboBox).find(`.arrow-button`).removeClass("arrow-button-clicked");
        // inner-wrapper, các item còn lại
        var comboItemBox = $(item).closest(".inner-wrapper");
        var items = $(comboItemBox).find(`.item`);
        $.each(items, function (index, item) {
            $(item).removeClass("selected");
            $(item).find(`.option-icon .check-icon`).addClass("displayNone");
        })
        // item được chọn
        $(item).removeClass("item-hover");
        $(item).addClass("selected");
        $(item).find(`.option-icon .check-icon`).removeClass("displayNone");
        // ẩn option box 
        $(comboItemBox).find(`.item:first-child`).addClass("item-hover");
        $(comboItemBox).parent().addClass("displayNone");
        // đổ dữ liệu lên input field
        var optionText = $(item).find(`.option-text`);
        var optionText = $(optionText).text();
        var inputField = $(comboBox).find(`input`);
        $(inputField).val(optionText);
        // hiện delete-icon

        // Lưu id của item vào combobox
        var id = $(item).data("keyId");
        $(comboBox).data("keyId", id);

        me.doSomethingWhenItemSelected(item);
    }

    /**
     *  Thực hiện hành động sau khi chọn option tại comboBox/ Dropdown
     *  CreatedBy dtnga (12/12/2020)
     * @param {Element} option
     */
    doSomethingWhenItemSelected(option) {

    }

    /**
     * Ẩn container nếu click ra ngoài container
     * CreatedBy dtnga (10/12/2020)
     * @param {Element} container
     */
    detectClickOutside(container) {
        var parent = $(container).parent();
        $(document).mouseup(function (e) {
            // Nếu container đang mở
            if (!$(container).hasClass("displayNone")) {
                // Nếu target không phải container
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    $(container).addClass("displayNone");
                    $(container).find(`.item`).removeClass("item-hover");
                    $(container).find(`.item:first-child`).addClass("item-hover");
                    $(parent).find(`.arrow-button`).removeClass("rotate");
                    $(parent).find(`.arrow-button`).removeClass("arrow-button-clicked");
                    $(parent).removeClass("green-border");
                }
            }

        });
    }

    /**
     * Sự kiện khi ấn phím tại trường nhập liệu của combobox/Dropdown
     * CreatedBy dtnga (10/12/2020)
     * @param {Element} element trường nhập liệu tại combobox/Dropdown
     */
    detectKeyCode(element) {
        var me = this;
        var parent = $(element).closest(".m-box");
        var wrapper = $(parent).find(`.wrapper`);
        var innerWrapper = $(parent).find(".inner-wrapper");

        $(element).on("keyup", function (e) {
            if (e.which == 13) {
                if ($(wrapper).hasClass(".displayNone")) {
                }
                else {
                    var hoverdItem = $(innerWrapper).find('.item-hover');
                    me.onSelect_comboItem(hoverdItem);
                }
                return;
            }
            $(wrapper).removeClass("displayNone");
            $(parent).find(".arrow-button").addClass("rotate");
            $(parent).find(".arrow-button").addClass(`arrow-button-clicked`);
            if (e.which == 40) {
                $(innerWrapper).find('.item:not(:last-child).item-hover').removeClass('item-hover').next().addClass('item-hover');

            } else if (e.which == 38) {
                $(innerWrapper).find('.item:not(:first-child).item-hover').removeClass('item-hover').prev().addClass('item-hover');
            }
            me.centerItFixedHeight($(wrapper).find('.item-hover'), wrapper);
        });
    }

    /**
     * Thực hiện đưa target vào giữa của outer (theo chiều dọc)
     * CreatedBy dtnga (23/12/2020)
     * @param {any} target item cần đưa vào giữa
     * @param {any} outer  thành phần scroll chứa các item
     */
    centerItFixedHeight(target, outer) {
        var out = $(outer);
        var tar = $(target);
        var x = out.height();
        var y = tar.outerHeight(true);
        var z = tar.index();
        out.scrollTop(Math.max(0, (y * z) - (x - y) / 2));
    }

    /**
     * Hàm thực hiện khởi tạo sự kiện trên popup
     *  CreatedBy dtnga (30/11/2020)
     * @param {Element} popup cần khởi tạo sự kiện
     */
    initEventPopup(popup) {
        $(`.m-popup #btn-exit-popup`).on("click", function () {
            $(popup).addClass("displayNone");
        });
        $(`.m-popup #btn-cancel-popup`).on("click", function () {
            $(popup).addClass("displayNone");
        });
        $('body').on("keydown", function (e) {
            if (e.which === 27)
                $(popup).addClass("displayNone");
        });
    }


    /** Hàm thực hiện set AutoComplete cho các trường yêu cầu AutoComplete
     * CreatedBy dtnga (28/11/200)
     * */
    autoComplete() {
        try {
            var inputs = $(`input[autocomplete="on"]`);
            $.each(inputs, function (index, input) {
                var fieldName = $(input).attr("fieldName");
                var data = listProduct;
                //Tạo source theo fielName của trường input
                var sourceList = [];
                $.each(data, function (index, item) {
                    var label = item[fieldName];
                    var value = item["ProductId"]; // TODO :)
                    sourceList.push({ label: label, value: value });
                });
                $(input).autocomplete({
                    source: sourceList,
                    autoFocus: true,
                    focus: function (event, suggest) {
                        $(input).val(suggest.item.label);
                        return false;
                    },
                    select: function (event, suggest) {
                        $(input).val(suggest.item.label);
                        var id = suggest.item.value;
                        return false;
                    }
                });
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Hàm thực hiện clear dữ liệu khi nhấn button Clear
     * CreatedBy dtnga (27/11/2020)
     * */
    onClick_btnClear() {
        var me = this;
        me.clear($(`.dialog-detail`));
        // CLear giỏ hàng
        $(`.product-list`).children().remove();
        // Cập nhật tổng số lượng sản phẩm
        $(`.total-quantity span`).text("0");
        // Cập nhật tổng giá trị giỏ hàng
        $(`.total-money`).text(0);
        $(`.total-money`).attr("value", 0);
        //Ẩn các box thông báo/ thông tin thêm
        $(`.empty-result`).addClass("displayNone");
        $(`.extra-info`).addClass("displayNone");
    }

    /**TODO Hàm thực hiện thêm đơn hàng
     * CreatedBy dtnga (27/11/2020)
     * */
    onClick_btnCreate() {
        try {
            var me = this;
            // kiểm tra validate (bắt buộc nhập, email, ...), nếu vẫn còn trường chưa valid thì cảnh báo
            var invalidInputs = $(`input[validate="false"], select[validate="false"]`);
            if (invalidInputs && invalidInputs.length > 0) {
                $.each(invalidInputs, function (index, input) {
                    $(input).trigger('blur');
                });
                invalidInputs[0].focus();
            }
            // build dữ liệu
            // Lấy dữ liệu từ input
            var obj = new Object();
            var inputs = $(`.dialog-detail input`);
            $.each(inputs, function (index, input) {
                var value = $(input).val();
                var fieldName = $(input).attr('fieldName');
                // gán dữ liệu vào thuộc tính của obj (json) tương ứng với fieldName
                if (input.type == "radio") {
                    if (input.checked)
                        obj[fieldName] = value;
                }
                else {
                    obj[fieldName] = value;
                }
            });
            console.log(obj);
            if (me.formMode == "add") var method = "POST";
            else if (me.formMode == "edit") var method = "PUT";

            //Đóng gói danh sách sản phẩm => Danh sách orderDetail

            // Đóng gói đơn vị vận chuyển => Transportor

            // Đóng gói người nhận => receiver

            // Lưu và thêm 

        }
        catch (e) {
            console.log(e);
        }
    }

    /** Hàm thực hiện thêm dữ liệu mới
     * Created By dtnga (21/11/2020)
     * */
    onClick_btnAdd(buttonAdd) {
        try {
            var me = this;
            me.formMode = "add";
            var dialog = $(buttonAdd).closest(`.content-body`).find(`.m-dialog`);
            me.showDialog(dialog);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     *  thực hiện xóa bản ghi được chọn khi click button Xóa
     *  CreatedBy dtnga (23/12/2020)
     * @param {any} buttonDelte
     */
    onClick_btnDelete(buttonDelete) {
        try {
            var me = this;
            var button = $(buttonDelete);
            // Hiện Popup Xóa
            var popup = $(`#popup-delete`);
            var bodyPopupText = $(popup).find(`.popup-body-text`);

            $(popup).removeClass("displayNone");
            me.initEventPopup(popup);
            // Sự kiện khi click button Xóa
            $(popup).find(`.btn-delete`).on("click", function () {
                var parentBody = $(button).closest(`.content-body`);
                var selectedRows = $(parentBody).find(`table tr.selected`);
                var data = [];
                $.each(selectedRows, function (index, item) {
                    data.push($(item).data("keyId"));
                })

                me.Route = me.getRoute();
                $.ajax({
                    url: me.Host + me.Route + "/range",
                    method: "DELETE",
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    dataType: "json",
                })
                    .done(function (res) {
                        // Ẩn popup
                        $(popup).addClass("displayNone");
                        //Lấy row ngay sau row được chọn và chuyển nó sang trạng thái selected
                        var nextRow = $(selectedRows).last().next();
                        nextRow.addClass("selected");
                        $(nextRow).find(`input[type=checkbox]`).prop("checked", true);
                        // Remove rows được chọn hiện tại
                        $(selectedRows).remove();
                        // Hiển thị toast thông báo thành công
                        me.showToastMesseger("Xóa thành công", "success");
                    })
                    .fail(function (res) {
                        console.log(res);
                        // Ẩn popup
                        $(popup).addClass("displayNone");
                        // Hiển thị toast thông báo lỗi
                        me.showToastMesseger("Xóa không thành công", "fail");
                    })
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Hiển thị Toast messeger thông báo
     * @param {string} mes Câu thông báo
     * @param {string} state Trạng thái thông báo (success/fail)
     */
    showToastMesseger(mes, state) {
        try {
            var me = this;
            if (state.toLowerCase() == "success") {
                // Hiển thị thông báo thành công
                var toastMes = $(`#success-messeger`);
                $(toastMes).find(`.messeger`).text(mes);
                $(toastMes).show();
                me.initEventToastMesseger(toastMes);
            }
            if (state.toLowerCase() == "fail") {
                // Hiển thị thông báo thất bại
                var toastMes = $(`#fail-messeger`);
                $(toastMes).find(`.messeger`).text(mes);
                $(toastMes).show();
                me.initEventToastMesseger(toastMes);
            }
            //Set timeout, popup tự đóng sau 3s
            setTimeout(function () {
                $(`.m-toast-messeger`).hide();
            }, 2000);

        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Sự kiện trên Toast thông báo
     * CreatedBy dtnga (23/12/2020)
     * @param {Element} toastMes ToastMessger
     */
    initEventToastMesseger(toastMes) {
        var toastMessger = $(toastMes);
        $(toastMessger).find(`.btn-exit-messeger`).on("click", function () {
            $(toastMessger).hide();
        });
    }
    /**
     * Thực hiện hiển thị dialog và khởi tạo các sự kiện liên quan
     * CreatedBy dtnga (26/11/2020)
     * @param {Element} dialog dialog cần hiển thị
     */
    showDialog(dialog) {
        var me = this;
        var dialog = $(dialog);
        dialog.show();
        // đóng form khi nhấn ESC
        $('body').on("keydown", function (e) {
            if (e.which === 27)
                $(dialog).addClass("displayNone");
        });
        $(`#btn-exit`).on("click", me.onClick_Exit_Dialog.bind(me));
        $(`#btn-cancel`).on("click", me.onClick_Exit_Dialog.bind(me));
        $(`#btn-save`).on("click", me.onClick_btnSave.bind(me));
        //$(`#btn-saveAdd`).on("click", me.onClick_btnSaveAdd.bind(me));
    }



    /** Tự động format các trường input số tiền 
    * CreatedBy dtnga (26/11/2020) 
     */
    autoFormatMoney() {
        var moneyInputs = $('input[typeFormat="money"]');
        $.each(moneyInputs, function (index, input) {
            $(input).on("keyup", function (e) {
                var selection = window.getSelection().toString();
                if (selection !== '') {
                    return;
                }
                if ($.inArray(e.which, [38, 40, 37, 39]) !== -1) {
                    return;
                }
                var ip = $(this).val();
                // Loại bỏ các kí tự k phải số
                var ip = ip.replace(/[\D\s\._\-]+/g, "");
                // convert thành ip số
                ip = ip ? parseInt(ip, 10) : 0;
                $(this).attr("value", ip);
                $(this).val(function () {
                    return (ip === 0) ? "" : ip.toLocaleString("vi-VN");
                });
            });
        })
    }

    /**Kiểm tra và build dữ liệu trước khi lưu 
     Createdby dtnga (14/11/2020)
     */
    onClick_btnSave() {
        try {
            var me = this;
            // kiểm tra validate (bắt buộc nhập, email, ...), nếu vẫn còn trường chưa valid thì cảnh báo
            var invalidInputs = $(`input[validate="false"], select[validate="false"]`);
            if (invalidInputs && invalidInputs.length > 0) {
                $.each(invalidInputs, function (index, input) {
                    $(input).trigger('blur');
                });
                invalidInputs[0].focus();
            }
            // build dữ liệu
            // Lấy dữ liệu từ input
            var obj = new Object();
            var inputs = $(`.m-dialog input`);
            $.each(inputs, function (index, input) {
                var value = $(input).val();
                var fieldName = $(input).attr('fieldName');
                // gán dữ liệu vào thuộc tính của obj (json) tương ứng với fieldName
                if (input.type == "radio") {
                    if (input.checked)
                        obj[fieldName] = value;
                }
                else {
                    obj[fieldName] = value;
                }
            });
            console.log(obj);
            if (me.formMode == "add") var method = "POST";
            else if (me.formMode == "edit") var method = "PUT";
            //TODO Gọi Api Lưu dữ liệu
            //$.ajax({
            //    url: me.Host + me.apiRouter,
            //    method: method,
            //    data: JSON.stringify(obj),
            //    contentType: "application/json"
            //}).done(function (res) {
            //    me.status = "success";
            //    me.openToastMesseger();
            //}).fail(function (res) {
            //    console.log(res);
            //    me.status = "fail";
            //    me.openToastMesseger();
            //})

            // Lưu và thêm 

        }
        catch (e) {
            console.log(e);
        }
    }

    /** Hàm hỗ trợ focus nhập liệu
     * CreatedBy dtnga (25/11/2020)
     * */
    addFocusSupport() {
        try {
            var inputs = $(`input, textarea`);
            // focus đến ô nhập liệu đầu tiên
            inputs[0].focus();
            $(inputs).focus(function () {
                $(this).select();
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Kiểm tra input có hợp lệ không 
    * CreatedBy dtnga (08/12/2020)
     */
    onBlur_inputField() {
        var input = this;
        if ($(input).is(":required")) {
            var value = $(input).val();
            if (!value || !value.trim()) {
                $(input).addClass("m-input-warning");
                $(input).attr('validate', 'fasle');
                $(input).attr('title', "Trường này không được để trống");
            }
            else {
                $(input).removeAttr('validate');
                $(input).removeClass("m-input-warning");
            }
        }
    }

    /**Kiểm tra dữ liệu, nếu trống thì cảnh báo
     * Createdby dtnga (14/11/2020)
     * */
    checkRequired() {
        // nếu dữ liệu trống thì cảnh báo
        $(`input[required]`).blur(function () {
            var value = $(this).val();
            if (!value || !value.trim()) {
                $(this).addClass("m-input-warning");
                $(this).attr('validate', 'fasle');
                $(this).attr('title', "Trường này không được để trống");
            }
            else {
                $(this).removeAttr('validate');
                $(this).removeClass("m-input-warning");
            }
        });
    }

    /**
     * validate trường email
     * @param {string} email email
     CreatedBy dtnga (14/11/2020)
     */
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $(`input[type='email']`).blur(function () {
            var email = $(this).val();
            if (!re.test(email)) {
                $(this).addClass("m-input-warning");
                $(this).attr('title', "Email phải có dạng example@gmail.com");
            } else {
                $(this).removeClass("m-input-warning");
            }
        });
    }

    /** Đóng dialog thêm
     Created by dtnga (14/11/2020)
     */
    onClick_Exit_Dialog() {
        var dialog = $(`.m-dialog`);
        this.clear(dialog);
        dialog.hide();
    }

    /** Thực hiện clear dữ liệu và cảnh báo trên object truyền vào hàm
    * CreatedBy dtnga (17/11/2020) 
    */
    clear(obj) {
        $(obj).find(`input`).val(null);
        $(obj).find(`input[required],input[type="email"]`).removeClass("m-input-warning");
        $(obj).find(`input[required],input[type="email"]`).attr('validate', 'false');
        //clear ngày, select, radio button
        $(obj).find(`input[type="radio"]`).prop('checked', false);
        $(obj).find(`select option`).remove();
    }

    /** Hàm thực hiện làm mới dữ liệu
     * Created By dtnga (21/11/2020)
     * */
    onClick_btnRefresh() {
        this.loadData();
        alert("Refresh success.");
    }


    /**
    * Tô màu cho bản ghi được chọn
    * CreatedBy dtnga (21/11/2020)
    * */
    tr_onClick() {
        try {
            if ($(`thead input[type="checkbox"]`).is(":checked")) {
                $(`thead input[type="checkbox"]`).prop("checked", false);
                $(`tbody input[type="checkbox"]`).prop("checked", false);
                $(`tbody tr`).removeClass("selected");
                $(this).addClass("selected");
                $(this).find(`input[type="checkbox"]`).prop("checked", true);
                return;
            }
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
                $(this).find(`input[type="checkbox"]`).prop("checked", false);
                return;
            }
            $(this).addClass("selected");
            $(this).find(`input[type="checkbox"]`).prop("checked", true);
            var deleleteBtn = $(this).closest(`.content-body`).find(`#btn-delete`);
            deleleteBtn.prop("disabled", false);
        }
        catch (e) {
            console.log(e);
        }
    }


    /**
     * Hiển thị form Sửa thông tin khi double click vào 1 bản ghi
     * CreatedBy dtnga (21/11/2020)
     * @param {Element} row Row được click
     */
    onDblClick_trow(row) {
        try {
            var me = this;
            me.formMode = "edit";
            //Đổi màu hàng dữ liệu
            var selected = $(row);
            $(row).closest(`tbody`).find(`tr`).removeClass("selected");
            $(selected).addClass("selected");
            //Show form cập nhật đơn hàng
            var dialog = $(selected).closest(`.content-body`).find(`.m-dialog`);
            $(dialog).find(`.header-text`).text("CẬP NHẬT");
            // Hiển thị dialog
            me.showDialog(dialog);
            //TODO  bind dữ liệu hàng được chọn lên form
            var id = selected.data('keyId');
            // Lấy thông tin từ api bằng id tương ứng



        }
        catch (e) {
            console.log(e);
        }
    }

    /** Thực hiện chọn tất cả bản ghi
    * CreatedBy dtnga (21/11/2020)
     */
    onClickCheckAll() {
        try {
            var checkboxAll = this;
            var parentTable = $(this).closest(`table`);
            if ($(checkboxAll).is(":checked")) {
                $(parentTable).find(`tbody input[type="checkbox"]`).prop("checked", true);
                $(parentTable).find(`tbody tr`).addClass("selected");
            }
            else {
                $(parentTable).find(`tbody input[type="checkbox"]`).prop("checked", false);
                $(parentTable).find(`tbody tr`).removeClass("selected");
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Thực hiện select tại dòng có checkbox selected
     *CreatedBy dtnga (08/12/2020) 
     **/
    onClickCheckBox() {
        try {
            var checkbox = this;
            if ($(this).is(":checked")) {
                $(this).prop("checked", false);
                var trow = $(checkbox).closest(`tr`);
                $(trow).removeClass("selected");
                return;
            }

            var trow = $(checkbox).closest(`tr`);
            $(trow).addClass("selected");
            var deleleteBtn = $(this).closest(`.content-body`).find(`#btn-delete`);
            deleleteBtn.prop("disabled", false);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Xử lý data tại mỗi td đặc biệt của table
     * CreatedBy dtnga (22/12/2020)
     * @param {string} fieldName
     * @param {object} obj
     */
    customeProcessTd(fieldName, obj) {
        return obj[fieldName];
    }

    /**
     * Hàm base thực hiện load dữ liệu lên table
     *  Created By dtnga (21/11/2020)
     * @param {Element} table Thành phần bảng cần đổ dữ liệu
     */
    loadData(table) {
        try {
            var me = this;
            var ths = $(table).find('tr th');
            var data = [];
            // Lấy data từ Api
            $.ajax({
                url: me.Host + me.Route,
                method: "GET"
            })
                .done(function (res) {
                    data = res.Data;
                    $.each(data, function (index, obj) {
                        var tr = $(`<tr></tr>`);
                        $.each(ths, function (index, th) {
                            var td = $(`<td></td>`);
                            // Lấy fielname th 
                            var fieldName = $(th).attr('fieldName');
                            if (fieldName == "Checkbox") {
                                var checkbox = $(`<div><label class="m-checkbox">
                                                <input class="checkbox" type="checkbox" name="row" />
                                                <span class="checkmark"></span>
                                      </label></div>`);
                                td.append(checkbox);
                            }
                            else {
                                //Lấy giá trị của thuộc tính tương ứng với fieldName trong obj
                                var value = me.customeProcessTd(fieldName, obj);
                                if (value) {
                                    // định dạng lại
                                    var formatType = $(th).attr('formatType');
                                    switch (formatType) {
                                        case "money":
                                            value = formatMoney(value);
                                            td.addClass("text-align-right");
                                            break;
                                        case "ddmmyy":
                                            value = formatDate(value, "dd/mm/yyyy");
                                            td.addClass("text-align-center");
                                            break;
                                        default:
                                            break;
                                    }
                                }
                                else value = "...";
                                var span = `<span>` + value + `</span>`;
                                var div = `<div>` + span + `</div>`;
                                // gán vào td -> tr
                                td.append(div);
                            }
                            tr.append(td);
                        })
                        $(table).find(`tbody`).append(tr);
                        //Lưu Id vào data
                        var keyIdName = me.ObjectName + 'Id';
                        tr.data('keyId', obj[keyIdName]);
                    })
                    // Mặc định chọn row đầu tiên
                    $(table).find(`tbody tr:first`).select();
                    $(table).find(`tbody tr:first`).addClass("selected");
                    $(table).find(`tbody tr:first input[type="checkbox"]`).prop("checked", true);
                    $(table).closest(`.content-body`).find(`#btn-delete`).prop("disabled", false);
                })
                .fail(function (res) {
                    console.log(res);
                })
        }
        catch (e) {
            console.log(e);
        }
    }
}


