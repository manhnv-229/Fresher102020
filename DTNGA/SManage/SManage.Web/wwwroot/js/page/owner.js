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
        var sortEvent = sort.sortOder();
    }

    /** Thực hiện lấy thông tin người dùng sau khi đăng nhập
     * CreatedBy dtnga (26/11/2020)
     * */
    loadAccount() {
        //lấy thông tin người dùng từ API
        try {
            var me = this;
            var fullName = me.userInfo["FullName"];
            var userId = me.userInfo["UserId"];
            $(`.header .username`).text(fullName);
            $(`.header .username`).data("keyId", userId);
        }
        catch (e) {
            console.log(e);
        }

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
                    var targetBox = $(document).find(`.m-box[name="OrderState"]`);
                    var data = res.Data;
                    orderState = data;
                    me.createComboBox(data, targetBox);
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
                var shops = res.Data;
                var comboBoxShop = $(`#cb-Shop`);
                me.createComboBox(shops, comboBoxShop);
                var firstItem = $(comboBoxShop).find(".item")[0];
                $(firstItem).trigger("click");
                // Tạo sự kiện khi click item
                $(comboBoxShop).find(`.item`).on("click", function () {
                    // load lại đơn hàng
                    me.loadData(1, $(`#orders-table`));
                    // load lại đơn vị vận chuyển
                    me.loadTransportComboBox();
                });

                me.loadTransportComboBox();
                me.creatPagingSizeBox();

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
                var defaultSelectedItem = $(item).find(".item")[0];
                $(defaultSelectedItem).trigger("click");
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
                    var transportors = res.Data;
                    var cbTrans = $(`#order-add #cb-transportor`);
                    me.createComboBox(transportors, cbTrans);
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
                    var tblContent = $(content).find(`.m-table`);
                    var trs = $(tblContent).find(`tbody tr`);
                    if (trs.length == 0)
                        me.loadData(1, tblContent);
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
                me.onDblClick_trow(this);
            });
            $(`table thead input[type="checkbox"]`).on("click", function () {
                me.onClickCheckAll(this);
            })

            // Sự kiện tự động thêm sản phẩm vào giỏ khi click nút Thêm vào giỏ
            $(`#btn-addToShoppingCard`).on("click", me.onClick_addToShoppingCard.bind(me));
            // sự kiện khi blur các trường input
            $(`input`).blur(me.onBlur_inputField);

            // Sự kiện trên trang Add Order:
            $(`input[type="search"][fieldName="PhoneNumber"]`).on("search", function(){
                if( $(this).val() && $(this).val().trim())
                    me.onSearchCustomerByPhoneNumber(this);
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    onSearchCustomerByPhoneNumber(input) {
        var me = this;
        if (!input)
            return;
        var phoneNumber = $(input).val().trim();
        var route = "/api/v1/Customers/PhoneNumber/" + phoneNumber;
        $.ajax({
            url: me.host + route,
            method: "GET"
        })
            .done(function (res) {
                var customer = res;
                if (customer) {
                    // ẩn mark 
                    $(this).closest(".content-box").find(`.empty-result`).addClass("displayNone");
                    // Bind dữ liệu
                    me.autoBindCustomer(customer);
                }
                else
                    $(this).closest(".content-box").find(`.empty-result`).removeClass("displayNone");
            })
            .fail(function (res) {

            })
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
        //thông tin chung
        var customerName = !customer["FullName"] ? '' : customer["FullName"];
        var phoneNumber = !customer["PhoneNumber"] ? '' : customer["PhoneNumber"]
        var address = !customer["Address"] ? '' : customer["Address"];
        $(`.box-info input[fieldName="CustomerName"]`).val(customerName);
        $(`.box-info input[fieldName="PhoneNumber"]`).val(phoneNumber);
        $(`.box-info input[fieldName="Address"]`).val(address);
        // thông tin xã/phường, ...
        var areaCode = !customer["AdministrativeAreaCode"] ? "VN" : customer["AdministrativeAreaCode"];
        if (areaCode.length > 2) {
            //lấy dữ liệu đầy đủ từ api
            var route = "/api/v1/AdministrativeAreas/FullAddress";
            $.ajax({
                url: me.host + route + "?areaCode=" + areacode,
                method: "GET"
            })
                .done(function (res) {
                    var fullarea = res.Data;
                    var province = !fullarea["Province"] ? '' : fullarea["Province"];
                    var district = !fullarea["District"] ? '' : fullarea["District"];
                    var ward = !fullarea["Ward"] ? '' : fullarea["Ward"];
                    if (province) {
                        //TODO chọn item tại combo Tỉnh/thành
                        $(`.box-info input[fieldname="Province"]`).val(province["AdministrativeAreaName"]);
                        $(`.box-info input[fieldname="Province"]`).attr("validate", true);
                        $(`.box-info input[fieldName="Province"]`).data("keyCode", province["AdministrativeAreaCode"]);
                    }
                    if (district) {
                        $(`.box-info input[fieldname="District"]`).val(district["AdministrativeAreaName"]);
                        $(`.box-info input[fieldName="District"]`).data("keyCode", district["AdministrativeAreaCode"]);
                        $(`.box-info input[fieldname="District"]`).attr("validate", true);
                    }
                    if (ward) {
                        $(`.box-info input[fieldname="Ward"]`).val(ward["AdministrativeAreaName"]);
                        $(`.box-info input[fieldName="Ward"]`).data("keyCode", ward["AdministrativeAreaCode"]);
                        $(`.box-info input[fieldname="Ward"]`).attr("validate", true);
                    }
                })
                .fail(function (res) {
                    console.log(res);
                })
        }
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
        //    url: me.host + me.Route + "?areaCode=&kind=1",
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
            //    url: me.host + me.Route + "?areaCode=" + provinceCode + "&kind=2",
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
            //    url: me.host + me.Route + "?areaCode=" + districtCode + "&kind=3",
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

}