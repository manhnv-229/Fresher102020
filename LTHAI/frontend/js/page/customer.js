$(document).ready(function () {
    // Khởi tạo đối tượng khách hàng
    new CustomerJS();
    dialogDetail = $(".m-dialog").dialog({
        autoOpen: false,
        fluid: true,
        //height: 400,
        //width: '700px',
        minWidth: 700,
        resizable: true,
        position: ({ my: "center", at: "center", of: window }),
        modal: true,
    });
})
/**
 * Class quản lý sự kiện cho trang quản lý khách hàng
 * CreatedBy: LTHAI(12/11/2020)
 * */
class CustomerJS extends BaseJS {
    constructor() {
        super();
    }
    /**
    * Quy định đường dẫn được sử dụng để lấy dữ liệu ở trang quản lý khách hàng
    * CreatedBy: LTHAI(12/11/2020)
    * */
    setApiRouter() {
        this.apiRouter = "/api/customers";
    }
   
}

