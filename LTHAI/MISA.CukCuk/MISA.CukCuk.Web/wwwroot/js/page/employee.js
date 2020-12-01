$(document).ready(function () {
    // Khởi tạo đối tượng nhân viên
    new EmployeeJS();
    dialogDetail = $("#d-dialog").dialog({
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
 * Class quản lý sự kiện cho trang employee
 * CreatedBy: LTHAI(12/11/2020)
 * */
class EmployeeJS extends BaseJS {
    constructor() {

        super();
        this.initEventsOfEmployee();
    }
    /**
     * Quy định đường dẫn được sử dụng để lấy dữ liệu ở trang quản lý nhân viên
     * CreatedBy: LTHAI(12/11/2020)
     * */
    
    setApiRouter() {
        this.apiRouter = "/api/v1/employees";
    }
    initEventsOfEmployee() {
        let me = this;
        // Xóa bản ghi khi click nút xóa 
        $('.icon-remove button').click(me.ShowConfirmDeleteEmployee.bind(me))

        //Hiển thị dialog khi nhấn nút thêm khách hàng
        $('#btn-add-employee').click(this.EventsWhenClickAddEmployee.bind(me))
    }
    /**
    * Sự kiện khi click vào nút xóa thông tin của nhân viên
    * CreatedBy: LTHAI(19/11/2020)
    */
    ShowConfirmDeleteEmployee() {
        // Lấy recordId từ data của button
        let recordId = $('.icon-remove button').data('recordId');

        // Đưa ra cảnh báo xác nhận 
        //+ Lấy thông tin của bản ghi được xóa
        let url = this.host + this.apiRouter + `/${recordId}`;
        let res = GetDataOfACustomer(url);
        let title = "Xóa bản ghi";
        let body = `Bạn có chắc chắn muốn xóa khách hàng ${res.FullName} (Mã khách hàng ${res.CustomerCode}) không?`;
        // Gán id bản ghi cho nút xác nhận xóa
        $('#btn-delete').data('recordId', recordId);
        //Hiển thị thông báo xác nhận xóa
        this.ShowPopUp(title, body);
    }

    /**
    * Hiển thị dialog khi nhấn nút thêm nhân viên
    * CreatedBy: LTHAI(15/11/2020)
    * */
    EventsWhenClickAddEmployee() {
        this.FormMode = "Add";
        dialogDetail.dialog('open');
        // Lấy dữ liệu của CustomerGroup và xây dựng combobox
        let urlGetData = this.host + "/api/customergroups";
        GetDataOfCustomerGroup(urlGetData)

        // focus vào mã khách hàng khi mở dialog
        $('#txtEmployeeCode').focus();
    }
}

