
$(document).ready(function () {
    var customerJs = new CustomerJs();

    //dialog chi tiết khách hàng
    dialogDetail = $(".m-dialog").dialog({
        autoOpen: false,
        fluid: true,
        //height: 400,
        //width: '700px',
        minWidth: 800,
        resizable: true,
        modal: true,
        position: ({ my: "center", at: "center", of: window }),
    });

    //dialog cảnh báo khi thực hiện các hành động xóa dữ liệu
    dialogWarning = $(".show-pop-up-warning").dialog({
        autoOpen: false,
        fluid: true,
        //height: 400,
        //width: '700px',
        minWidth: 400,
        resizable: true,
        modal: true,
        position: ({ my: "center", at: "center", of: window }),
    });

    //sự kiện để ẩn context menu
    $('.menu-show').click(function () {
        $('.menu-show').hide();
    });
    $(document).click(function () {
        $('.menu-show').hide();
    });

    // sự kiện click vào button x để tắt thông báo
    $(".btn-close-messenger").click(function () {
        $(".show-toast-messenger").css("visibility", "hidden");
    })

});

class CustomerJs extends Base {
    constructor() {
        super();
    }
    setApiRouter() {
        this.apiRouter = '/api/customers';
    }
    initEvent() {
        super.initEvent(); //các sự kiện của cha vẫn được thực hiện, tránh bị ghi đè hoàn toàn

        /*thêm tiếp sự kiện cho riêng thằng con ở đây
         * code here
         */
        // alert("initEvent con");
        //$('input[required]').blur(this.validateRequired.bind(this));
        //$('#btnSave').click(this.validateBtnOnClick.bind(this));
        //$('.btn-edit-customer').click(this.btnEditOnClick);
        //$('.btn-delete-customer').click(this.btnDeleteOnClick);

        //$("table tbody").on('contextmenu', 'tr', function (e) {
        //      //alert("mouse right on click")

        //    //hiện thị menu
        //    $(this).siblings().removeClass('rowSelected');
        //    $(this).addClass('rowSelected');
        //    $('.menu-show').css({
        //        top: e.pageY + 'px',
        //        left: e.pageX + 'px'
        //    }).show();

        //    debugger
        //    return false;
        //});

    }
    validateRequired(target) {
        // debugger;
        //var value = $(this).val().trim();
        //if (!value) {
        //    $(this).addClass("border-red");
        //    $(this).attr("title", "Không được bỏ trống");
        //}
        //else {
        //    $(this).removeClass("border-red");
        //    $(this).removeAttr("title");
        //}
        //   debugger;
        var curentTarget = target.currentTarget;
        //  debugger

        // this.validateData(target.currentTarget);
        validateData.validateRequired(curentTarget);
    }
    //validateData(sender) {
    //    debugger
    //    var value = $(sender).val().trim();
    //    if (!value) {
    //        $(sender).addClass("border-red");
    //        $(sender).attr("title", "Không được bỏ trống");
    //    }
    //    else {
    //        $(sender).removeClass("border-red");
    //        $(sender).removeAttr("title");
    //    }
    //}
    validateBtnOnClick() {
        var inputs = $('input[required');
        var isValid = true;
        $.each(inputs, function (index, input) {
            //    debugger
            //var value = $(input).val().trim();
            //if (!value) {
            //    $(input).addClass("border-red");
            //    $(input).attr("title", "Không được bỏ trống");
            //}
            //else {
            //    $(input).removeClass("border-red");
            //    $(input).removeAttr("title");
            //}
            //  self.validateData(input);
            //   $(input).trigger('blur');

            if (!validateData.validateRequired(input)) {
                isValid = false;
            }
        })
        if (!isValid) {
            alert("Vui lòng nhập đầy đủ thông tin");
        }
    }

}