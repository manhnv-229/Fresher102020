$(document).ready(function () {
    
    var orderManagement = new OrderManagement();
})

class OrderManagement extends Base {
    constructor() {
        super();
        var me = this;
        me.loadShop();
        me.loadAccount();
        me.loadData();
        me.initEvent();
    }
}