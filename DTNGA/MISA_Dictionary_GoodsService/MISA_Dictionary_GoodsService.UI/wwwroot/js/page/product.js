$(document).ready(function () {
    var productManage = new ProductManage();
})

class ProductManage extends Base {
    constructor() {
        super();
        var me = this;
        me.initEventProduct();
        me.route = me.getroute();
        me.objectName = "Product";
        var productTable = $(`#products-table`);
        me.loadData(productTable);
        me.loadComboboxCustome();
    }

    getroute() {
        return "/api/v1/Products";
    }
    
    initEventProduct() {

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

    customeProcessTd(fieldName, obj) {
        if (fieldName == "BrandName" && obj["Brand"])
            return obj["Brand"][fieldName];
        if (fieldName == "CategoryName" && obj["Category"])
            return obj["Category"][fieldName];
        return obj[fieldName];
    }
}