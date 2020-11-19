class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.setActiveNavBar();
        this.loadData();
        this.initEvents();

    }
    //abtract function setDataUrl() được overide để set Url cho hàm ajax
    setDataUrl() {

    };
    /**
     * Hàm setActiveNavBar() được dùng để forcus vào tag <a> tại từng trang
     * CreatedBy TuongNC (12/11/2020)
     * */
    setActiveNavBar() {

    };
    /**
     * Hàm initEvents() được dùng để gán các sự kiện cho trang
     * CreatedBy TuongNC (14/11/2020)
     * */
    initEvents() {
        // sự kiện thêm dữ liệu khi click button lưu trong dialog thêm mới
        // + validate dữ liệu

        /** 
         validate bắt buộc nhập
         CreatedBy TuongNC (14/11/2020)
         */
        $('input[required').blur(function () {
            var value = $(this).val();
            if (value) {
                $(this).removeClass("validate-require");
                $(this).attr("validate", "true");
            } else {
                $(this).addClass("validate-require");
                $(this).attr("validate", "false");
            }
        });
        /** 
         validate email, function ValidateEmail() ở phầm common.js
         createBy TuongNC(14/11/2020)
         */
        $('input[type="email"').blur(function () {
            var value = $(this).val();
            if (ValidateEmail(value)) {
                $(this).removeClass("validate-require");
                $(this).attr("validate", "true");
            } else {
                $(this).addClass("validate-require");
                $(this).attr("validate", "false");
            }

        });
        // Thực hiện lưu dữ liệu khi nhấn button [lưu]
        $("#btnSave").click(function () {
            var self = this;
            // + Validate khi nhấn button lưu
            var inputValidates = $('input[required], input[type="email"]');
            $.each(inputValidates, function () {
                $(this).trigger('blur');
            })
            var validates = $('input[validate="false"]');
            if (validates && validates.length > 0) {
                alert("Nhập lại");
                validates[0].focus();
                return;
            }

            // + thu thập thông tin từ dữ liệu nhập --> build thành object
            var customer = {
                "CustomerGroupId": "3631011e-4559-4ad8-b0ad-cb989f2177da",
            };
            var fieldNamePosts = $('[fieldNamePost]');
            $.each(fieldNamePosts, function () {
                var fieldNamePost = $(this).attr("fieldNamePost");
                customer[fieldNamePost] = $(this).val();
            });
            console.log(customer);
            // + Gọi service tương ứng thực hiện thêm mới dữ liệu
            $.ajax({
                url: "http://api.manhnv.net/api/customers",
                method: "POST",
                data: JSON.stringify(customer),
                contentType: 'application/json',
            }).done(function (res) {
                // + + đưa ra thông báo thành công
                alert("thêm khách hàng thành công");
                // + + ẩn dialog
                $('#overlay').hide();
                $('#modal').hide();
                // + + load lại dữ liệu vào table
                self.loadData();
            }).fail(function () {
            });
        }.bind(this))



        // sự kiện click khi nhấn đồng bộ - sync table
        $("#btnRefresh").click(function () {
            $("table tbody").empty();
            this.loadData();
            alert("Đồng bộ thành công");
        }.bind(this));
        // Hiển thị thông tin chi tiết khi nhấn đúp chuột vào 1 hàng ở table
        $("table tbody").on("dblclick", "tr", function () {
            alert("thông tin chi tiết 1 bản ghi");
        })
    }

    /**
     * Hàm được dùng để in dữ liệu vào băng, định dạng lại các dữ liệu khi đổ vào bảng 
     * CreatedBy TuongNC (12/11/2020)
     * */
    loadData() {
        var thead = $('table thead th');
        var getDataUrl = this.getDataUrl;

        $.ajax({
            url: getDataUrl,
            method: "GET",
        }).done(function (res) {
            //lấy thông tin các cột dữ liệu và in từng hàng dữ liệu 
            //vòng lặp ngoài là vòng lặp dữ liệu trên service
            //vòng lặp trong để map dữ liệu thead vs tbody
            $.each(res, function (index, obj) {
                var tr = $(`<tr></tr>`)
                $.each(thead, function (index, item) {
                    var td = $(`<td><div><span></span></div></td>`);
                    // lấy các tên trường 
                    var fieldName = $(item).attr('fieldName');
                    // lấy các tên format ở trường
                    var formatType = $(item).attr('formatType');
                    var value = obj[fieldName];
                    switch (formatType) {
                        case 'ddmmyyyy':
                            value = formatDate(value);
                            break;
                        case 'money':
                            td.find('div').addClass('text-align-right');
                            value = formatSalary(value);
                            break;
                        case 'hoverTitle':
                            td.find('div').attr("title", "" + value);
                            break;
                        default:
                            break;
                    }
                    td.find('div').find('span').append(value);
                    tr.append(td);
                })
                $("table tbody").append(tr);
            })
        })
    };
    //--------------------------------------------


}