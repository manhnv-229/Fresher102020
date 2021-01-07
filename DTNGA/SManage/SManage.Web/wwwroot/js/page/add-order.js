$(document).ready(function () {
    var addOrder = new AddOrder();
})

class AddOrder extends Base {
    constructor() {
        try {
            super();
            this.autoCompleteProduct();
            this.autoCompleteProvince();
            this.initEventOrderAddPage();

        }
        catch (e) {
            console.log(e);
        }
    }

    /** Khởi tạo sự kiện cho các thành phần trên trang Order Add
     * CreatedBy dtnga (02/12/2020)
     * */
    initEventOrderAddPage() {
        try {
            var me = this;

            //TODO lỗi lặp check trường bắt buộc nhập trước
            $(`#order-add input[type="search"][fieldName="District"]`).focus(me.onFocus_inputField);


        }
        catch (e) {
            console.log(e);
        }
    }

    

}