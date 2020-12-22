$(document).ready(function () {
    var productManage = new ProductManage();
})

class ProductManage extends Base {
    constructor() {
        super();
        var me = this;
        me.Route = "/api/v1/Products/paging?limit=10&offset=1";
        var productTable = $(`#products-table`);
        me.loadData(productTable);
    }

    customeProcessTd(fieldName, obj) {
        if (fieldName == "BrandName")
            return obj["Brand"][fieldName];
        if (fieldName == "CategoryName")
            return obj["Category"][fieldName];
        return obj[fieldName];
    }
}