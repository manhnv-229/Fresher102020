

class ProductManage extends IndexJs {
    constructor() {
        super();
        var me = this;
        me.route = me.getRoute();
        me.loadComboboxCustome();
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

/**
 * Xử lý data tại mỗi td đặc biệt của table
 * CreatedBy dtnga (22/12/2020)
 * @param {string} fieldName
 * @param {object} obj
 */
    customeProcessTd(fieldName, obj) {
        if (fieldName == "BrandName" && obj["Brand"])
            return obj["Brand"][fieldName];
        if (fieldName == "CategoryName" && obj["Category"])
            return obj["Category"][fieldName];
        return obj[fieldName];
    }
}