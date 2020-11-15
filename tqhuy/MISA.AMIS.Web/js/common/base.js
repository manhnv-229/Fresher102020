/**
 * class các chức năng sử dụng chung
 * createdby: tqhuy (12-11-2020)
 * */
class Base {

    constructor() {
        this.getUrl = null;
        this.setUrl();
        this.getData();
        this.initEvents();
        this.functionsValidate();
    }

    /**
     * set url để gọi api trả về dữ liệu cho hàm getData
     * createdby: tqhuy(15/11/2020)
     * */
    setUrl() {}

    /**
     * hàm gọi api trả về dữ liệu rồi đẩy lên table
     * tqhuy 12/11/2020 
     */
    getData() {
      
        $.ajax({
            url: this.getUrl,
            method: "GET",
            dataType: "JSON",
            success: function (reponse) {
                // xóa dữ liệu của bảng
                $('table tbody').empty();
                // lấy tất cả các cột của table
                var columns = $('table thead th');
                $.each(reponse, function (index, item) {
                    var rowtable = $("<tr></tr>");
                    $.each(columns, function (i, column) {
                        var td = $("<td></td>");
                        var fieldName = $(column).attr("fieldName");
                        var formatType = $(column).attr("formatType");
                        
                        if (fieldName != "index") {

                            if (formatType == "ddmmyyyy") {
                                td.addClass("text-align-center");
                                td.append(formatDate(item[fieldName]));                      
                            }
                            else if (formatType == "Money") {
                                td.addClass();
                                td.append(formatMoney(item[fieldName]));
                            }                           
                            else {
                                td.append(item[fieldName]);
                            }
                            //if (fieldName == "Address") {
                            //    td.addClass("max-with");                                
                            //}
                            td.addClass("max-with");
                            rowtable = rowtable.append(td);
                            
                        }
                        else{
                            rowtable = rowtable.append(`<td>${index + 1}</td>`);
                        }

                    });
                    $("tbody").append(rowtable);
                });
            },
            error: function (err) {
                alert("Có lỗi! Không thể load được dữ liệu!");
            }
        });
    }


    /**
     * các event hay dùng: 
     * createdby: tqhuy (15/11/2020)
     * */
    initEvents() {

        var me = this;
        // envent load lại dữ liệu table
        $('.btn-refresh').click(function () {
            me.getData();
        });

        // envent click vào buttom thêm mới
        $('.button-insert').click(function () {
            $("#dialog").show();
        })

        // envent click vào buttom lưu của dialog
        $('.btn-save').click(function () {

            // validate dữ liệu:
            var inputVaidates = $('input[required], input[type="email"]');
            $.each(inputVaidates, function (index, input) {
                $(input).trigger('blur');
            })
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại.");
                inputNotValids[0].focus();
                return;
            }

            var infos = $(".input-insert");
            var data = "{";
            $.each(infos, function (index, info) {
                var key = $(info).attr("fieldname");
                var value = $(info).val();
                var item = `"${key}":"${value}",`;
                data = data + item   
            });
            var dataPost = data.substring(0, data.length - 1) + "}";

            debugger;
            $.ajax({
                url: this.getUrl,
                method: 'POST',
                data: dataPost,
                contentType: 'application/json',
                success: function () {
                    debugger;
                    alert("Thêm mới thành công!");
                    $("#dialog").hide();
                    me.getData();
                },
                error: function (err) {
                    debugger;
                    alert("Có lỗi! Không thể thêm dữ liệu!")
                }
            })
        }.bind(this));

        // event ẩn dialog
        $(".btn-cancel").click(function () {
            $("#dialog").hide();
        });

        // event dblclick vào row table hiển thị dialog thông tin chi tiết
        $('table tbody').on('dblclick', 'tr', function () {
            $("#dialog").show();
        })

        // event chọn trang dữ liệu của table
        $('.page-table').click(function () {
            $(this).addClass("page-selected");
            $(this).siblings().removeClass("page-selected");
        })

    }

    /**
     *hàm gồm chức năng validate các yêu cầu bắt buộc khi tương tác với các chức năng của người dùng
     * createdby: tqhuy (15/11/2020)
     * */
    functionsValidate() {



        // validate bắt buộc nhập, kiểm tra chống thì sẽ cảnh báo
        $('input[required]').blur(function () {
            var value = $(this).val();
            if (!value) {
                $(this).addClass("border-red");
                $(this).attr('title', 'Trường này không được phép để trống');
                $(this).attr("validate", false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }
        });

        // validate email đúng định dạng
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (!testEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng.');
                $(this).attr("validate", false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }
        })

        // validate số điện thoại phải là chữ số
        $('.txtPhoneNumber').blur(function () {
            var value = $(this).val();
            var testEmail = /[^a-zA-Z]+/g;
            if (!testEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Số điện thoại phải là chữ số.');
                $(this).attr("validate", false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }
        })
    }
}