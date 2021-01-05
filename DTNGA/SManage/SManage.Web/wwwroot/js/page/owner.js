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
            $(`#order-add input[type="search"][fieldName="ProductCode"]`).on("keyup", function (e) {
                if (e.which === 13)
                    $(`#order-add #btn-addToShoppingCard`).click();
            });
            $(`#order-add input[type="search"][fieldName="PhoneNumber"]`).on("keyup", function (e) {
                if (e.which == 13 && $(this).val() && $(this).val().trim()) {
                    me.checkCustomer(this);
                }
            })
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
                            $(`.box-info input[type=text]:first`).focus();
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
        $(targetBox).find(`input[fieldName="CustomerName"]`).val(customerName);
        $(targetBox).find(`input[fieldName="PhoneNumber"]`).val(phoneNumber);
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
                            me.loadWard(ward["AdministrativeAreaCode"], wardBox);
                            if (ward) {
                                var wardId = ward["AdministrativeAreaId"];
                                me.SelectItem(wardBox, wardId);
                            }
                        }
                    }
                    
                })
                .fail(function (res) {
                    console.log(res);
                })
        }
    }

    /** Thực hiện tự động bind dữ liệu tỉnh/thành
     * @param {Element} provinceBox Box chứa thông tin
     * CreatedBy dtnga (08/12/2020)
     * */
    loadProvince(provinceBox) {
        var me = this;
        var targetCombos = $(`.content-body`).find(`.input-box[fieldName="Province"] .m-box`);
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
                });
            })
            .fail(function (res) {
                console.log(res);
            })
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
                })
                .fail(function (res) {
                    console.log(res);
                })
        }
    }
}