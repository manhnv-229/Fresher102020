$(document).ready(function () {
    var owner = new Owner();
})


var orderState = [];

class Owner extends Base {
    constructor() {
        super();
        var me = this;
        $(`.m-loading`).removeClass("displayNone");
        me.userInfo = JSON.parse(sessionStorage.getItem("user"));
        me.loadAccount();
        me.loadComboBoxCustome();
        me.initEvent();
    }



    /** Thực hiện load thông tin cửa hàng do user làm chủ
     * CreatedBy dtnga (27/11/2020)
     * */
    loadComboBoxCustome() {
        try {
            var me = this;
            // trạng thái đơn hàng
            var route = "/api/v1/Orders/state"
            $.ajax({
                url: me.host + route,
                method: "GET"
            })
                .done(function (res) {
                    var targetBoxs = $(document).find(`.m-box[name="OrderState"]`);
                    orderState = res;
                    $.each(targetBoxs, function (index, item) {
                        me.createComboBox(orderState, item);
                    });
                })
                .fail(function (res) {
                    console.log(res);
                })


            // danh sách cửa hàng
            //lấy danh sách cửa hàng theo UserId từ API
            var userId = me.userInfo["UserId"];
            var route = "/api/v1/Users/" + userId + "/shops";
            $.ajax({
                url: me.host + route,
                method: "GET"
            }).done(function (res) {
                var shops = res;
                var comboBoxShop = $(`#cb-Shop`);
                me.createComboBox(shops, comboBoxShop);
                var firstItem = $(comboBoxShop).find(".item")[0];
                $(firstItem).trigger("click");
                // Tạo sự kiện khi click item
                $(comboBoxShop).find(`.item`).on("click", function () {
                    // load lại đơn hàng
                    var loadDataAttr = $(`.select-menu-item`).attr("loadData");
                    if (typeof loadDataAttr !== typeof undefined && loadDataAttr !== false)
                        me.loadData(1);
                    // load lại đơn vị vận chuyển
                    var loadTrans = $(`.select-menu-item`).attr("loadTrans");
                    if (typeof loadTrans !== typeof undefined && loadTrans !== false)
                        me.loadTransportComboBox();
                });
                me.loadTransportComboBox();
                me.creatPagingSizeBox();
                var defaultSelectedItem = $(`.paging .m-box[name="PageSize"] .item`)[0];
                $(defaultSelectedItem).trigger("click");
            })
                .fail(function (res) {
                    console.log(res);
                })

            // danh sách tỉnh/thành
            me.loadProvince();
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Tạo pagingSize
     * CreatedBy dtnga (31/12/2020)
     * */
    creatPagingSizeBox() {
        try {
            var me = this;
            // Tạo pagingSize
            var pagingSize = ["15", "20", "30", "40", "50"];
            var targetComboboxs = $(`.paging .m-box[name="PageSize"]`);
            $.each(targetComboboxs, function (index, item) {
                me.createComboBox(pagingSize, item);
                $(item).find(`.item`).on("click", function () {
                    var pageSize = $(this).find(`.option-text`).text();
                    $(this).closest(`.pageSize`).attr("value", pageSize);
                    me.loadData(1);
                });
            });
        }
        catch (e) {
            console.log(e);
        }

    }

    /**
     * Thực hiện load danh sách đơn vị vận chuyển
     * createdBy dtnga (31/12/2020)
     * */
    loadTransportComboBox() {
        try {
            var me = this;
            // Danh sách đơn vị vận chuyển
            var comboBoxShop = $(`#cb-Shop`);
            var shopId = $(comboBoxShop).data("keyId");
            var route = "/api/v1/Shops/" + shopId + "/transportors";
            $.ajax({
                url: me.host + route,
                method: "GET"
            })
                .done(function (res) {
                    var transportors = res;
                    var cbTrans = $(`.content-body`).find(`#cb-transportor`);
                    $.each(cbTrans, function (index, item) {
                        me.createComboBox(transportors, item);
                    });
                })
                .fail(function (res) {
                    console.log(res);
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    /* Hàm thực hiện khởi tạo sự kiện
     * CreatedBy dtnga (21/11/2020)
     * */
    initEvent() {
        try {
            var me = this;
            // Sự kiện khi click navitem
            $('.nav-item').on('click', function (e) {
                event.stopPropagation();
                $('.nav-item').removeClass('select-menu-item');
                $('.nav-item .nav-item-icon ').removeClass('active');
                $(this).addClass('select-menu-item');
                $(this).find(`.nav-item-icon`).addClass("active");
                // Ẩn các content
                $(`.content-body`).addClass("displayNone");
                // Hiển thị content tương ứng
                var fieldName = $(this).attr("name");
                var content = $(`.content-body[name="` + fieldName + `"]`);
                $(content).removeClass("displayNone");
                $(`.content-header-title`).text(content.attr("titleName"));
                // load data tương ứng với content
                var loadAttr = $(this).attr("loadData");
                if (typeof loadAttr !== typeof undefined && loadAttr !== false) {
                    var defaultSelectedItem = $(content).find(`.paging .m-box[name="PageSize"] .item`)[0];
                    $(defaultSelectedItem).trigger("click");
                }
            });

            // Logout
            $(`#btnLogout`).on("click", me.onclick_btnLogout.bind(me));
            // filter
            // Sự kiện các button tại content-filter
            $(`.content-body`).find(`#btn-add`).on("click", function () {
                me.onClick_btnAdd(this);
            });
            $(`.content-body`).find(`#btnDelete`).on("click", function () {
                me.onClick_btnDelete(this);
            });
            $(`.content-body`).find(`#btn-refresh`).on("click", function () {
                me.onClick_btnRefresh(this);
            });

            $(`#btn-create`).on("click", me.onClick_btnCreate.bind(me));
            $(`#btn-clear`).on("click", me.onClick_btnClear.bind(me));
            //sự kiện khi nhập trường Tìm kiếm
            $(`.content-filter input[type="search"]`).on("search", function () {
                me.loadData(1);
            });
            $(`.content-filter input[type="search"]`).on("keyup", function (e) {
                if (!$(this).val())
                    me.loadData(1);
            });
            //popup
            $(`#btn-delete-popup`).on("click", me.onDeleteSelectedRow.bind(me));

            //paging
            $(`.paging-number button`).on("click", function () {
                me.onClickPagingNumber(this);
            });
            $(`.paging #next`).on("click", me.onClickNextPage.bind(me));
            $(`.paging #previous`).on("click", me.onClickPreviousPage.bind(me));
            $(`.paging #jumpToFirst`).on("click", me.onClickFirstPage.bind(me));
            $(`.paging #jumpToLast`).on("click", me.onClickLastPage.bind(me));

            // sự kiện khi blur các trường input
            $(`input`).blur(function () {
                me.onBlur_inputField(this);
            });
            // Select toàn bộ text khi focus field nhập liệu
            $(`input, textarea`).focus(function () {
                $(this).select();
            });
            // Dialog
            var dialog = $(`.content-body .m-dialog`);
            // đóng form khi nhấn ESC
            $('body').on("keydown", function (e) {
                if (e.which === 27)
                    $(dialog).addClass("displayNone");
            });
            $(dialog).find(`#btn-exit`).on("click", me.onClick_Exit_Dialog.bind(me));
            $(dialog).find(`#btn-cancel`).on("click", me.onClick_Exit_Dialog.bind(me));
            $(dialog).find(`#btn-save`).on("click", function (e) {
                event.stopPropagation();
                me.onClick_btnSave(this);
            });

            // format khi nhập liệu số tiền
            me.autoFormatMoney();
            // kiểm tra dữ liệu
            me.validateEmail();

            // Sự kiện khi thao tác với từng hàng dữ liệu trong bảng
            $(`table tbody`).on("click", "tr", function (e) {
                event.stopPropagation();
                me.tr_onClick(this);
            });
            $(`table tbody`).on("dblclick", "tr", function () {
                if ($(this).closest(`.content-body`).attr("name") == "order")
                    me.onDblClick_Order(this);
                else
                    me.onDblClick_trow(this);
            });
            $(`table thead input[type="checkbox"]`).on("click", function () {
                me.onClickCheckAll(this);
            })

            // Sự kiện tự động thêm sản phẩm vào giỏ khi click nút Thêm vào giỏ
            $(`#btn-addToShoppingCard`).on("click", me.onClick_addToShoppingCard.bind(me));
            $(`.content-body input[type="radio"][fieldName="ShippingPaidBy"]`).on("change", me.updateOrderTotal.bind(me));
            // Sự kiện trên trang Add Order:
            $(`#order-add`).find(`.content-box[name="product"]`).find(`input[type="search"]`).on("search", function (e) {
                if ($(this).val())
                    me.checkProduct(this);

            });
            $(`.content-body`).find(`input[type="search"][fieldName="PhoneNumber"]`).on("keyup", function (e) {
                if (e.which == 13 && $(this).val() && $(this).val().trim()) {
                    me.checkCustomer(this);
                }
            });
            $(`#order-add input[fieldName="ShippingFee"]`).on("keyup", me.updateOrderTotal.bind(me));

        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Thực hiện kiểm tra thông tin sản phẩm, nếu có hiển thị auto complete
     * @param {any} productInputField trường nhập thông tin tìm kiêm sản phẩm
     */
    checkProduct(productInputField) {
        if (!productInputField)
            productInputField = $(`#order-add .content-box[name="product"]`)
                .find(`input[type="search"][fieldName="ProductCode"]`);
        var me = this;
        var keyWord = $(productInputField).val();
        var shopId = $(`#cb-Shop`).data("keyId");
        if (!shopId) return;
        var route = "/api/v1/Products?shopId=" + shopId + "&keyword=" + keyWord;
        $.ajax({
            url: me.host + route,
            method: "GET"
        })
            .done(function (res) {
                var products = res;
                if (products.length > 0) {
                    // tạo autoComplete
                    me.createAutoComplete(products, productInputField);
                }
                else {
                    // Không có sản phẩm thỏa mãn
                    me.showNotificationPopup("Không có sản phẩm thỏa mãn. vui lòng kiểm tra lại.");
                    return;
                }
            })
            .fail(function (res) {
                console.log(res);
            })
    }

    /**
     * Thực hiện tạo auto complete cho trường nhập liệu
     * @param {any} data dữ liệu đổ vào auto complete
     * @param {any} targetInput trường nhập liệu mục tiêu
     */
    createAutoComplete(data, targetInput) {
        // tạo auto complete
        try {
            if (data && targetInput) {
                var targetContainer = $(targetInput).closest(".input-box").find(`.m-autoComplete`);
                var me = this;
                $(targetContainer).children().remove();
                var comboName = $(targetContainer).attr("name");

                var wrapper = $(`<div class="wrapper"> </div>`);
                var comboItemBox = $(`<div class="inner-wrapper combo-item-box "> </div>`);
                var optionIcon = `<div class="option-icon">
                                   <div class="displayNone m-icon check-icon"></div>
                               </div>`;

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
                targetContainer.append(wrapper);

                // sự kiện khi click ra ngoài combo-item-box => đóng comboItemBox
                me.detectClickOutside(targetContainer);
                // Focus vào item đầu tiên
                $(comboItemBox).find(`.item:first-child`).addClass("item-hover");
                // Sự kiện khi focus/blur trường nhập liệu mục tiêu
                $(targetInput).focus(function () {
                    $(targetInput).closest(`.m-input`).addClass("green-border");
                })
                $(targetInput).blur(function () {
                    $(targetInput).closest(`.m-input`).removeClass("green-border");
                })
                $(targetInput).focus();
                me.detectKeyCode(targetInput);
                // Sự kiện khi click erase icon trong input search
                $(targetInput).on("search", function () {
                    me.onChangeComboInputField(this);
                });
                // sự kiện khi click chọn combo item
                $(comboItemBox).find(`.item`).on("click", function () {
                    me.onSelect_comboItem(this);
                });
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
   * Thực hiện kiểm tra khách hàng đã có thông tin trên hệ thống hay chưa
   * CreatedBy dtnga (02/12/2020)
   * @param {string} tel trường tìm kiếm theo số điện thoại
   */
    checkCustomer(tel) {
        try {
            var me = this;
            // Lấy thông tin số điện thoại
            var phoneNumber = $(tel).val().trim();
            var contentBox = $(tel).closest(`.content-box`);
            if (phoneNumber) {
                var route = "/api/v1/Customers/PhoneNumber/" + phoneNumber;
                $.ajax({
                    url: me.host + route,
                    method: "GET"
                })
                    .done(function (res) {
                        var customer = res;
                        // Nếu có thông tin => tự động bind dữ liệu vào box-info
                        if (customer) {
                            $(`.empty-result`).addClass("displayNone");
                            me.autoBindCustomer(contentBox, customer);
                            $(contentBox).find(`.box-info`).removeClass("displayNone");
                            $(tel).val('');
                        }
                        // Nếu chưa có thông tin => Hiển thị thông báo Chưa có dữ liệu
                        else {
                            $(tel).focus();
                            $(`.empty-result`).removeClass("displayNone");
                            $(`.box-info input`).val("");
                            $(`.box-info`).removeClass("displayNone");
                        }
                    })
                    .fail(function (res) {
                        console.log(res);
                    })
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
  *Thực hiện bind dữ liệu khách hàng tự động
  * CreatedBy dtnga (02/12/2020)
  * @param {object} targetBox Box chứa thông tin
  * @param {object} customer Thông tin khách hàng
  */
    autoBindCustomer(targetBox, customer) {
        var me = this;
        if (!customer)
            return;
        if (!targetBox) targetBox = $(`.content-body:visible .content-box[name="customer"]`);
        //thông tin chung
        var customerName = !customer["FullName"] ? '' : customer["FullName"];
        var phoneNumber = !customer["PhoneNumber"] ? '' : customer["PhoneNumber"]
        var address = !customer["Address"] ? '' : customer["Address"];
        $(targetBox).find(`input[fieldName="FullName"]`).val(customerName);
        $(targetBox).find(`input[type="text"][fieldName="PhoneNumber"]`).val(phoneNumber);
        $(targetBox).find(`input[fieldName="Address"]`).val(address);
        // thông tin xã/phường, ...
        var areaCode = !customer["AdministrativeAreaCode"] ? "VN" : customer["AdministrativeAreaCode"];
        if (areaCode.length > 2) {
            //lấy dữ liệu đầy đủ từ api
            var route = "/api/v1/AdministrativeAreas";
            $.ajax({
                url: me.host + route + "/FullAddress?areaCode=" + areaCode,
                method: "GET"
            })
                .done(function (res) {
                    var fullarea = res.Data;
                    var province = fullarea["Province"];
                    var district = fullarea["District"];
                    var ward = fullarea["Ward"];
                    if (province) {
                        //chọn item tại combo Tỉnh/thành
                        var proviceBox = $(targetBox).find(`.input-box[fieldName="Province"] .m-box`);
                        var provineId = province["AdministrativeAreaId"];
                        me.SelectItem(proviceBox, provineId);

                        // tạo comboBox quận/huyện theo thông tin tỉnh được chọn
                        var districtBox = $(targetBox).find(`.input-box[fieldName="District"] .m-box`);
                        me.loadDistrict(province["AdministrativeAreaCode"], districtBox);
                        if (district) {
                            var districtId = district["AdministrativeAreaId"];
                            me.SelectItem(districtBox, districtId);

                            // tạo comboBox xã/phường theo thông tin quận/huyện được chọn
                            var wardBox = $(targetBox).find(`.input-box[fieldName="Ward"] .m-box`);
                            if (ward) {
                                me.loadWard(ward["AdministrativeAreaCode"], wardBox);
                                var wardId = ward["AdministrativeAreaId"];
                                me.SelectItem(wardBox, wardId);
                            }
                        }
                    }

                })
                .fail(function (res) {
                    console.log(res);
                })
            debugger
            me.ValidateForm(targetBox);
        }
    }

    /** Thực hiện tự động bind dữ liệu tỉnh/thành
     * @param {Element} provinceBox Box chứa thông tin
     * CreatedBy dtnga (08/12/2020)
     * */
    loadProvince(provinceBox) {
        var me = this;
        var targetCombos = $(`.content-body`).find(`.input-box[fieldName="Province"] .m-box`);
        $(targetCombos).find(`.wrapper .item`).remove();
        // Lấy danh sách tỉnh/thành tại Việt Nam qua API
        var route = "/api/v1/AdministrativeAreas";
        var provinces = [];
        $.ajax({
            url: me.host + route + "/Code?areaCode=&kind=1",
            method: "GET"
        })
            .done(function (res) {
                provinces = res.Data;
                $.each(targetCombos, function (index, combo) {
                    me.createComboBox(provinces, combo);
                    $(combo).find(".item").on("click", function () {
                        // load lại comboBox quận/ huyện
                        me.onclick_ProvinceItem(this);
                    });
                });
            })
            .fail(function (res) {
                console.log(res);
            })
    }

    /**
     *  Sự kiện khi click chọn item tỉnh/thành
     * @param {any} item Item được chọn
     */
    onclick_ProvinceItem(item) {
        if (item) {
            var me = this;
            var districtBox = $(item).closest(`.content-body`).find(`.input-box[fieldName="District"] .m-box`);
            me.clearCombobox(districtBox);
            var wardBox = $(item).closest(`.content-body`).find(`.input-box[fieldName="Ward"] .m-box`);
            me.clearCombobox(wardBox);
            var provinceId = $(item).data("keyId");
            var route = "/api/v1/AdministrativeAreas";
            $.ajax({
                url: me.host + route + "/" + provinceId,
                method: "GET"
            })
                .done(function (res) {
                    var provinceCode = res;
                    me.loadDistrict(provinceCode, districtBox);
                })
                .fail(function (res) {
                    console.log(res);
                })
        }
    }

    /**
     *Thực hiện tự động bind dữ liệu quận/ huyện của tỉnh đã cho
     * CreatedBy dtnga (08/12/2020)
     * @param {string} provinceCode Mã tỉnh/ thành
     * @param {Element} districtBox Box chứa thông tin
     */
    loadDistrict(provinceCode, districtBox) {
        if (provinceCode && districtBox) {
            var me = this;
            var route = "/api/v1/AdministrativeAreas";
            $.ajax({
                url: me.host + route + "/Code?areaCode=" + provinceCode + "&kind=2",
                method: "GET"
            })
                .done(function (res) {
                    var districts = res.Data;
                    me.createComboBox(districts, districtBox);
                    $(districtBox).find(".item").on("click", function () {
                        // load lại comboBox xã/phường
                        me.onclick_DistrictItem(this);
                    });
                })
                .fail(function (res) {
                    console.log(res);
                })
        }
    }

    /**
     * Sự kiện khi chọn item quận/huyện
     * @param {any} item item được chọn
     */
    onclick_DistrictItem(item) {
        if (item) {
            var me = this;
            var wardBox = $(item).closest(`.content-body`).find(`.input-box[fieldName="Ward"] .m-box`);
            me.clearCombobox(wardBox);
            var wardId = $(item).data("keyId");
            var route = "/api/v1/AdministrativeAreas";
            $.ajax({
                url: me.host + route + "/" + wardId,
                method: "GET"
            })
                .done(function (res) {
                    var wardCode = res;
                    me.loadWard(wardCode, wardBox);
                })
                .fail(function (res) {
                    console.log(res);
                })
        }
    }

    /**
     * Thực hiện bind dữ liệu phường/ xã tự động dựa theo mã quận/ huyện
     * CreatedBy dtnga (08/12/2020)
     * @param {string} districtCode Mã quận/ huyện
     *  @param {Element} wardBox Box chứa thông tin
     */
    loadWard(districtCode, wardBox) {
        if (districtCode && wardBox) {
            var me = this;
            var route = "/api/v1/AdministrativeAreas";
            $.ajax({
                url: me.host + route + "/Code?areaCode=" + districtCode + "&kind=3",
                method: "GET"
            })
                .done(function (res) {
                    var wards = res.Data;
                    me.createComboBox(wards, wardBox);
                    $(wardBox).find(`.item`).on("click", function () {
                        me.updateTransportorInfo();
                    });
                })
                .fail(function (res) {
                    console.log(res);
                })
        }
    }

    /**
     * Custome
     * CreatedBy dtnga (12/12/2020)
     * @param {any} option
     */
    doSomethingWhenItemSelected(selectedItem) {
        try {
            var me = this;
            var base = new Base();
            base.doSomethingWhenItemSelected(selectedItem);
            var cbTrans = $(selectedItem).closest(`.m-box[name="Transportor"]`);
            if (cbTrans.length > 0)
                me.updateTransportorInfo(cbTrans);
            var autoCompleteProduct = $(selectedItem).closest(`.m-autoComplete[name="Product"]`);
            if (autoCompleteProduct.length > 0){
                var productId= $(selectedItem).data("keyId");
                me.addProductToCart(productId, null);
            }
            if ($(selectedItem).closest(`.input-box[fieldName="Ward"] .m-box`).length > 0){
               if($(selectedItem).closest(`.content-body`).find(`.m-box[name="Transportor"]`).length > 0)
                // trigger sự kiện trên item xã/phường
                     me.updateTransportorInfo();
                else me.updateOrderTotal();
            }
                
            else if ($(selectedItem).closest(`.input-box[fieldName="District"] .m-box`).length > 0)
                // load lại comboBox xã/phường
                me.onclick_DistrictItem(selectedItem);
            else if ($(selectedItem).closest(`.input-box[fieldName="Province"] .m-box`).length > 0)
                me.onclick_ProvinceItem(selectedItem);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Cập nhật thông tin vận chuyển khi thay đổi giá trị của combobox Transportor
     * CreatedBy dtnga (10/12/2020)
     * @param {Element} comboBoxTrans comboBox đơn vị vận chuyển
     */
    updateTransportorInfo(comboBoxTrans) {
        try {
            if (!comboBoxTrans)
                comboBoxTrans = $(`.content-body:visible`).find(`#cb-transportor`);
            var me = this;
            var transportorId = $(comboBoxTrans).data("keyId");
            if (!transportorId) {
                $(comboBoxTrans).find(`input`).trigger("blur");
                return;
            }
            var shopId = $(`.header .m-box`).data("keyId");
            var customerAreaId = $(comboBoxTrans).closest(`.content-body`).find(`.input-box[fieldname="Ward"] .m-box`).data("keyId");
            if (!customerAreaId) {
                // thông báo bắt buộc phải chọn thông tin xã/ phường
                me.showNotificationPopup("Thông tin xã/phường không được để trống. Vui lòng kiểm tra lại.");
                return;
            }
            // gọi api tính chi phí vận chuyển + thời gian giao hàng dự kiến
            var fee = 0;
            var expectedDeliveryDate = "";
            var route = "/api/v1/Transportors/Calculator";
            $.ajax({
                url: me.host + route + "?transportorId=" + transportorId + "&shopId=" + shopId + "&customerAreaId=" + customerAreaId,
                method: "GET"
            })
                .done(function (res) {
                    var data = res.Data;
                    fee = data.ShippingFee;
                    expectedDeliveryDate = formatDate(data.ExpectedDeliveryDate, "dd/mm/yyyy");
                    // bind dữ liệu và hiển thị thông tin vận chuyển
                    var contentBox = $(comboBoxTrans).closest(`.content-box`);
                    var feeField = $(contentBox).find(`input[fieldName="ShippingFee"]`);
                    $(feeField).val(formatMoney(fee));
                    $(feeField).attr("value", fee);
                    $(feeField).attr("validate", true);
                    $(feeField).removeClass("m-input-warning");
                    me.updateOrderTotal();
                    var extraInfo = $(contentBox).find(`.extra-info`);
                    $(extraInfo).find(`span`).text(expectedDeliveryDate);
                    $(extraInfo).removeClass("displayNone");
                })
                .fail(function (res) {
                    console.log(res);
                })

        } catch (e) {
            console.log(e);
        }
    }
        
    /**
     * Hiển thị form Sửa thông tin khi double click vào 1 đơn hàng
     * CreatedBy dtnga (21/11/2020)
     * @param {Element} rowOrder Row được click
     */
    onDblClick_Order(rowOrder) {
        try {
            var me = this;
            me.formMode = "edit";
            //Đổi màu hàng dữ liệu
            var selected = $(rowOrder);
            $(selected).closest(`tbody`).find(`tr`).removeClass("selected");
            $(selected).closest(`tbody`).find(`.checkmark`).removeClass("selected");
            $(selected).addClass("selected");
            $(selected).find(`.checkmark`).addClass("selected");
            //Show form cập nhật đơn hàng
            var dialog = $(selected).closest(`.content-body`).find(`.m-dialog`);
            me.showDialogCustome(dialog);
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
                    me.BindDatatoOrderForm(data, dialog);
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
     * custome hàm hiển thị dialog
     * @param {any} dialog
     */
    showDialogCustome(dialog) {
        if (!dialog) dialog = $(`.content-body:visible .m-dialog`);
        var me = this;
        me.showDialog(dialog);
        $(dialog).find(`.product-list .product-detail`).remove();
        $(dialog).find(`.shopping-cart`).find(`.total-quantity span`).text(0);
        $(dialog).find(`.shopping-cart`).find(`.total-money`).text(0);
        $(dialog).find(`.shopping-cart`).find(`.total-money`).attr("value", 0);
    }

    /**
     * Thực hiện đổ dữ liệu vào form
     * @param {any} data dữ liệu đơn hàng cần đổ
     * @param {any} targetForm form cần đổ dữ liệu
     * CreatedBy dtnga (24/12/2020)
     */
    BindDatatoOrderForm(data, targetForm) {
        try {
            var me = this;
            var obj = data;
            var form = $(targetForm);
            $(`.m-loading`).removeClass("displayNone");
            // bind thông tin chung:
            $(targetForm).find(`.orderNote`).text(obj["OrderNote"]);
            $(targetForm).find(`.createdBy`).text(obj["CreatedByName"]);
            $(targetForm).find(`.modifiedBy`).text(obj["ModifiedByName"]);
            // bind trạng thái đơn hàng
            var cbState = $(form).find(`.m-box[name="OrderState"]`);
            var stateId = obj["OrderStateId"];
            me.SelectItem(cbState, stateId);
            // bind thông tin sản phẩm
            var orderDetails = obj["OrderDetails"];
            if (orderDetails) {
                $.each(orderDetails, function (index, item) {
                    me.buidProductDetail(item);
                });
            }
            $(form).find(`textarea[fieldname="OrderNote"]`).val(obj["OrderNote"]);
            // bind thông tin người nhận
            var customer = obj["Customer"];
            var targetBox = $(form).find(`.content-box[name="customer"]`);
            me.autoBindCustomer(targetBox, customer);
            // bind thông tin vận chuyển
            var cbTran = $(form).find(`.m-box[name="Transportor"]`);
            var transId = obj["TransportorId"];
            me.SelectItem(cbTran, transId);
            var paidOrderBy = obj["ShippingPaidBy"];
            $(form).find(`input[type="radio"][fieldName="ShippingPaidBy"][radioValue=` + paidOrderBy + `]`).prop("checked", true);
            $(form).find(`textarea[fieldname="ShippingNote"]`).val(obj["ShippingNote"]);
            // bind thông tin thanh toán
            me.updateOrderTotal();
            $(`.m-loading`).addClass("displayNone");
        }
        catch (e) {
            console.log(e);
        }
    }

    /** 
     * Thực hiện cập nhật tiền đơn hàng
     * CreatedBy dtnga (20/12/2020)
     * */
    updateOrderTotal() {
        var container = $(`.content-body:visible`);
        var total = convertInt($(container).find(`.total-money`).attr("value"));
        var shippingFee = convertInt($(container).find(`input[fieldName="ShippingFee"]`).attr("value"));
        if (!shippingFee) shippingFee = 0;
        var shippingPaidBy = $(container).find(`input[type="radio"][fieldName="ShippingPaidBy"]:checked`).attr("radioValue");
        if(!shippingPaidBy) shippingPaidBy=1; // khách trả tiền (addOrder-saler)
        else shippingPaidBy = convertInt(shippingPaidBy);
        var totalField = $(container).find(`input[fieldName="OrderTotal"]`);
        var insufficientCashField = $(container).find(`input[fieldName="InsufficientCash"]`); // Số tiền thừa/thiếu
        var paidMoney = convertInt($(container).find(`input[fieldName="Paid"]`).attr("value"));
        if (shippingPaidBy == 1) {
            // khách trả phí vận chuyển
            total = total + shippingFee;
        }
        // cửa hàng trả phí vận chuyển
        $(totalField).val(formatMoney(total));
        $(totalField).attr("value", total);
        var insufficientCash = 0;
        if (total < paidMoney) {
            // thừa tiền
            insufficientCash = paidMoney - total;
            $(container).find(`.insufficient-cash`).addClass("displayNone");
            $(container).find(`.excess-cash`).addClass("displayNone");
        }
        else
            insufficientCash = total - paidMoney;

        $(insufficientCashField).val(formatMoney(insufficientCash));
        $(insufficientCashField).attr("value", insufficientCash);

    }

    /**Thực hiện thêm sản phẩm vào giỏ hàng
     * CreatedBy dtnga (29/11/2020)
     * */
    onClick_addToShoppingCard() {
        try {
            var me = this;
            me.checkProduct();
        }
        catch (e) {
            console.log(e);
        }
    }

    /** 
     * Sự kiện khi click nút tạo đơn hàng 
     * CreatedBy dtnga (28/12/2020)
     * */
    onClickCreateOrder() {
        try {
            var me = this;
            var container = $(`.content-body:visible`);

        }
        catch (e) {
            console(e);
        }
    }

    /**
     * Sự kiện khi click nút cập nhật đơn hàng
     * CreatedBy dtnga (28/12/2020)
     * */
    onClickUpdateOrder() {
        try {

        }
        catch (e) {
            console(e);
        }
    }

    /**
     * Kiểm tra giỏ hàng có sản phẩm chưa
     * CreatedBy dtnga (22/1/2021)
     * */
    validateShopppingCart() {
        try {
            var shoppingCart = $(`.content-body:visible .shopping-cart`);
            var productDetails = $(shoppingCart).find(".product-detail");
            if (productDetails.length == 0) {
                $(shoppingCart).find(".empty-mark").removeClass("displayNone");
                $(shoppingCart).find(".error-empty").removeClass("displayNone");
                return false;
            }
            else {
                $(shoppingCart).find(".empty-mark").addClass("displayNone");
                $(shoppingCart).find(".error-empty").addClass("displayNone");
                return true;
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}