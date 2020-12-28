$(document).ready(function () {
    current = new IndexJs();
    sort.sortOder();
})

class IndexJs extends Base {
    constructor() {
        super();
        var me = this;
        me.loadData(1);
        me.loadComboboxCustome();
        me.initEvent();

    }

    /* Hàm thực hiện khởi tạo sự kiện
    * CreatedBy dtnga (21/11/2020)
    * */
    initEvent() {
        try {
            var me = this;
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
                me.loadData(pageIndex, tblContent);
            });
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
            $(`.pageSize select`).on("change", function () {
                var pageSize = $(this).find(`option:selected`).val();
                $(this).closest(`.pageSize`).attr("value", pageSize);
                me.loadData(1);
            });

            //sự kiện khi nhập trường Tìm kiếm
            $(`.content-filter input[type="search"]`).on("search", function (e) {
                me.loadData(1);
            });

            // Sự kiện các button tại content-filter
            $(`.content-body`).find(`#btn-add`).on("click", function () {
                me.onClick_btnAdd(this);
            });
            $(`.content-body`).find(`#btnDelete`).on("click", function () {
                me.onClick_btnDelete(this);
            });
            $(`.content-body`).find(`#btn-refresh`).on("click", me.onClick_btnRefresh.bind(me));
            // Dialog
            var dialog = $(`.content-body .m-dialog`);
            // đóng form khi nhấn ESC
            $('body').on("keydown", function (e) {
                if (e.which === 27)
                    $(dialog).addClass("displayNone");
            });
            
            $(dialog).find(`#btn-exit`).on("click", me.onClick_Exit_Dialog.bind(me));
            $(dialog).find(`#btn-cancel`).on("click", me.onClick_Exit_Dialog.bind(me));
            $(dialog).find(`#btn-save`).on("click", function () {
                me.onClick_btnSave(this);
            });
            $(dialog).find(`#btn-saveAdd`).on("click", function () {
                me.onClick_btnSaveAdd(this);
            });
        }
        catch (e) {

        }
    }


    /** Thực hiện load một số combobox thuộc trang
    * CreatedBy dtnga(23/12/2020)
    * */
    loadComboboxCustome() {
        try {
            var me = this;
            // Load combobox Brand
            var brands = [];
            $.ajax({
                url: me.host + "/api/v1/Brands/all",
                method: "GET"
            })
                .done(function (res) {
                    brands = res.Data;
                    var targetComboboxs = $(`.m-box[name="Brand"]`);
                    $.each(targetComboboxs, function (index, item) {
                        me.createComboBox(brands, item);
                    })
                })
                .fail(function (res) {
                    console.log(res);
                })
            // Load combobox BrandOrigin
            var brandOrigins = [];
            $.ajax({
                url: me.host + "/api/v1/Brands/origin",
                method: "GET"
            })
                .done(function (res) {
                    brandOrigins = res.Data;
                    var targetComboboxs = $(`.m-box[name="BrandOrigin"]`);
                    $.each(targetComboboxs, function (index, item) {
                        me.createComboBox(brandOrigins, item);
                    })
                })
                .fail(function (res) {
                    console.log(res);
                })

            // Load combobox Category
            var categories = [];
            $.ajax({
                url: me.host + "/api/v1/Categories/all",
                method: "GET"
            })
                .done(function (res) {
                    categories = res.Data;
                    var targetComboboxs = $(`.m-box[name="Category"]`);
                    $.each(targetComboboxs, function (index, item) {
                        me.createComboBox(categories, item);
                    })
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