$(document).ready(function () {
    // Khởi tạo đối tượng nhân viên
     new EmployeeJS();
})
/**
 * Class quản lý sự kiện cho trang employee
 * CreatedBy: LTHAI(12/11/2020)
 * */
class EmployeeJS extends BaseJS {
    constructor() {
        super();
    }
    /**
     * Quy định đường dẫn được sử dụng để lấy dữ liệu ở trang quản lý nhân viên
     * CreatedBy: LTHAI(12/11/2020)
     * */
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/employees";
    }
}

