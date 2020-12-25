$(document).ready(function () {
    var indexJs = new IndexJs();
})

class IndexJs extends Base {
    constructor() {
        super();
        var me = this;
        me.initEvent();
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
            $(`.content-body:visible`).find(`#btnDelete`).on("click", function () {
                me.onClick_btnDelete(this);
            });
            $(`.content-body:visible`).find(`#btn-refresh`).on("click", me.onClick_btnRefresh.bind(me));

            $(`#btn-clear`).on("click", me.onClick_btnClear.bind(me));
            // TODO sự kiện khi nhập trường Tìm kiếm

            // TODO Sự kiện khi chọn filter

            // format khi nhập liệu số tiền
            me.autoFormatMoney();
            me.addFocusSupport();
            // Sự kiện khi thao tác với từng hàng dữ liệu trong bảng
            $(`table tbody`).on("click", "tr", function () {
                me.tr_onClick(this);
            });
            $(`table tbody`).on("dblclick", "tr", function () {
                me.onDblClick_trow(this);
            });
            // sự kiện khi tick vào checkbox/ nhiều checkbox
            $(`table thead input[type="checkbox"]`).on("click", function () {
                me.onClickCheckAll(this);
            });
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
                // load data tương ứng với content
                var tblContent = $(content).find(`.m-table`);
                var pageIndex = 1;
                me.loadData(tblContent, pageIndex);
            })
        }
        catch (e) {
            console.log(e);
        }
    }

}