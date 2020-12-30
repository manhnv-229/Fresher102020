
class Base {
    constructor() {
        var me = this;
        me.host = "https://localhost:44323";
        // Mode action
        me.formMode = "";
        // API Route xử lý dữ liệu
        me.route = "";
        // Phương thức gọi API
        me.method = "";
        // Thông báo tương ứng với formMode
        me.mesHeader = "";
        // Tên đối tượng đang xử lý hiện tại
        me.objectName = "";

    }

    /**
     * Thực hiện lấy route
     * CreatedBy dtnga (26/12/2020)
     * */
    getRoute() {
        var me = this;
        var route = $(`.content-body:visible`).attr("route");
        me.route = "/api/v1/" + route;
        return me.route;
    }

    /**
     * Thực hiện lấy tên object đang xử lý
     * CreatedBy dtnga (26/12/2020)
     * */
    getObjectName() {
        var me = this;
        me.objectName = $(`.content-body:visible`).attr("fieldName");
        return me.objectName;
    }

    /**
     * Thực hiện lấy method
     * CreatedBy dtnga (26/12/2020)
     * */
    getMethod() {
        var me = this;
        if (me.formMode == "add") {
            me.method = "POST";
            me.mesHeader = "Thêm ";
        }
        else if (me.formMode == "edit") {
            me.method = "PUT";
            me.mesHeader = "Sửa ";
        }
        else if (me.formMode == "get") {
            me.method = "GET";
            me.mesHeader = "Lấy dữ liệu";
        }
        else if (me.formMode == "delete") {
            me.method = "DELETE";
            me.mesHeader = "Xóa";
        }
        return me.method;
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
            var comboName = $(targetCombo).attr("name");
            var title = (!$(targetCombo).attr("title")) ? "" : $(targetCombo).attr("title");
            var comboSelectBox = $(`<div class="m-input selected-box">
                                       <input class="" type="search" placeholder="`+ title + `"/>
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
            // Option : chọn tất cả item (xóa lọc)
            var optionText = `<div class="option-text">Tất cả</div>`;
            var option = $(`<div class="item combo-item "> </div>`);

            var optionAll = $(`<div class="item combo-item item-hover displayNone" selectAll> <div class="option-icon">
                                   <div class="displayNone m-icon check-icon"></div>
                               </div><div class="option-text">Tất cả</div></div>`);
            comboItemBox.append(optionAll);
            $.each(data, function (index, item) {
                if (item) {
                    var optionName = "";
                    var optionId = "";
                    if (typeof (item) == "string") {
                        optionName = item;
                        optionId = item;
                    }
                    else {
                        var idPropName = comboName + "Id";
                        var namePropname = comboName + "Name";
                        optionName = item[namePropname];
                        optionId = item[idPropName];
                    }
                    var optionText = `<div class="option-text">` + optionName + `</div>`;
                    var option = $(`<div class="item combo-item "></div>`);
                    $(option).data("keyId", optionId);
                    var comboItem = $(optionIcon + optionText);
                    option.append(comboItem);
                    comboItemBox.append(option);
                }
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
                me.onChangeComboInputField(this);
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

    /**
     * Sự kiện khi thay đổi giá trị input tại comboBox/Dropdown
     * @param {Element} input trường input thay đổi tại combobox
     * CreatedBy dtnga (27/12/2020)
     */
    onChangeComboInputField(input) {
        try {
            if (input) {
                var me = this;
                var inputText = $(input).val();
                var box = $(input).closest(".m-box");
                if (!inputText) {
                    $(box).data("keyId", null);
                    $(box).find(".item").removeClass("selected");
                    $(box).find(".item .check-icon").addClass("displayNone");
                    $(box).attr("validate", false);
                    $(box).closest(".input-box").find(".error-empty").removeClass("displayNone");
                }
                var attr = $(box).attr("loadAfterSelect");
                if (typeof attr !== typeof undefined && attr !== false)
                    me.loadData(1);
            }
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
        // Lưu id của item vào combobox
        var id = $(item).data("keyId");
        if(!id) $(comboBox).data("keyId", null);
        $(comboBox).data("keyId", id);
        $(comboBox).attr("validate", true);
        $(comboBox).closest(".input-box").find(".error-empty").addClass("displayNone");
        me.doSomethingWhenItemSelected(item);
    }


    /**
     *  Thực hiện hành động sau khi chọn option tại comboBox/ Dropdown
     * @param {Element} option option được chọn
     *  CreatedBy dtnga (12/12/2020)
     */
    doSomethingWhenItemSelected(option) {
        try {
            var me = this;
            var box = $(option).closest(".m-box");
            var attr = $(box).attr("loadAfterSelect");
            if (typeof attr !== typeof undefined && attr !== false) {
                var optionAttr = $(option).attr("selectAll");
                if (typeof optionAttr !== typeof undefined && optionAttr !== false) {
                    $(box).data("KeyId", null);
                }
                me.loadData(1);
            }
        }
        catch (e) {
            console.log(e);
        }
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
     * Thực hiện lọc
     * @param {Element} input trường input tại comboBox
     * CreatedBy dtnga (28/12/2020)
     */
    onKeyUpInputSearch(input) {
        var textarea = $(input).val().toLowerCase();
        $(input).closest(".m-box").find(".combo-item").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(textarea) > -1);
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

        $(element).on("keydown", function (e) {
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


    /** Hàm thực hiện thêm dữ liệu mới
     * Created By dtnga (21/11/2020)
     * */
    onClick_btnAdd(buttonAdd) {
        try {
            var me = this;
            me.formMode = "add";
            if (!buttonAdd) var dialog = $(`.content-body:visible .m-dialog`);
            else var dialog = $(buttonAdd).closest(`.content-body`).find(`.m-dialog`);
            me.clear(dialog);
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
        }
        catch (e) {
            console.log(e);
        }
    }

    onDeleteSelectedRow() {
        try {
            var me = this;
            var popupDelete = $(`#popup-delete`);
            var parentBody = $(`.content-body:visible`);
            var selectedRows = $(parentBody).find(`table tr.selected`);
            var data = [];
            $.each(selectedRows, function (index, item) {
                data.push($(item).data("keyId"));
            })
            me.route = me.getRoute();
            $.ajax({
                url: me.host + me.route,
                method: "DELETE",
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: "json",
            })
                .done(function (res) {
                    // Ẩn popup
                    $(popupDelete).addClass("displayNone");
                    //Lấy row ngay sau row được chọn và chuyển nó sang trạng thái selected
                    var nextRow = $(selectedRows).last().next();
                    nextRow.addClass("selected");
                    $(nextRow).find(`input[type=checkbox]`).prop("checked", true);
                    // Remove rows được chọn hiện tại
                    $(selectedRows).remove();
                    // Hiển thị toast thông báo thành công
                    me.showToastMesseger("Xóa thành công", "success");
                    if ($(parentBody).find(`table thead input[type="checkbox"]`).is(":checked")) {
                        $(parentBody).find(`table thead input[type="checkbox"]`).prop("checked", false);
                    }
                    me.loadData();
                })
                .fail(function (res) {
                    console.log(res);
                    // Ẩn popup
                    $(popupDelete).addClass("displayNone");
                    // Hiển thị toast thông báo lỗi
                    me.showToastMesseger("Xóa không thành công", "fail");
                })
        }
        catch (e) {

        }
    }

    /**
     * Sự kiện khi click số trang
     * @param {Element} button Button số trang
     * CreatedBy dtnga (26/12/2020)
     */
    onClickPagingNumber(button) {
        try {
            var me = this;
            if (!button)
                button = $(`.content-body:visible .paging-numbber button.selected`);
            var index = convertInt($(button).text().trim());
            me.setPageNumberPosition(index);
            me.loadData(index);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện chuyển đến trang tiếp theo
     * CreatedBy dtnga (26/12/2020)
     */
    onClickNextPage() {
        try {
            var me = this;
            var index = convertInt($(`.content-body:visible .paging-number button.selected`).text().trim()) + 1;
            me.setPageNumberPosition(index);
            me.loadData(index);
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * Thực hiện chuyển đến trang trước
     * CreatedBy dtnga (26/12/2020)
     */
    onClickPreviousPage() {
        try {
            var me = this;
            var index = convertInt($(`.content-body:visible .paging-number button.selected`).text().trim()) - 1;
            me.setPageNumberPosition(index);
            me.loadData(index);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
    * Thực hiện chuyển đến trang đầu tiên
    * CreatedBy dtnga (26/12/2020)
    */
    onClickFirstPage() {
        try {
            var me = this;
            me.setPageNumberPosition(1);
            me.loadData(1);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
    * Thực hiện chuyển đến trang cuối cùng
    * CreatedBy dtnga (26/12/2020)
    */
    onClickLastPage() {
        try {
            var me = this;
            var pagingBar = $(`.content-body:visible .paging`);
            var recordTotal = convertInt($(pagingBar).find(`#total`).text().trim());
            var pageSize = convertInt($(pagingBar).find(`.pageSize`).attr("value"));
            var maxIndex = Math.ceil(recordTotal / pageSize); // Số trang lớn nhất có thể lấy theo tổng số bản ghi
            me.setPageNumberPosition(maxIndex);
            me.loadData(maxIndex);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện đặt vị trí số trang được chọn
     * @param {number} indexPage button số thứ tự trang, nếu không truyền vào thì lấy trang đang chọn hiện tại
     * CreatedBy dtnga (26/12/2020)
     */
    setPageNumberPosition(indexPage) {
        try {
            var pagingBar = $(`.content-body:visible .paging`);
            if (!indexPage) indexPage = $(pagingBar).find(`.paging-number button.selected`).text();
            // set lại giá trị các page number
            var pageNumberbuttons = $(pagingBar).find(`.paging-number button`);
            // tìm vị trang bắt đầu và kết thúc
            var range = $(pageNumberbuttons).length - 1;
            var endIndex = Math.ceil((indexPage * 2 + range) / 2); //Số trang cuối hiển thị trên giao diện
            var startIndex = endIndex - range;

            var recordTotal = convertInt($(pagingBar).find(`#total`).text().trim());
            var pageSize = convertInt($(pagingBar).find(`.pageSize`).attr("value"));
            var maxIndex = Math.ceil(recordTotal / pageSize); // Số trang lớn nhất có thể lấy theo tổng số bản ghi
            if (startIndex < 1) {
                startIndex = 1;
                endIndex = range + 1;
            }
            if (endIndex > maxIndex) {
                endIndex = maxIndex;
                startIndex = ((endIndex - range) < 1) ? 1 : endIndex - range;
            }
            // Xóa hết style của các button tại paging
            $(pageNumberbuttons).removeClass("selected");
            $(pagingBar).find(`button`).prop("disabled", false);
            var i = 0;
            $.each(pageNumberbuttons, function (index, button) {
                var nextIndex = startIndex + i++;
                $(button).text(nextIndex);
                if (nextIndex == indexPage) { // trang được chọn
                    $(button).addClass("selected");
                }
                else if (nextIndex > endIndex)
                    $(button).prop("disabled", true);
            });
            // disable các button chuyển trang nếu gặp trang đầu và cuối
            if (indexPage == 1) {
                $(pagingBar).find(`#previous`).prop("disabled", true);
                $(pagingBar).find(`#jumpToFirst`).prop("disabled", true);
                if (endIndex <= 1) {
                    $(pagingBar).find(`#next`).prop("disabled", true);
                    $(pagingBar).find(`#jumpToLast`).prop("disabled", true);
                }
            }
            else if (indexPage == maxIndex) {
                $(pagingBar).find(`#next`).prop("disabled", true);
                $(pagingBar).find(`#jumpToLast`).prop("disabled", true);
            }
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
            if (mes && state) {
                var toastMes = $(`.m-toast-messeger`);
                $(toastMes).find(`.messeger`).text(mes);
                var iconMes = $(toastMes).find(`.content-icon`);
                var iconExit = $(toastMes).find(`.btn-exit-messeger`);
                if (state.toLowerCase() == "success") {
                    // Hiển thị thông báo thành công
                    $(iconMes).removeClass("fail");
                    $(iconExit).removeClass("fail");
                    $(iconMes).addClass("success");
                    $(iconExit).addClass("success");
                }
                if (state.toLowerCase() == "fail") {
                    // Hiển thị thông báo thất bại
                    $(iconMes).removeClass("success");
                    $(iconExit).removeClass("success");
                    $(iconMes).addClass("fail");
                    $(iconExit).addClass("fail");
                }
                $(toastMes).show();
                me.initEventToastMesseger(toastMes);
                //Set timeout, popup tự đóng sau 3s
                setTimeout(function () {
                    $(`.m-toast-messeger`).hide();
                }, 2000);
            }
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
        if (!dialog) dialog = $(`.content-body:visible .m-dialog`);
        $(dialog).removeClass("displayNone");
        $(dialog).find(`.error-validate`).addClass("displayNone");
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
    onClick_btnSave(buttonSave) {
        try {
            var me = this;
            var button = $(buttonSave);
            var form = $(button).closest(".m-dialog");
            // kiểm tra validate (bắt buộc nhập, email, ...), nếu vẫn còn trường chưa valid thì cảnh báo
            var valid = me.ValidateForm(form);
            if (valid) {
                // build dữ liệu
                var obj = me.GetDataForm(form);
                // Gọi Api Lưu dữ liệu
                me.CallAjax(obj);
                me.loadData();
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện lưu dữ liệu mới và load lại
     * CreatedBy dtnga (24/12/2020)
     * */
    onClick_btnSaveAdd(buttonSave) {
        try {
            var me = this;
            var button = $(buttonSave);
            var form = $(button).closest(".m-dialog");
            // kiểm tra validate (bắt buộc nhập, email, ...), nếu vẫn còn trường chưa valid thì cảnh báo
            var valid = me.ValidateForm(form);
            if (valid) {
                // build dữ liệu
                var obj = me.GetDataForm(form);
                // Gọi Api Lưu dữ liệu
                me.CallAjax(obj);
                me.loadData();
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện gọi Api qua Ajax
     * @param {any} data
     * CreatedBy dtnga (24/12/2020)
     */
    CallAjax(data) {
        try {
            var me = this;
            var response = [];
            me.route = me.getRoute();
            if (data) {
                $.ajax({
                    url: me.host + me.route,
                    method: me.getMethod(),
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    dataType: "json"
                })
                    .done(function (res) {
                            response = res.Data;
                            $(`.m-dialog:visible`).addClass("displayNone");
                            me.showToastMesseger(me.mesHeader + "thành công", "success");
                        
                    })
                    .fail(function (res) {
                        console.log(res);
                        $(`.m-dialog:visible`).addClass("displayNone");
                        me.showToastMesseger(me.mesHeader + "không thành công", "fail");
                    })
            }
            else {
                $.ajax({
                    url: me.host + me.route,
                    method: me.getMethod()
                })
                    .done(function (res) {
                            response = res.Data;
                            $(`.m-dialog:visible`).addClass("displayNone");
                            me.showToastMesseger(me.mesHeader + " thành công", "success");
                       
                    })
                    .fail(function (res) {
                        console.log(res);
                        $(`.m-dialog:visible`).addClass("displayNone");
                        me.showToastMesseger(me.mesHeader + " không thành công", "fail");
                    })
            }
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     *  Thực hiện kiểm tra dữ liệu trong form
     * @param {Element} targetForm form cần kiểm tra
     * CreatedBy dtnga (24/12/2020)
     */
    ValidateForm(targetForm) {
        try {
            var form = $(targetForm);
            var invalidInputs = $(form).find(`input[validate="false"], select[validate="false"], .m-box[validate="false"]`);
            if (invalidInputs && invalidInputs.length > 0) {
                $.each(invalidInputs, function (index, input) {
                    $(input).trigger('blur');
                    var parentBox = $(input).closest(".input-box");
                    $(parentBox).find(`.error-empty`).removeClass("displayNone");
                    // TODO check trùng lặp
                    //var duplicatedAttr = $(input).attr("unduplicated");
                    //if (typeof duplicatedAttr !== undefined && duplicatedAttr !== false)
                    //    $(parentBox).find(`.error-duplicate`).removeClass("displayNone");
                });
                invalidInputs[0].focus();
                return false;
            }
            else
                return true;
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     *  Lấy dữ liệu từ Form
     * @param {Element} targetForm form cần lấy dữ liệu
     *  CreatedBy dtnga (24/12/2020)
     */
    GetDataForm(targetForm) {
        try {
            var me = this;
            var form = $(targetForm);
            var obj = new Object();
            // Lấy Id bản ghi
            var formFieldName = $(form).attr("fieldName");
            var formKeyId = $(form).data("keyId");
            if (formKeyId)
                obj[formFieldName] = formKeyId;
            var inputs = $(form).find(`input, textarea, .m-box`);
            $.each(inputs, function (index, input) {
                var fieldName = $(input).attr('fieldName');
                // Nếu có fieldName mới lấy data
                if (fieldName) {
                    if ($(input).hasClass("m-box")) {
                        var value = $(input).data("keyId");
                    }
                    else
                        var value = $(input).val();
                    // gán dữ liệu vào thuộc tính của obj (json) tương ứng với fieldName
                    if (input.type == "radio") {
                        if (input.checked)
                            obj[fieldName] = value;
                    }
                    else {
                        obj[fieldName] = value;
                    }
                }
            });
            obj["CreatedBy"] = $(targetForm).closest(`body`).find(`.header .username`).text();
            return obj;
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
                $(input).attr('validate', 'false');
                $(input).attr('title', "Trường này không được để trống");
                $(input).closest(".input-box").find(".error-empty").removeClass("displayNone");
                // TODO check trùng
                //    $(input).closest(".input-box").find(".error-duplicate").addClass("displayNone");
            }
            else {
                $(input).removeAttr('validate');
                $(input).removeClass("m-input-warning");
                $(input).closest(".input-box").find(".error-empty").addClass("displayNone");
                // TODO check trùng
                $(input).closest(".input-box").find(".error-duplicate").addClass("displayNone");
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
        var dialog = $(`.content-body:visible`).find(`.m-dialog`);
        this.clear(dialog);
        dialog.addClass("displayNone");
    }

    /** Thực hiện clear dữ liệu và cảnh báo trên object truyền vào hàm
    * CreatedBy dtnga (17/11/2020) 
    */
    clear(obj) {
        $(obj).find(`input, textarea`).val(null);
        $(obj).find(`input[required],input[type="email"]`).removeClass("m-input-warning");
        $(obj).find(`input[required],input[type="email"]`).attr('validate', 'false');
        //clear ngày, select, radio button
        $(obj).find(`input[type="radio"]`).prop('checked', false);
        $(obj).find(`select option`).remove();
        $(obj).find(`.m-box`).data("keyId", null);
        $(obj).find(`.m-box .item`).removeClass("selected");
        $(obj).find(`.m-box .item .check-icon`).addClass("displayNone");
    }

    /** Hàm thực hiện làm mới dữ liệu
     * Created By dtnga (21/11/2020)
     * */
    onClick_btnRefresh() {
        this.loadData();
    }


    /**
    * Tô màu cho bản ghi được chọn
    * CreatedBy dtnga (21/11/2020)
    * */
    tr_onClick(row) {
        try {
            var me = this;
            if ($(`thead input[type="checkbox"]`).is(":checked")) {
                $(`thead input[type="checkbox"]`).prop("checked", false);
                $(`tbody input[type="checkbox"]`).prop("checked", false);
                $(`tbody tr`).removeClass("selected");
                $(row).addClass("selected");
                $(row).find(`input[type="checkbox"]`).prop("checked", true);
                me.checkSelectedRow();
                return;
            }
            else if ($(row).hasClass("selected")) {
                $(row).removeClass("selected");
                $(row).find(`input[type="checkbox"]`).prop("checked", false);
                me.checkSelectedRow();
                return;
            }
            else{
                $(row).addClass("selected");
                $(row).find(`input[type="checkbox"]`).prop("checked", true);
                me.checkSelectedRow();
            }
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
            $(selected).closest(`tbody`).find(`tr`).removeClass("selected");
            $(selected).closest(`tbody`).find(`input[type="checkbox"]`).prop("checked", false);
            $(selected).addClass("selected");
            $(selected).find(`input[type="checkbox"]`).prop("checked", true);
            //Show form cập nhật đơn hàng
            var dialog = $(selected).closest(`.content-body`).find(`.m-dialog`);
            $(dialog).find(`.header-text`).text("CẬP NHẬT");
            // Hiển thị dialog
            me.showDialog(dialog);
            // bind dữ liệu hàng được chọn lên form
            var id = $(selected).data('keyId');
            $(dialog).data("keyId", id);
            // Lấy thông tin từ api bằng id tương ứng
            $.ajax({
                url: me.host + me.getRoute() + "/" + id,
                method: "GET"
            })
                .done(function (res) {
                    var data = res;
                    me.BindDatatoForm(data, dialog);
                })
                .fail(function (res) {
                    console.log(res);
                })


        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện kiểm tra có hàng dữ liệu nào được chọn hay không, không => disable button Xóa
     * CreatedBy dtnga (24/12/2020)
     * */
    checkSelectedRow() {
        try {
            var currentTable = $(`.content-body:visible table`);
            var selectedRow = $(currentTable).find("tbody tr.selected");
            if (selectedRow.length == 0)
                $(`.content-body:visible`).find(`#btnDelete`).prop("disabled", true);
            else
                $(`.content-body:visible`).find(`#btnDelete`).prop("disabled", false);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện đổ dữ liệu vào form
     * @param {any} data dữ liệu cần đổ
     * @param {any} targetForm form cần đổ dữ liệu
     * CreatedBy dtnga (24/12/2020)
     */
    BindDatatoForm(data, targetForm) {
        try {
            var me = this;
            var obj = data;
            var form = $(targetForm);
            var inputs = $(form).find(`input, textarea, .m-box`);
            $.each(inputs, function (index, input) {
                var fieldName = $(input).attr('fieldName');
                // Nếu có fieldName mới lấy data
                if (fieldName) {
                    var value = obj[fieldName];
                    if (!value)
                        value = "";
                    if ($(input).hasClass("m-box")) {
                        $(input).data("keyId", value);
                        // Select item có id như trên
                        me.SelectItem(input, value);
                    }
                    else if (input.type == "radio") {
                        if ($(input).attr("value") == value)
                            $(input).prop("checked", true);
                    }
                    else {
                        $(input).val(value);
                    }
                    $(input).attr("validate", true);
                    $(input).closest(".input-box").find(".error-empty").addClass("displayNone");
                    // TODO check trùng
                    $(input).closest(".input-box").find(".error-duplicate").addClass("displayNone");

                }

            });
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện chọn item trong box (combobox/dropdown)
     * @param {any} box Box cần chọn item
     * @param {any} itemId Id item cần được chọn
     * CreatedBy dtnga (24/12/2020)
     */
    SelectItem(box, itemId) {
        try {
            var me = this;
            var box = $(box);
            var id = itemId;
            var items = $(box).find(`.item`);
            $.each(items, function (index, item) {
                $(item).removeClass("selected");
                $(item).find(`.check-icon`).addClass("displayNone");
                var itemId = $(item).data("keyId");
                if (itemId == id) {
                    // set style cho item được chọn:
                    var selectedItem = $(item);
                    $(selectedItem).addClass("selected");
                    $(selectedItem).find(`.check-icon`).removeClass("displayNone");
                    var selectedItemText = $(selectedItem).find(`.option-text`).text();
                    $(selectedItem).closest(`.m-box`).find(`input`).val(selectedItemText);
                    $(selectedItem).closest(`.m-box`).data("keyId", id);
                    $(box).closest(".input-box").find(".error-empty").addClass("displayNone");
                    return true;
                }
            })
            return false;
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện chọn tất cả bản ghi
    * CreatedBy dtnga (21/11/2020)
     * @param {any} checkbox
     */
    onClickCheckAll(checkbox) {
        try {
            var me = this;
            var checkboxAll = $(checkbox);
            var parentTable = $(checkboxAll).closest(`table`);
            if ($(checkboxAll).is(":checked")) {
                $(parentTable).find(`tbody input[type="checkbox"]`).prop("checked", true);
                $(parentTable).find(`tbody tr`).addClass("selected");
            }
            else {
                $(parentTable).find(`tbody input[type="checkbox"]`).prop("checked", false);
                $(parentTable).find(`tbody tr`).removeClass("selected");
            }
            me.checkSelectedRow();
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
            var deleleteBtn = $(this).closest(`.content-body`).find(`#btnDelete`);
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
     * @param {Element} table Thành phần bảng cần đổ dữ liệu
     * @param {number} pageIndex Số thứ tự trang
     *  Created By dtnga (21/11/2020)
     */
    loadData(pageIndex, targetTable) {
        try {
            var me = this;
            var table = (targetTable) ? $(targetTable) : $(`.content-body:visible`).find(`table`);
            $(table).find(`tbody tr`).remove();
            var currentContent = $(table).closest(`.content-body`);
            var ths = $(table).find('tr th');
            if (!pageIndex)
                // lấy pageIndex hiện tại
                pageIndex = $(currentContent).find(`.paging-number button.selected`).text();
            var pageSize = convertInt($(currentContent).find(`.pageSize`).attr("value"));
            var data = [];
            var total = 0;
            // Lấy data từ Api
            me.route = me.getRoute();
            me.objectName = me.getObjectName();
            // Lấy tất cả dữ liệu tìm kiếm, bộ lọc
            var filterString = "";
            var SearchValue = $(currentContent).find(`.content-filter input[type="search"]`).val();
            filterString = (!SearchValue) ? (filterString + "&KeySearch=") : (filterString + "&KeySearch=" + SearchValue);

            var filterboxs = $(currentContent).find(`.content-filter .m-box`);
            $.each(filterboxs, function (index, item) {
                var filterKey = $(item).attr("fieldName");
                var filterValue = (!$(item).data("keyId")) ? null : $(item).data("keyId");
                if (filterKey && filterValue)
                    filterString = filterString + "&" + filterKey + "=" + filterValue;
                else
                    filterString = filterString + "&" + filterKey + "=";
            });

            $(`.m-loading`).removeClass("displayNone");

            // Lấy dữ liệu thỏa mãn bộ lọc
            $.ajax({
                url: me.host + me.route + "?page=" + pageIndex + "&size=" + pageSize + filterString,
                method: "GET"
            })
                .done(function (res) {
                    $(`.m-loading`).addClass("displayNone");
                    total = res.Total;
                    data = res.Data;
                    $.each(data, function (index, obj) {
                        var tr = $(`<tr></tr>`);
                        // bind dữ liệu vào tr
                        $.each(ths, function (index, th) {
                            var td = $(`<td></td>`);
                            // lấy fielname th 
                            var fieldName = $(th).attr('fieldName');
                            if (fieldName == "Checkbox") {
                                var checkbox = $(`<div><label class="m-checkbox">
                                                <input class="checkbox" type="checkbox" name="row" />
                                                <span class="checkmark"></span>
                                      </label></div>`);
                                td.append(checkbox);
                            }
                            else {
                                //lấy giá trị của thuộc tính tương ứng với fieldname trong obj
                                var value = obj[fieldName];
                                if (value) {
                                    // định dạng lại
                                    var formatType = $(th).attr('formatType');
                                    switch (formatType) {
                                        case "money":
                                            value = formatMoney(value);
                                            td.addClass("text-align-right");
                                            break;
                                        case "dd/mm/yyyy":
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
                        //lưu id vào data
                        var keyIdName = me.objectName + 'Id';
                        tr.data('keyId', obj[keyIdName]);
                    })
                    me.checkSelectedRow(); // nếu không có row nào được chọn -> disable button Xóa
                    // Cập nhật paging
                    // Lấy tổng số bản ghi
                    var pagingText = $(currentContent).find(`.paging-left-text`);
                    var totalSpan = $(pagingText).find(`#total`);
                    $(totalSpan).text(total);
                    var range = $(pagingText).find(`#range`);
                    if (total < 2) {
                        $(range).text(total);
                    }
                    else {
                        var startRecordIndex = (pageIndex - 1) * pageSize + 1;
                        var endRecordIndex = startRecordIndex + pageSize;
                        if (endRecordIndex > total) endRecordIndex = total;
                        $(range).text(startRecordIndex + "-" + endRecordIndex);
                    }
                    me.setPageNumberPosition(pageIndex);

                })
                .fail(function (res) {
                    console.warn("Lỗi load dữ liệu");
                    console.log(res);
                })
            
        }
        catch (e) {
            console.log(e);
        }
    }

}



