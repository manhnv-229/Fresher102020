
class Base {
    constructor() {
        var me = this;
        me.ObjectName = "Order";
        me.Host = "";
        me.Route = "";
        me.ShopId = "";
        me.UserId = "";
    }


    /** Thực hiện lấy thông tin người dùng sau khi đăng nhập
     * CreatedBy dtnga (26/11/2020)
     * */
    loadAccount() {
        // TODO lấy thông tin người dùng từ API
        var user = userInfo;
        var fullName = user["FullName"];
        $(`.header .username`).text(fullName);
        $(`.header .username`).data("keyId", user["UserId"]);
    }

    /** Thực hiện load thông tin cửa hàng do user làm chủ
     * CreatedBy dtnga (27/11/2020)
     * */
    loadShop() {
        try {
            // TODO lấy danh sách cửa hàng theo UserId từ API
            var shops = listShop;
            var comboBoxShop = $(`#cb-Shop`);
            this.createComboBox(shops, comboBoxShop);
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Tự động bind thông tin các đơn vị vận chuyển liên kết với cửa hàng
     * CreatedBy dtnga (08/12/2020)
     * */
    autoCompleteTransportor(idTarget) {
        var me = this;
        //TODO Lấy danh sách đơn vị vận chuyển qua API
        //me.Route = "/api/v1/Transportors";
        //me.ShopId = "1863f692-73f4-472d-09d9-225ba613d98b";
        //$.ajax({
        //    url: me.Host + me.Route + "/" + me.ShopId,
        //    method: "GET"
        //})
        //    .done(function (res) {

        //    })
        //    .fail(function (res) {
        //        console.log(res);
        //    })
        var res = resTransport;
        var transportors = res.Data;
        var targetComboBox = $(idTarget);
        me.createComboBox(transportors, targetComboBox);
        return;
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
    /* Hàm thực hiện khởi tạo sự kiện
     * CreatedBy dtnga (21/11/2020)
     * */
    initEvent() {
        try {
            var me = this;
            $(`#btn-addOrder`).on("click", me.onClick_btnAdd.bind(me));
            $(`#btn-refresh`).on("click", me.onClick_btnRefresh.bind(me));
            $(`#btn-create`).on("click", me.onClick_btnCreate.bind(me));
            $(`#btn-clear`).on("click", me.onClick_btnClear.bind(me));
            // TODO sự kiện khi nhập trường Tìm kiếm

            // TODO Sự kiện khi chọn filter

            // format khi nhập liệu số tiền
            me.autoFormatMoney();
            // kiểm tra dữ liệu
            //    me.checkRequired();
            me.validateEmail();
            me.addFocusSupport();
            // Sự kiện khi thao tác với từng hàng dữ liệu trong bảng
            $(`table tbody`).on("click", "tr", me.tr_onClick);
            $(`table tbody`).on("dblclick", "tr", me.onDblClick_trow.bind(me));
            // sự kiện khi tick vào checkbox/ nhiều checkbox
            $(`table thead input[type="checkbox"]`).on("click", me.onClickCheckAll.bind(me));
            // Sự kiện tự động thêm sản phẩm vào giỏ khi click nút Thêm vào giỏ
            $(`#btn-addToShoppingCard`).on("click", me.onClick_addToShoppingCard.bind(me));
            // sự kiện khi blur các trường input
            $(`input`).blur(me.onBlur_inputField);

            // Sự kiện khi click navitem
            $('.nav-item').on('click', function () {
                $('.nav-item').removeClass('select-menu-item');
                $(this).addClass('select-menu-item');
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
        $(item).addClass("selected");
        $(item).find(`.option-icon .check-icon`).removeClass("displayNone");
        // ẩn option box 
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
                    $(container).children().removeClass("item-hover");
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
            $(wrapper).scrollTop(0);//set to top
            
            var itemOffsetTop = $('.item-hover:first').offset().top;
            $(wrapper).scrollTop(itemOffsetTop);
            var wrapperHeight = $(wrapper).offset().top;
            if (itemOffsetTop >= wrapperHeight )
                $(wrapper).scrollTop(itemOffsetTop);
            else
                $(wrapper).scrollTop(itemOffsetTop);
        });
    }

    /**
     * Sự kiện khi ấn lên/xuống từ bàn phím
     * CreatedBy dtnga (10/12/2020)
     * @param {element} element trường nhập liệu tại combobox
     */
    detectKeyCode_Enter(element) {
        var me = this;
        var parent = $(element).closest(".m-box");
        var wrapper = $(parent).find(".wrapper");
        $(element).on("keyup", function (e) {
            if (e.which == 13) {
                if ($(wrapper).hasClass(".displayNone")) {

                }
                else {
                    var hoverdItem = $(wrapper).find('.item-hover');
                    me.onSelect_comboItem(hoverdItem);
                }
            }
        });
    }

    /** Thực hiện tự động bind dữ liệu tỉnh/thành
     * CreatedBy dtnga (08/12/2020)
     * */
    autoCompleteProvince() {
        var me = this;
        var provinceField = $(`input[type="search"][fieldName="Province"]`);
        // Lấy danh sách tỉnh/thành tại Việt Nam qua API
        //me.Route = "/AdministrativeAreas/Code";
        //$.ajax({
        //    url: me.Host + me.Route + "?areaCode=&kind=1",
        //    method: "GET"
        //})
        //.done(function (res) {

        //})
        //.fail(function (res) {
        //    console.log(res);
        //})

        // start of ajax done function body
        var res = resProvince;
        // Tạo source data:
        var listProvince = res.Data;
        var source = [];
        $.each(listProvince, function (index, province) {
            var provinceName = province["AdministrativeAreaName"];
            var provinceCode = province["AdministrativeAreaCode"];
            source.push({
                label: provinceName,
                code: provinceCode
            });
        })
        // Tạo autoComplete
        $(provinceField).autocomplete({
            source: source,
            autoFocus: true,
            focus: function (event, suggest) {
                $(provinceField).val(suggest.item.label);
            },
            select: function (event, suggest) {
                // bind tên tỉnh/thành lên input field
                $(provinceField).val(suggest.item.label);
                // Lưu mã tỉnh/thành và thực hiện complete danh sách quận/ huyện
                var provinceCode = suggest.item.code;
                $(provinceField).data("keyCode", provinceCode);
                me.autoCompleteDistrict(provinceCode);
            }
        });
        // End of ajax done function body
    }

    /**
     *Thực hiện tự động bind dữ liệu quận/ huyện của tỉnh đã cho
     * CreatedBy dtnga (08/12/2020)
     * @param {string} provinceCode Mã tỉnh/ thành
     */
    autoCompleteDistrict(provinceCode) {
        var me = this;
        provinceCode = provinceCode.trim();
        if (!provinceCode) {
            provinceCode = $(`input[type="search][fieldName="Province"]`).data("keyCode");
            if (!provinceCode) {
                // Hiển thị popup yêu cầu nhập thông tin tỉnh thành
                var popup = $(`.popup-notification`);
                var popupBody = $(popup).find(`.popup-body`);
                $(popupBody).children().remove();
                var content = $(`<div class="popup-body-text">Thông tin tỉnh/thành không được bỏ trống. Vui lòng kiểm tra và nhập lại</div>`);
                popupBody.append(content);
                popup.show();
                me.initEventPopup(popup);
                return;
            }
        }
        else {
            // Lấy danh sách quận/ huyện theo mã tỉnh/ thành qua API
            //me.Route = "/AdministrativeAreas/Code";
            //$.ajax({
            //    url: me.Host + me.Route + "?areaCode=" + provinceCode + "&kind=2",
            //    method: "GET"
            //})
            //    .done(function (res) {

            //    })
            //    .fail(function (res) {
            //        console.log(res);
            //    })

            // fake res
            var res = resDistrict;
            var listDistrict = res.Data;
            // Tạo source data:
            var source = [];
            $.each(listDistrict, function (index, district) {
                var districtName = district["AdministrativeAreaName"];
                var districtCode = district["AdministrativeAreaCode"];
                source.push({
                    label: districtName,
                    code: districtCode
                });
            })
            // Tạo autoComplete
            var districtField = $(`input[type="search"][fieldName="District"]`);
            $(districtField).autocomplete({
                source: source,
                autoFocus: true,
                focus: function (event, suggest) {
                    $(districtField).val(suggest.item.label);
                },
                select: function (event, suggest) {
                    // bind tên tỉnh/thành lên input field
                    $(districtField).val(suggest.item.label);
                    // Lưu mã tỉnh/thành và thực hiện complete danh sách quận/ huyện
                    var districtCode = suggest.item.code;
                    $(districtField).data("keyCode", districtCode);
                    me.autoCompleteWard(districtCode);
                }
            });
        }
    }

    /**
     * Thực hiện bind dữ liệu phường/ xã tự động dựa theo mã quận/ huyện
     * CreatedBy dtnga (08/12/2020)
     * @param {string} districtCode Mã quận/ huyện
     */
    autoCompleteWard(districtCode) {
        var me = this;
        districtCode = districtCode.trim();
        if (!districtCode) {
            districtCode = $(`input[type="search][fieldName="District"]`).data("keyCode");
            if (!districtCode) {
                // Hiển thị popup yêu cầu nhập thông tin tỉnh thành
                var popup = $(`.popup-notification`);
                var popupBody = $(popup).find(`.popup-body`);
                $(popupBody).children().remove();
                var content = $(`<div class="popup-body-text">Thông tin quận/ huyện không được bỏ trống. Vui lòng kiểm tra và nhập lại</div>`);
                popupBody.append(content);
                popup.show();
                me.initEventPopup(popup);
                return;
            }
        }
        else {
            // Lấy danh sách xã/ phường theo mã quận/ huyện qua API
            //me.Route = "/AdministrativeAreas/Code";
            //$.ajax({
            //    url: me.Host + me.Route + "?areaCode=" + districtCode + "&kind=3",
            //    method: "GET"
            //})
            //    .done(function (res) {

            //    })
            //    .fail(function (res) {
            //        console.log(res);
            //    })

            // fake res
            var res = resWard;
            var listWard = res.Data;
            // Tạo source data:
            var source = [];
            $.each(listWard, function (index, ward) {
                var wardName = ward["AdministrativeAreaName"];
                var wardCode = ward["AdministrativeAreaCode"];
                source.push({
                    label: wardName,
                    code: wardCode
                });
            })
            // Tạo autoComplete
            var wardField = $(`input[type="search"][fieldName="Ward"]`);
            $(wardField).autocomplete({
                source: source,
                autoFocus: true,
                focus: function (event, suggest) {
                    $(wardField).val(suggest.item.label);
                },
                select: function (event, suggest) {
                    // bind tên tỉnh/thành lên input field
                    $(wardField).val(suggest.item.label);
                    // Lưu mã tỉnh/thành và thực hiện complete danh sách quận/ huyện
                    var wardCode = suggest.item.code;
                    $(wardField).data("keyCode", wardCode);
                }
            });
        }
    }


    /**
     *Thực hiện bind dữ liệu khách hàng tự động
     * CreatedBy dtnga (02/12/2020)
     * @param {object} customer Thông tin khách hàng
     */
    autoBindCustomer(customer) {
        var me = this;
        if (!customer)
            return;
        var customerName = !customer["FullName"] ? '' : customer["FullName"].trim();
        var phoneNumber = !customer["PhoneNumber"] ? '' : customer["PhoneNumber"].trim();
        var address = !customer["Address"] ? '' : customer["Address"].trim();
        var areaCode = !customer["AdministrativeAreaCode"] ? "VN" : customer["AdministrativeAreaCode"];
        if (areaCode.length > 2) {
            //TODO Lấy dữ liệu từ API
            //$.ajax({
            //    url: me.Host + me.Route + "?areaCode=" + areaCode,
            //    method: "GET"
            //}).done(function (res) {
            //    var fullArea = res.data;
            //    var province = fullArea["Province"];
            //    var district = fullArea["District"];
            //    var ward = fullArea["Ward"];
            //    $(`.box-info input[fieldName="Province"]`).val(province);
            //    $(`.box-info input[fieldName="District"]`).val(district);
            //    $(`.box-info input[fieldName="Ward"]`).val(ward);
            //}).fail(function (res) {
            //    console.log(res);
            //})

            //fakde data
            var res = resFullArea;
            var fullArea = res.Data;
            var province = fullArea["Province"];
            var district = fullArea["District"];
            var ward = fullArea["Ward"];
            $(`.box-info input[fieldName="Province"]`).val(province["AdministrativeAreaName"]);
            $(`.box-info input[fieldName="Province"]`).data("keyCode", province["AdministrativeAreaCode"]);

            $(`.box-info input[fieldName="District"]`).val(district["AdministrativeAreaName"]);
            $(`.box-info input[fieldName="District"]`).data("keyCode", district["AdministrativeAreaCode"]);

            $(`.box-info input[fieldName="Ward"]`).val(ward["AdministrativeAreaName"]);
            $(`.box-info input[fieldName="Ward"]`).data("keyCode", ward["AdministrativeAreaCode"]);
        }
        // Bind dữ liệu
        $(`.box-info input[fieldName="CustomerName"]`).val(customerName);
        $(`.box-info input[fieldName="PhoneNumber"]`).val(phoneNumber);
        $(`.box-info input[fieldName="Address"]`).val(address);


    }

    /**
     * Thực hiện gen và thêm sản phẩm mới vào giỏ hàng
     * CreatedBy dtnga (01/12/2020)
     * @param {object} product
     */
    addProductToCart(product) {
    }

    /**Thực hiện cập nhật tổng tiền của giỏ hàng khi thay đổi giá sản  phẩm
     * CreatedBy dtnga (01/12/2020)
     * */
    onChangeProductPrice(priceInput) {
        try {
            var newPrice = convertInt($(priceInput).attr("value"));
            var currentProduct = $(priceInput).closest('.product-detail');
            var quantity = convertInt($(currentProduct).find(`input[type="number"]`).val());
            var newCost = quantity * newPrice;
            // Cập nhật tổng tiền sản phẩm
            $(currentProduct).find(`.cost`).text(formatMoney(newCost));
            $(currentProduct).find(`.cost`).attr("value", newCost);
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Thực hiện lại tổng số lượng và số tiền các sản phẩm trong giỏ hàng 
     * CreatedBy dtnga (02/12/2020)
     */
    calcculateTotal() {
        try {
            //Cập nhật tổng số lượng sản phẩm trong giỏ hàng
            var totalQuantity = $(`#order-add .product-list`).children().length - 1; // trừ empty mark đi
            $(`.total-quantity span`).text(totalQuantity);
            // Nếu trống thì hiển thị empty mark
            if (totalQuantity <= 0) {
                var emptyMark = $(`.product-list .empty-mark`);
                $(emptyMark).removeClass(`displayNone`);
            }
            // Cập nhật tổng số tiền giỏ hàng
            var productList = $(`#order-add .product-list .product-detail`);
            var newTotal = 0;
            $.each(productList, function (index, item) {
                var cost = convertInt($(item).find(`.cost`).attr("value"));
                newTotal = newTotal + cost;
            });
            $(`#order-add .total-money`).text(formatMoney(newTotal));
            $(`#order-add .total-money`).attr("value", newTotal);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     *  Thực hiện cập nhật tổng tiền sản phẩm khi cập nhật số lượng sản phẩm
     * CreatedBy dtnga (01/12/2020)
     * @param {any} quantity
     */
    onChangeAmount(quantity) {
        try {
            var newQuantity = convertInt($(quantity).val());
            var currentProduct = $(quantity).closest('.product-detail');
            var currentPrice = convertInt($(currentProduct).find(`input[typeFormat="money"]`).attr("value"));
            var newCost = currentPrice * newQuantity;
            // Cập nhật tổng tiền sản phẩm
            $(currentProduct).find(`.cost`).text(formatMoney(newCost));
            $(currentProduct).find(`.cost`).attr("value", newCost);
        }
        catch (e) {
            console.log(e);
        }
    }

    /** Thực hiện thêm sản phẩm vào giỏ hàng
     * CreatedBy dtnga (29/11/2020)
     * */
    onClick_addToShoppingCard() {
        try {
            var me = this;
            //Lấy thông tin sản phẩm
            var productCodeField = $(`#order-add input[type="search"][fieldName="ProductCode"]`);
            var productCode = productCodeField.val().trim();

            // Hoặc lấy qua API bằng ProductCode
            //$.ajax({
            //    url: "" + "/" + productCode,
            //    method: "GET",
            //}).done(function (data) {

            //}).fail(function (res) {
            //    console.log(res);
            //});
            var product = listProduct.find(p => p["ProductCode"] == productCode);
            // Đưa ra thông báo sản phẩm không tồn tại
            if (!product) {
                var popup = $(`.popup-notification`);
                var popupBody = $(popup).find(`.popup-body`);
                $(popupBody).children().remove();
                var content = $(`<div class="popup-body-text">Sản phẩm mã <span> ` + productCode + ` </span> không tồn tại. Vui lòng kiểm tra và nhập lại</div>`);
                popupBody.append(content);
                popup.show();
                me.initEventPopup(popup);
                return;
            }
            // Đưa ra thông báo sản phẩm đã hết
            else if (product["Amount"] <= 0) {
                var popup = $(`.popup-notification`);
                var popupBody = $(popup).find(`.popup-body`);
                $(popupBody).children().remove();
                var content = $(`<div class="popup-body-text">Sản phẩm mã <span> ` + productCode + ` </span> hiện đã hết. Vui lòng kiểm tra và nhập lại</div>`);
                popupBody.append(content);
                popup.show();
                me.initEventPopup(popup);
                return;
            }
            else {
                // Thêm sản phẩm vào giỏ hàng
                // Nếu sản phẩm đã có trong giỏ hàng => số lượng + 1 và tăng tổng tiền
                var existProducts = $(`.product-list .product-detail`);
                var addNew = 1;
                // Nếu đã tồn tại trong giỏ hàng => cập nhật số lượng + số tiền 
                if (existProducts) {
                    $.each(existProducts, function (index, item) {
                        var code = $(item).find(`.product-code`).text().trim();
                        if (code == productCode) {
                            $(item).find(`.quantity`).val(function (i, oldval) {
                                return ++oldval;
                            })
                            var productPrice = convertInt(product["CurrentPrice"]);
                            var oldCost = $(item).find(`.cost`).attr("value");
                            var newCost = convertInt(oldCost) + productPrice;
                            $(item).find(`.cost`).text(formatMoney(newCost));
                            $(item).find(`.cost`).attr("value", newCost);
                            addNew = 0;
                            // Cập nhật tổng giá trị giỏ hàng
                            var oldTotal = convertInt($(`.total-money`).attr("value"));
                            var newTotal = oldTotal + productPrice;
                            $(`.total-money`).text(formatMoney(newTotal));
                            $(`.total-money`).attr("value", newTotal);
                        }
                    })
                }
                // Nếu chưa tồn tại trong giỏ hàng => thêm mới
                if (addNew == 1) {
                    // Ẩn Empty mark 
                    var emptyMark = $(`.product-list .empty-mark`);
                    $(emptyMark).addClass(`displayNone`);
                    me.addProductToCart(product);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Hàm thực hiện khởi tạo sự kiện trên popup
     *  CreatedBy dtnga (30/11/2020)
     * @param {Element} popup cần khởi tạo sự kiện
     */
    initEventPopup(popup) {
        $(`.m-popup #btn-exit-popup`).on("click", function () {
            $(popup).hide();
        });
        $(`.m-popup #btn-close`).on("click", function () {
            $(popup).hide();
        });
        $('body').on("keydown", function (e) {
            if (e.which === 27)
                $(popup).hide();
        });
    }

    /**
     * Thực hiện xóa một sản phẩm trong giỏ hàng
     * ModifiedBy dtnga (02/12/2020)
     * @param {Element} button button xóa tại mỗi dòng sản phẩm
     */
    onClick_deleteProduct(button) {
        try {
            var productdetail = $(button).closest(".product-detail");
            // Xóa dòng chứa thông tin sản phẩm
            $(productdetail).remove();
        }
        catch (e) {
            console.log(e);
        }
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
    onClick_btnAdd() {
        try {
            var me = this;
            me.formMode = "add";
            me.showDialog();
        } catch (e) {
            console.log(e);
        }
    }

    /** Thực hiện hiển thị dialog và khởi tạo các sự kiện liên quan
     * CreatedBy dtnga (26/11/2020)
     * */
    showDialog() {
        var me = this;
        var dialog = $(`.m-dialog`);
        dialog.show();
        // đóng form khi nhấn ESC
        $('body').on("keydown", me.onClick_ESC.bind(dialog));
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

    /** Kiểm tra input /ó hợp lệ không 
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
    /** 
     * TODO bị lặp/ Kiểm tra trường bắt buộc nhập trước
     * CreatedBy dtnga(08/12/2020)
     * */
    onFocus_inputField() {
        var input = this;
        var requiedField = $(input).attr("requiredField");
        if (requiedField) {
            var contentBox = $(this).closest(".content-box");
            var requiredInput = $(contentBox).find(`input[fieldName=` + requiedField + `]`);
            var requiredValue = $(requiredInput).val();
            if (!requiredValue) {
                var popup = $(`.popup-notification`);
                var popupBody = $(popup).find(`.popup-body`);
                $(popupBody).children().remove();
                var content = $(`<div class="popup-body-text">Vui lòng chọn thông tin tỉnh/thành trước</div>`);
                popupBody.append(content);
                popup.show();
                me.initEventPopup(popup);
                return;
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

    /** Hàm thực hiện đóng form khi người dùng nhấn ESC
     * CreatedBy dtnga (26/11/2020)
     * */
    onClick_ESC() {
        var me = this;
        me.on("keydown", function (e) {
            if (e.which === 27) {
                me.hide();
            }
        });
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
        if ($(`thead input[type="checkbox"]`).is(":checked")) {
            $(`thead input[type="checkbox"]`).prop("checked", false);
            $(`tbody input[type="checkbox"]`).prop("checked", false);
            $(`tbody tr`).removeClass("selected");
            $(this).addClass("selected");
            $(this).find(`input[type="checkbox"]`).prop("checked", true);
            return;
        }
        else {
            $(this).addClass("selected");
            $(this).find(`input[type="checkbox"]`).prop("checked", true);
        }
    }

    /**
     * Hiển thị form Sửa thông tin khi double click vào 1 bản ghi
     * CreatedBy dtnga (21/11/2020)
     * */
    onDblClick_trow() {
        var me = this;
        me.formMode = "edit";
        //Đổi màu hàng dữ liệu
        var selected = $(`tbody`).find(`tr.selected`);
        $(`tbody tr`).removeClass("selected");
        $(selected).addClass("selected");
        //Show form cập nhật đơn hàng
        $(`.m-dialog .header-text`).text("Cập nhật đơn hàng");
        // Hiển thị dialog
        me.showDialog();
        //TODO  bind dữ liệu hàng được chọn lên form
        var id = selected.data('keyId');
        // Lấy thông tin từ api bằng id tương ứng


    }

    /** Thực hiện chọn tất cả bản ghi
    * CreatedBy dtnga (21/11/2020)
     */
    onClickCheckAll() {
        var Allcheckbox = $(`table thead input[type="checkbox"]:checked`);
        if (Allcheckbox.length > 0) {
            $(`tbody input[type="checkbox"]`).prop("checked", true);
            $(`tbody tr`).addClass("selected");
        }
        else {
            $(`tbody input[type="checkbox"]`).prop("checked", false);
            $(`tbody tr`).removeClass("selected");
        }
    }

    /** Thực hiện select tại dòng có checkbox selected
     *CreatedBy dtnga (08/12/2020) 
     **/
    onClickCheckBox() {
        var checkbox = this;
        if ($(this).is(":checked")) {
            $(this).prop("checked", false);
            var trow = $(checkbox).closest(`tr`);
            $(trow).removeClass("selected");
            return;
        }
        var trow = $(checkbox).closest(`tr`);
        $(trow).addClass("selected");
    }
    /** Hàm base thực hiện load dữ liệu lên table
     *  Created By dtnga (21/11/2020)
     * */
    loadData() {
        var me = this;
        var ths = $('table tr th');

        // Lấy data từ Api
        var data = listOrder;
        $.each(data, function (index, obj) {
            var tr = $(`<tr></tr>`);
            $.each(ths, function (index, th) {
                var td = $(`<td></td>`);
                // Lấy fielname th 
                var fieldName = $(th).attr('fieldName');
                if (fieldName == "Checkbox") {
                    var checkbox = $(`<div><label class="m-checkbox">
                                                <input class="checkbox" type="checkbox" name="order" />
                                                <span class="checkmark"></span>
                                      </label></div>`);
                    td.append(checkbox);
                }
                else if (fieldName == "State") {
                    // Khởi tạo select trạng thái đơn hàng
                    var select = $(`<select></select>`);
                    // Lấy danh sách các trạng thái đơn hàng từ Api 
                    var listState = listOrderState;
                    $.each(listState, function (index, state) {
                        var option = $(`<option></option>`);
                        // append text
                        var value = state["OrderStateName"];
                        if (value) {
                            option.append(value);
                        }
                        // append class
                        var optionCode = state["OrderStateCode"];
                        option.attr("value", optionCode);
                        select.append(option);
                        // Lưu id vào data
                        var key = "OrderStateCode";
                        option.data(key, optionCode);
                        var stateCode = obj["OrderStateCode"];
                        if (state["OrderStateCode"] == stateCode) {
                            option.prop("selected", true);
                            //TODO set màu cho select là màu của option được chọn

                        }

                    })
                    td.append(select);
                    //Cập nhật chọn option tương ứng với trạng thái đơn hàng

                }
                else {
                    //Lấy giá trị của thuộc tính tương ứng với fieldName trong obj
                    var value = obj[fieldName];
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
                    else value = "";
                    var span = `<span>` + value + `</span>`;
                    var div = `<div>` + span + `</div>`;
                    // gán vào td -> tr
                    td.append(div);
                }
                tr.append(td);
            })
            $('table#orders-table tbody').append(tr);
            //Lưu Id vào data
            var keyIdName = me.ObjectName + 'Id';
            tr.data('keyId', obj[keyIdName]);
            var keyName = 'FullName';
            tr.data('keyName', obj[keyName]);
            var keyCode = me.ObjectName + 'Code';
            tr.data('keyCode', obj[keyCode]);

        })
        // Mặc định chọn row đầu tiên
        $(`tbody tr:first`).select();
        $(`tbody tr:first`).addClass("selected");
        $(`tbody tr:first input[type="checkbox"]`).prop("checked", true);
    }
}

var userInfo = {
    UserId: "d8c26030-7d87-4983-9cba-1fde544a25b0",
    FullName: "Đặng Thị Nga"
}

var listShop = [
    {
        ShopId: "a8f94c16-d0c8-4079-aa08-ebc60f23db63",
        ShopName: "Kho MIXI"
    },
    {
        ShopId: "a2472d49-dd5b-4c91-968b-454f7e69ab5d",
        ShopName: "Kho ANAN"
    },
    {
        ShopId: "61907e71-271b-4186-83e2-e488cdb99d78",
        ShopName: "Kho Guadiant"
    }
]

var listOrderState = [
    {
        OrderStateId: "eaf88144-42b8-4adb-89da-4df5b9103389",
        OrderStateCode: 1,
        OrderStateName: "Mới"
    },
    {
        OrderStateId: "18c12084-5347-442c-a9d9-11f5bca09b58",
        OrderStateCode: 2,
        OrderStateName: "Đã xác nhận"
    },
    {
        OrderStateId: "77993ae9-4853-4a9f-bc28-bb546df33288",
        OrderStateCode: 3,
        OrderStateName: "Chờ giao hàng"
    },
    {
        OrderStateId: "744ac402-c8e4-4617-91f2-81315dca2b95",
        OrderStateCode: 4,
        OrderStateName: "Đang giao hàng"
    },
    {
        OrderStateId: "b0016df6-b8ec-44db-943e-10ae339feab2",
        OrderStateCode: 5,
        OrderStateName: "Đã nhận hàng"
    },
    {
        OrderStateId: "61067246-3585-4c03-aae6-ee2f0a62ca64",
        OrderStateCode: 6,
        OrderStateName: "Hoàn hàng"
    },
    {
        OrderStateId: "1afe8820-b1a6-41a2-acf1-cf0e257e4568",
        OrderStateCode: 7,
        OrderStateName: "Đã thanh toán"
    }


]

var listProduct = [
    {
        ProductId: "e16c44b9-1761-40c6-86c8-fc416c16cb3a",
        ProductCode: "D82MS-H",
        ProductName: "Máy tính kỹ thuật Deli - Đen/Xanh dương/Hồng/Trắng - D82MS",
        Color: "Hồng",
        Price: "178000",
        CurrentPrice: "178000",
        Amount: 0
    },
    {
        ProductId: "c4c2a268-210e-4df4-89fa-10d2d106fbb1",
        ProductCode: "D82MS-T",
        ProductName: "Máy tính kỹ thuật Deli - Đen/Xanh dương/Hồng/Trắng - D82MS",
        Color: "Trắng",
        Price: "178000",
        CurrentPrice: "178000",
        Amount: 5
    },
    {
        ProductId: "94c5c0e8-79ab-4c4f-9070-1cd1f0e1db04",
        ProductCode: "D82MS-Đ",
        ProductName: "Máy tính kỹ thuật Deli - Đen/Xanh dương/Hồng/Trắng - D82MS",
        Color: "Đen",
        Price: "178000",
        CurrentPrice: "178000",
        Amount: 10
    },
    {
        ProductId: "7c7b7ae6-ce62-4232-8881-1158a9d7224b",
        ProductCode: "D82MS-X",
        ProductName: "Máy tính kỹ thuật Deli - Đen/Xanh dương/Hồng/Trắng - D82MS",
        Color: "Xanh dương",
        Price: "178000",
        CurrentPrice: "150000",
        Amount: 2
    },
    {
        ProductId: "ecb85d35-baaf-476c-b029-e8e1e07cbf48",
        ProductCode: "HA560",
        ProductName: "Sổ tay còng A5 Deli - Bìa cứng - Có thể thay lõi sổ - Lõi ô vuông/kẻ ngang -HA560/NA560",
        Type: "Sổ bìa trong - HA560",
        Price: "85000",
        CurrentPrice: "80000",
        Amount: 21
    },
    {
        ProductId: "0cd8a906-fc20-4481-b275-0c4ffbaa5490",
        ProductCode: "NA560-V",
        ProductName: "Sổ tay còng A5 Deli - Bìa cứng - Có thể thay lõi sổ - Lõi ô vuông/kẻ ngang -HA560/NA560",
        Type: "Tệp ô vuông- NA560-V",
        Price: "19000",
        CurrentPrice: "17000",
        Amount: 35
    },
    {
        ProductId: "be5d4b42-f987-45c0-81bd-2ed41b15b91a",
        ProductCode: "NA560-KN",
        ProductName: "Sổ tay còng A5 Deli - Bìa cứng - Có thể thay lõi sổ - Lõi ô vuông/kẻ ngang -HA560/NA560",
        Type: "Tệp ngang - NA560-KN",
        Price: "19000",
        CurrentPrice: "17000",
        Amount: 15
    }
]

var listOrder = [
    {
        OrderId: "8dc1ecc8-94e6-4533-9d5a-c626f5b99ab4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "6628cddc-7e45-4996-9d38-c3e3ac3310f9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 3,
        State: "Chờ giao hàng"
    },
    {
        OrderId: "17ffe40f-348f-4886-92d3-b4267398f0de",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "deb19034-c555-4e7a-b8f5-b5e6bbca5c92",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 2,
        State: "Đã xác nhận"
    },
    {
        OrderId: "0a8d0918-1392-4f32-aae0-1889f7cb0d2d",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "de3ccfda-8a3f-4f40-aa28-7529d347a26e",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "c960e918-2b47-4e00-b615-74c9954d23f4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "fc3d1bd0-049f-492f-8b52-d72bd157bbe9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "8dc1ecc8-94e6-4533-9d5a-c626f5b99ab4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "6628cddc-7e45-4996-9d38-c3e3ac3310f9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "17ffe40f-348f-4886-92d3-b4267398f0de",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "deb19034-c555-4e7a-b8f5-b5e6bbca5c92",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "0a8d0918-1392-4f32-aae0-1889f7cb0d2d",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "de3ccfda-8a3f-4f40-aa28-7529d347a26e",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "c960e918-2b47-4e00-b615-74c9954d23f4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "fc3d1bd0-049f-492f-8b52-d72bd157bbe9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "8dc1ecc8-94e6-4533-9d5a-c626f5b99ab4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "6628cddc-7e45-4996-9d38-c3e3ac3310f9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "17ffe40f-348f-4886-92d3-b4267398f0de",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "deb19034-c555-4e7a-b8f5-b5e6bbca5c92",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "0a8d0918-1392-4f32-aae0-1889f7cb0d2d",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "de3ccfda-8a3f-4f40-aa28-7529d347a26e",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "c960e918-2b47-4e00-b615-74c9954d23f4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "fc3d1bd0-049f-492f-8b52-d72bd157bbe9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "8dc1ecc8-94e6-4533-9d5a-c626f5b99ab4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "6628cddc-7e45-4996-9d38-c3e3ac3310f9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "17ffe40f-348f-4886-92d3-b4267398f0de",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "deb19034-c555-4e7a-b8f5-b5e6bbca5c92",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "0a8d0918-1392-4f32-aae0-1889f7cb0d2d",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "de3ccfda-8a3f-4f40-aa28-7529d347a26e",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "c960e918-2b47-4e00-b615-74c9954d23f4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "fc3d1bd0-049f-492f-8b52-d72bd157bbe9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "8dc1ecc8-94e6-4533-9d5a-c626f5b99ab4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "6628cddc-7e45-4996-9d38-c3e3ac3310f9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "17ffe40f-348f-4886-92d3-b4267398f0de",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "deb19034-c555-4e7a-b8f5-b5e6bbca5c92",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "0a8d0918-1392-4f32-aae0-1889f7cb0d2d",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "de3ccfda-8a3f-4f40-aa28-7529d347a26e",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "c960e918-2b47-4e00-b615-74c9954d23f4",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    },
    {
        OrderId: "fc3d1bd0-049f-492f-8b52-d72bd157bbe9",
        OrderCode: "01",
        CustomerName: "Đặng Nga",
        PhoneNumber: "0582296998",
        ReceiveInfo: "Xóm 7, Hải Đường, Hải Hậu, Nam Định",
        ProductInfo: "Váy công túa, Áo phông",
        CreateDate: "2020-05-11T09:30:00",
        UpdateDate: "2020-05-12T11:06:00",
        Total: 599000,
        OrderStateCode: 4,
        State: "Đang giao hàng"
    }
]

var listCustomer = [
    {
        ReceiverId: "126339f9-1e9c-7ed8-8a2a-acc8fc2f00af",
        FullName: "Nguyễn Văn Cường",
        PhoneNumber: "0915389872",
        SuccessOrderedAmount: "2",
        OrderAmount: "3",
        CreatedDate: "2/22/2020 2:31:23 AM",
        Address: "Huyện Hoằng Hóa, tỉnh Thanh Hóa",
        AdministrativeAreaCode: "VN38399"

    },
    {
        ReceiverId: "1294ae7e-2858-2074-4429-0204eeb736fa",
        FullName: "Hoàng Văn Phan ",
        PhoneNumber: "0916486170",
        Address: "",
        SuccessOrderedAmount: "2",
        OrderAmount: "3",
        CreatedDate: "2/22/2020 2:31:23 AM",
        AdministrativeAreaCode: "VN0405301825"
    },
    {
        ReceiverId: "76c04ee8-7a3c-4b3c-925a-f8217312a0bd",
        FullName: "Đặng Thị Nga",
        PhoneNumber: "0582296998",
        Address: "",
        SuccessOrderedAmount: "5",
        OrderAmount: "6",
        CreatedDate: "2/22/2020 2:31:23 AM",
        AdministrativeAreaCode: "VN3636614260"
    }
]

var resFullArea = {
    "Success": true,
    "Message": "Successfully.",
    "MISACode": 200,
    "Data": {
        "Province": {
            "EntityState": 0,
            "AdministrativeAreaId": "9cdbafe0-d7c2-4b78-8725-b69a2b681d97",
            "AdministrativeAreaCode": "VN36",
            "AdministrativeAreaName": "Tỉnh Nam Định",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        "District": {
            "EntityState": 0,
            "AdministrativeAreaId": "4f688c6e-1cd2-4cab-9387-6a8b503a934b",
            "AdministrativeAreaCode": "VN36366",
            "AdministrativeAreaName": "Huyện Hải Hậu",
            "Kind": 2,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        "Ward": {
            "EntityState": 0,
            "AdministrativeAreaId": "8ac015a4-9349-44e7-81ac-3b0104310c29",
            "AdministrativeAreaCode": "VN3636614260",
            "AdministrativeAreaName": "Xã Hải Đường",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        }
    }
}

var resProvince = {
    "Success": true,
    "Message": "Successfully.",
    "MISACode": 200,
    "Data": [
        {
            "EntityState": 0,
            "AdministrativeAreaId": "3934d49c-fc28-44a8-b8d0-ed144f453627",
            "AdministrativeAreaCode": "VN01",
            "AdministrativeAreaName": "Thành phố Hà Nội",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "2c158f8e-77ba-4ecb-be17-9f9211966294",
            "AdministrativeAreaCode": "VN02",
            "AdministrativeAreaName": "Tỉnh Hà Giang",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "4fdf4cc4-f770-44de-a9d9-fdc89afd04e4",
            "AdministrativeAreaCode": "VN04",
            "AdministrativeAreaName": "Tỉnh Cao Bằng",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "7d84f348-f291-48ee-b075-2e44dd82be91",
            "AdministrativeAreaCode": "VN06",
            "AdministrativeAreaName": "Tỉnh Bắc Kạn",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "beb4daa4-83d3-47fd-9419-faafd3440257",
            "AdministrativeAreaCode": "VN08",
            "AdministrativeAreaName": "Tỉnh Tuyên Quang",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "4ce564d8-a8dd-432e-bd27-fb85c45c3b40",
            "AdministrativeAreaCode": "VN10",
            "AdministrativeAreaName": "Tỉnh Lào Cai",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "5e53129e-b6fc-4e8d-b44b-2fa9c3511cb8",
            "AdministrativeAreaCode": "VN11",
            "AdministrativeAreaName": "Tỉnh Điện Biên",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "3479c1d4-cf8e-4f2e-8a60-e5849f068e01",
            "AdministrativeAreaCode": "VN12",
            "AdministrativeAreaName": "Tỉnh Lai Châu",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "6a2919c8-7177-4a45-93f5-4c912e873e05",
            "AdministrativeAreaCode": "VN14",
            "AdministrativeAreaName": "Tỉnh Sơn La",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "8e462981-f6e1-4010-a986-4e624f3e4f85",
            "AdministrativeAreaCode": "VN15",
            "AdministrativeAreaName": "Tỉnh Yên Bái",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "666e3f7a-876e-4ffc-b6f2-d59307d9064d",
            "AdministrativeAreaCode": "VN17",
            "AdministrativeAreaName": "Tỉnh Hòa Bình",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "253bade9-b444-474c-a91e-9647e5d4435f",
            "AdministrativeAreaCode": "VN19",
            "AdministrativeAreaName": "Tỉnh Thái Nguyên",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "fe8ee65b-e1b5-4207-86ac-aced6cbdefa2",
            "AdministrativeAreaCode": "VN20",
            "AdministrativeAreaName": "Tỉnh Lạng Sơn",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "340b853b-1e7c-48ef-816e-e5e5049e6d8a",
            "AdministrativeAreaCode": "VN22",
            "AdministrativeAreaName": "Tỉnh Quảng Ninh",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "10a2e2bc-29a9-4a12-acf6-523f253d84b0",
            "AdministrativeAreaCode": "VN24",
            "AdministrativeAreaName": "Tỉnh Bắc Giang",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "630e44bd-102f-49b9-beba-6b6dfbc7c5bd",
            "AdministrativeAreaCode": "VN25",
            "AdministrativeAreaName": "Tỉnh Phú Thọ",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "77c879fd-ce2d-4efb-b4d0-0b77686b915d",
            "AdministrativeAreaCode": "VN26",
            "AdministrativeAreaName": "Tỉnh Vĩnh Phúc",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "55c92793-d7bd-4d37-85b3-eeb16eb67950",
            "AdministrativeAreaCode": "VN27",
            "AdministrativeAreaName": "Tỉnh Bắc Ninh",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "d79ebe24-b06d-4bb4-8f35-0c388c9ad234",
            "AdministrativeAreaCode": "VN30",
            "AdministrativeAreaName": "Tỉnh Hải Dương",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "3f9d660f-7215-4411-9982-5279408e0e17",
            "AdministrativeAreaCode": "VN31",
            "AdministrativeAreaName": "Thành phố Hải Phòng",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "2c6a31c4-1674-4c62-8f39-ba90c57e605e",
            "AdministrativeAreaCode": "VN33",
            "AdministrativeAreaName": "Tỉnh Hưng Yên",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "ebee60e3-92c6-41f1-a816-820c20475960",
            "AdministrativeAreaCode": "VN34",
            "AdministrativeAreaName": "Tỉnh Thái Bình",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "1db366a1-3a50-4bfe-a692-b0bfb87261ee",
            "AdministrativeAreaCode": "VN35",
            "AdministrativeAreaName": "Tỉnh Hà Nam",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "9cdbafe0-d7c2-4b78-8725-b69a2b681d97",
            "AdministrativeAreaCode": "VN36",
            "AdministrativeAreaName": "Tỉnh Nam Định",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "66ee343c-63c0-4a44-aa48-ec04658bbb9e",
            "AdministrativeAreaCode": "VN37",
            "AdministrativeAreaName": "Tỉnh Ninh Bình",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "58ac8b3f-26c5-41be-98a8-9e9ed9ca7cf1",
            "AdministrativeAreaCode": "VN38",
            "AdministrativeAreaName": "Tỉnh Thanh Hóa",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "9407b8a3-6dad-44fc-a131-408d7912e8f4",
            "AdministrativeAreaCode": "VN40",
            "AdministrativeAreaName": "Tỉnh Nghệ An",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "e5166547-4a4f-4290-8cb9-2d2eb19d1ee6",
            "AdministrativeAreaCode": "VN42",
            "AdministrativeAreaName": "Tỉnh Hà Tĩnh",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "ae918275-162e-4be5-8e96-91c76205759c",
            "AdministrativeAreaCode": "VN44",
            "AdministrativeAreaName": "Tỉnh Quảng Bình",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "dbd18a7b-fa01-4729-85dc-2181529a4234",
            "AdministrativeAreaCode": "VN45",
            "AdministrativeAreaName": "Tỉnh Quảng Trị",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "6dcf8a27-5b7c-418e-8240-65b596ba3c66",
            "AdministrativeAreaCode": "VN46",
            "AdministrativeAreaName": "Tỉnh Thừa Thiên Huế",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "ec14ad74-ae00-499f-8d12-60d29693313c",
            "AdministrativeAreaCode": "VN48",
            "AdministrativeAreaName": "Thành phố Đà Nẵng",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "9c69da6d-0d7e-467f-b123-847b61cad6ce",
            "AdministrativeAreaCode": "VN49",
            "AdministrativeAreaName": "Tỉnh Quảng Nam",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "5b451d42-2b8e-448c-8e4b-ea9ef6b550a5",
            "AdministrativeAreaCode": "VN51",
            "AdministrativeAreaName": "Tỉnh Quảng Ngãi",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "62a1a44e-652b-4a32-9d31-00922c038157",
            "AdministrativeAreaCode": "VN52",
            "AdministrativeAreaName": "Tỉnh Bình Định",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "a09f98c5-3d73-42bd-ad5d-30e335379573",
            "AdministrativeAreaCode": "VN54",
            "AdministrativeAreaName": "Tỉnh Phú Yên",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "64e7c395-58ab-4ea8-922e-65f370fd116d",
            "AdministrativeAreaCode": "VN56",
            "AdministrativeAreaName": "Tỉnh Khánh Hòa",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "8ae704ad-4d16-483a-81e5-92e4b21a007f",
            "AdministrativeAreaCode": "VN58",
            "AdministrativeAreaName": "Tỉnh Ninh Thuận",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "07f54d91-20b4-4d55-8efc-d7f1fae0abc4",
            "AdministrativeAreaCode": "VN60",
            "AdministrativeAreaName": "Tỉnh Bình Thuận",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "121de244-e3ae-4f0c-adca-aef40a8bece2",
            "AdministrativeAreaCode": "VN62",
            "AdministrativeAreaName": "Tỉnh Kon Tum",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "e338e078-fb67-4a8f-b44a-29cc65301f2b",
            "AdministrativeAreaCode": "VN64",
            "AdministrativeAreaName": "Tỉnh Gia Lai",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "ae0cd22c-ba79-47fb-8572-1f89a81856b5",
            "AdministrativeAreaCode": "VN66",
            "AdministrativeAreaName": "Tỉnh Đắk Lắk",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "8755fb43-f7bd-48c7-acd3-aa005f9e8875",
            "AdministrativeAreaCode": "VN67",
            "AdministrativeAreaName": "Tỉnh Đắk Nông",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "e0721e4e-b153-43af-8c3e-95d140548487",
            "AdministrativeAreaCode": "VN68",
            "AdministrativeAreaName": "Tỉnh Lâm Đồng",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "4c372074-c787-4518-9a1c-86e70ce38388",
            "AdministrativeAreaCode": "VN70",
            "AdministrativeAreaName": "Tỉnh Bình Phước",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "7d74721c-d767-4a7c-a933-ac83379c6661",
            "AdministrativeAreaCode": "VN72",
            "AdministrativeAreaName": "Tỉnh Tây Ninh",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "6a0b3872-b46b-459b-9ea4-bef245a853b4",
            "AdministrativeAreaCode": "VN74",
            "AdministrativeAreaName": "Tỉnh Bình Dương",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "20ed4fb0-1b9a-4620-ad94-e0d4d3eeb050",
            "AdministrativeAreaCode": "VN75",
            "AdministrativeAreaName": "Tỉnh Đồng Nai",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "99f1ad9d-655c-4c0b-934e-e7e8dc3bb321",
            "AdministrativeAreaCode": "VN77",
            "AdministrativeAreaName": "Tỉnh Bà Rịa - Vũng Tàu",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "32b6c785-e26a-4a47-a990-de7632c223cb",
            "AdministrativeAreaCode": "VN79",
            "AdministrativeAreaName": "Thành phố Hồ Chí Minh",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "ad988d74-ea39-4340-b7d0-e87e956dae27",
            "AdministrativeAreaCode": "VN80",
            "AdministrativeAreaName": "Tỉnh Long An",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "61b10929-bbfc-4f20-8cc5-155bccd8965b",
            "AdministrativeAreaCode": "VN82",
            "AdministrativeAreaName": "Tỉnh Tiền Giang",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "5c9ef430-b15d-4610-8cd1-0098d4ea0c1a",
            "AdministrativeAreaCode": "VN83",
            "AdministrativeAreaName": "Tỉnh Bến Tre",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "01c42952-29c2-4ccc-b71a-8341131bce45",
            "AdministrativeAreaCode": "VN84",
            "AdministrativeAreaName": "Tỉnh Trà Vinh",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "39738d97-489c-49dd-ada1-573725ed91f4",
            "AdministrativeAreaCode": "VN86",
            "AdministrativeAreaName": "Tỉnh Vĩnh Long",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "130033e9-7c58-44ca-b297-92f39471d67c",
            "AdministrativeAreaCode": "VN87",
            "AdministrativeAreaName": "Tỉnh Đồng Tháp",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "6d0f752e-fcb4-48bc-a6d7-c3cd3c6fedd4",
            "AdministrativeAreaCode": "VN89",
            "AdministrativeAreaName": "Tỉnh An Giang",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "9c5252c8-584f-4b38-9666-b2a1606c3951",
            "AdministrativeAreaCode": "VN91",
            "AdministrativeAreaName": "Tỉnh Kiên Giang",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "a07df073-6449-4529-b818-fc1b98fe7362",
            "AdministrativeAreaCode": "VN92",
            "AdministrativeAreaName": "Thành phố Cần Thơ",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "15c538b2-288e-42b2-9f63-4b65953d5934",
            "AdministrativeAreaCode": "VN93",
            "AdministrativeAreaName": "Tỉnh Hậu Giang",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "b7cb42af-735c-43b1-868d-802b59aed121",
            "AdministrativeAreaCode": "VN94",
            "AdministrativeAreaName": "Tỉnh Sóc Trăng",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "5d0cd94c-4dcb-4f00-98a1-1a97891dd22b",
            "AdministrativeAreaCode": "VN95",
            "AdministrativeAreaName": "Tỉnh Bạc Liêu",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "b5cb380d-2486-41dd-8c1f-21cd54ec222d",
            "AdministrativeAreaCode": "VN96",
            "AdministrativeAreaName": "Tỉnh Cà Mau",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "b98a989a-f933-4475-9a10-58ee6078b04a",
            "AdministrativeAreaCode": "VN97",
            "AdministrativeAreaName": "Bộ Quốc Phòng",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "0c0e8d08-d232-4bca-af0f-35adacfebd28",
            "AdministrativeAreaCode": "VN98",
            "AdministrativeAreaName": "Bộ Công An",
            "Kind": 1,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        }
    ]
}

var resDistrict = {
    "Success": true,
    "Message": "Successfully.",
    "MISACode": 200,
    "Data": [
        {
            "EntityState": 0,
            "AdministrativeAreaId": "acf3966b-b5c3-46e5-bdf3-6313cfb6fe53",
            "AdministrativeAreaCode": "VN36356",
            "AdministrativeAreaName": "Thành phố Nam Định",
            "Kind": 2,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "8c7b0ddb-6fb8-46f2-8879-f542b006f47b",
            "AdministrativeAreaCode": "VN36358",
            "AdministrativeAreaName": "Huyện Mỹ Lộc",
            "Kind": 2,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "e6b2f068-dca4-4ca4-871b-82938ac41e58",
            "AdministrativeAreaCode": "VN36359",
            "AdministrativeAreaName": "Huyện Vụ Bản",
            "Kind": 2,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "069ec0f4-be7c-44a2-9d74-347f3a2ec607",
            "AdministrativeAreaCode": "VN36360",
            "AdministrativeAreaName": "Huyện Ý Yên",
            "Kind": 2,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "8a70805a-efa6-413e-a027-f07612441b69",
            "AdministrativeAreaCode": "VN36361",
            "AdministrativeAreaName": "Huyện Nghĩa Hưng",
            "Kind": 2,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "21ec7d92-91cb-4f91-85fc-431d0b7e7491",
            "AdministrativeAreaCode": "VN36362",
            "AdministrativeAreaName": "Huyện Nam Trực",
            "Kind": 2,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "1f4ff193-c31a-440e-859d-5e5f302fccb1",
            "AdministrativeAreaCode": "VN36363",
            "AdministrativeAreaName": "Huyện Trực Ninh",
            "Kind": 2,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "71d1b41d-0c3d-4615-b7a5-1dcb4802074b",
            "AdministrativeAreaCode": "VN36364",
            "AdministrativeAreaName": "Huyện Xuân Trường",
            "Kind": 2,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "790cf9b1-2c8b-4d6f-9876-0c0b3f33bb8b",
            "AdministrativeAreaCode": "VN36365",
            "AdministrativeAreaName": "Huyện Giao Thủy",
            "Kind": 2,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "4f688c6e-1cd2-4cab-9387-6a8b503a934b",
            "AdministrativeAreaCode": "VN36366",
            "AdministrativeAreaName": "Huyện Hải Hậu",
            "Kind": 2,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        }
    ]
}

var resWard = {
    "Success": true,
    "Message": "Successfully.",
    "MISACode": 200,
    "Data": [
        {
            "EntityState": 0,
            "AdministrativeAreaId": "9baba46d-d387-4c64-acce-2a34b18e2d54",
            "AdministrativeAreaCode": "VN3636614215",
            "AdministrativeAreaName": "Thị trấn Yên Định",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "a84def4e-bb5f-48b2-9517-d6d3901b4f73",
            "AdministrativeAreaCode": "VN3636614218",
            "AdministrativeAreaName": "Thị trấn Cồn",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "575fb69d-169f-462a-9e31-1d224e218793",
            "AdministrativeAreaCode": "VN3636614221",
            "AdministrativeAreaName": "Thị trấn Thịnh Long",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "0d2b3cd6-cf04-4434-9001-ab222c8f84b3",
            "AdministrativeAreaCode": "VN3636614224",
            "AdministrativeAreaName": "Xã Hải Nam",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "a4b9f5b3-881d-40b7-afc0-e768c208305b",
            "AdministrativeAreaCode": "VN3636614227",
            "AdministrativeAreaName": "Xã Hải Trung",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "339e7407-415c-4f9b-a15e-1134a073f180",
            "AdministrativeAreaCode": "VN3636614230",
            "AdministrativeAreaName": "Xã Hải Vân",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "929f4ad2-f936-4e54-81d8-989129ca73ce",
            "AdministrativeAreaCode": "VN3636614233",
            "AdministrativeAreaName": "Xã Hải Minh",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "4620c852-199f-4b5a-a744-87f219098adb",
            "AdministrativeAreaCode": "VN3636614236",
            "AdministrativeAreaName": "Xã Hải Anh",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "2114f13a-4db0-41e3-b192-72bde877a3f8",
            "AdministrativeAreaCode": "VN3636614239",
            "AdministrativeAreaName": "Xã Hải Hưng",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "e2c960e0-4542-4433-9a5b-dd503f8f974d",
            "AdministrativeAreaCode": "VN3636614242",
            "AdministrativeAreaName": "Xã Hải Bắc",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "999beb11-13e1-45cb-96e6-4978760daedb",
            "AdministrativeAreaCode": "VN3636614245",
            "AdministrativeAreaName": "Xã Hải Phúc",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "ac7780d3-a977-48f6-a82a-d3c33741ca26",
            "AdministrativeAreaCode": "VN3636614248",
            "AdministrativeAreaName": "Xã Hải Thanh",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "93e9bdb5-9146-4ff7-bd2a-587f23c19f2f",
            "AdministrativeAreaCode": "VN3636614251",
            "AdministrativeAreaName": "Xã Hải Hà",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "daec93bb-cf37-4d00-be43-3719a8d28eed",
            "AdministrativeAreaCode": "VN3636614254",
            "AdministrativeAreaName": "Xã Hải Long",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "434d9d14-ee7f-4001-8410-4ccb2c24fbbc",
            "AdministrativeAreaCode": "VN3636614257",
            "AdministrativeAreaName": "Xã Hải Phương",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "8ac015a4-9349-44e7-81ac-3b0104310c29",
            "AdministrativeAreaCode": "VN3636614260",
            "AdministrativeAreaName": "Xã Hải Đường",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "47a15a75-f3fe-4e02-a2d9-f9a74b85a178",
            "AdministrativeAreaCode": "VN3636614263",
            "AdministrativeAreaName": "Xã Hải Lộc",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "f3283d23-eb76-48a4-a645-c0d172b8ae19",
            "AdministrativeAreaCode": "VN3636614266",
            "AdministrativeAreaName": "Xã Hải Quang",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "e26ef3f9-d907-435a-a09b-a759ff2ed0a5",
            "AdministrativeAreaCode": "VN3636614269",
            "AdministrativeAreaName": "Xã Hải Đông",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "0170c78b-f46e-4797-be94-fcbb01067b93",
            "AdministrativeAreaCode": "VN3636614272",
            "AdministrativeAreaName": "Xã Hải Sơn",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "dd3d9888-54fc-4cd1-afeb-5a520d1b0b3d",
            "AdministrativeAreaCode": "VN3636614275",
            "AdministrativeAreaName": "Xã Hải Tân",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "0bb88534-abfe-45af-9159-b0e062862779",
            "AdministrativeAreaCode": "VN3636614278",
            "AdministrativeAreaName": "Xã Hải Toàn",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "3d96a8bb-0e6f-47a9-9fd8-4c882d533593",
            "AdministrativeAreaCode": "VN3636614281",
            "AdministrativeAreaName": "Xã Hải Phong",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "f3805b63-3c95-4043-a132-c210887c2944",
            "AdministrativeAreaCode": "VN3636614284",
            "AdministrativeAreaName": "Xã Hải An",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "5cf94a85-f26c-4cf1-bf0c-09152a1cf991",
            "AdministrativeAreaCode": "VN3636614287",
            "AdministrativeAreaName": "Xã Hải Tây",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "99103f9b-9c4a-4e9f-868d-0164c80d0382",
            "AdministrativeAreaCode": "VN3636614290",
            "AdministrativeAreaName": "Xã Hải Lý",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "880f6e8d-46d5-4246-8e5f-68fa89b0196b",
            "AdministrativeAreaCode": "VN3636614293",
            "AdministrativeAreaName": "Xã Hải Phú",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "c641916c-29af-4082-8f7f-d045e207ffbf",
            "AdministrativeAreaCode": "VN3636614296",
            "AdministrativeAreaName": "Xã Hải Giang",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "1f509ef4-712a-4344-9807-46dcaba9252d",
            "AdministrativeAreaCode": "VN3636614299",
            "AdministrativeAreaName": "Xã Hải Cường",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "701ead54-906f-42f2-97b6-b01ac61ba51a",
            "AdministrativeAreaCode": "VN3636614302",
            "AdministrativeAreaName": "Xã Hải Ninh",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "0fa59e05-f9b6-43f6-8c0e-33bb1537b3e3",
            "AdministrativeAreaCode": "VN3636614305",
            "AdministrativeAreaName": "Xã Hải Chính",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "d3ec5a4a-7143-441b-b226-8ce6ac66c8d4",
            "AdministrativeAreaCode": "VN3636614308",
            "AdministrativeAreaName": "Xã Hải Xuân",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "005e95bc-99dd-4db0-8434-091fa37d1d23",
            "AdministrativeAreaCode": "VN3636614311",
            "AdministrativeAreaName": "Xã Hải Châu",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "5e78f653-7868-40d7-b6b1-8d6efb49c622",
            "AdministrativeAreaCode": "VN3636614314",
            "AdministrativeAreaName": "Xã Hải Triều",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        },
        {
            "EntityState": 0,
            "AdministrativeAreaId": "9021d4fe-53ad-41a3-b42c-a37933d7477d",
            "AdministrativeAreaCode": "VN3636614317",
            "AdministrativeAreaName": "Xã Hải Hòa",
            "Kind": 3,
            "CreatedDate": null,
            "CreatedBy": null,
            "ModifiedDate": null,
            "ModifiedBy": null
        }
    ]
}
var resTransport = {
    "Success": true,
    "Message": "Thành công.",
    "MISACode": 200,
    "Data": [
        {
            "TransportorId": "35251a6d-3944-4983-ba47-901f27b89d18",
            "TransportorCode": "VC03",
            "TransportorName": " Fast Shipping",
            "InnerFee": 15000.0,
            "OutsideFee": 20000.0,
            "InnerDeliveryTime": 2,
            "OutsideDeliveryTime": 4,
            "ShopTransportors": []
        },
        {
            "TransportorId": "5017b949-77c1-2758-e5f2-17995bf2968c",
            "TransportorCode": "VC02",
            "TransportorName": "Viettel Post",
            "InnerFee": 18000.0,
            "OutsideFee": 23000.0,
            "InnerDeliveryTime": 3,
            "OutsideDeliveryTime": 5,
            "ShopTransportors": []
        },
        {
            "TransportorId": "592b006d-6335-6101-edf6-092cdb0ab5e8",
            "TransportorCode": "VC09",
            "TransportorName": "Ninja Van",
            "InnerFee": 19000.0,
            "OutsideFee": 24000.0,
            "InnerDeliveryTime": 2,
            "OutsideDeliveryTime": 5,
            "ShopTransportors": []
        }
    ]
}