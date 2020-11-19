$(document).ready(function () {
    // Khởi tạo đối tượng khách hàng
    new CustomerJS();
    
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
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }
   
}

