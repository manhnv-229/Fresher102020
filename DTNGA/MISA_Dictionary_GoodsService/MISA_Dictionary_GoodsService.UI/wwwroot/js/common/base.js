
class Base {
    constructor() {
        var me = this;
        me.Host = "https://localhost:44323";
        me.Route = "";
        me.initEvent();
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
            me.addFocusSupport();
            // Sự kiện khi thao tác với từng hàng dữ liệu trong bảng
            $(`table tbody`).on("click", "tr", me.tr_onClick);
            $(`table tbody`).on("dblclick", "tr", me.onDblClick_trow.bind(me));
            // sự kiện khi tick vào checkbox/ nhiều checkbox
            $(`table thead input[type="checkbox"]`).on("click", me.onClickCheckAll.bind(me));
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
            if (itemOffsetTop >= wrapperHeight)
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
                                                <input class="checkbox" type="checkbox" name="order" />
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
                    $(`tbody tr:first`).select();
                    $(`tbody tr:first`).addClass("selected");
                    $(`tbody tr:first input[type="checkbox"]`).prop("checked", true);
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


