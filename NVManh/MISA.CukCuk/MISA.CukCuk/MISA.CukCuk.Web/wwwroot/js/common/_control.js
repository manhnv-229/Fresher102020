$(document).ready(function () {
    new Control();
})

class Control {
    constructor() {
        this.init();
        this.initEvents();
    }

    init() {
        this.buildElements();
    }

    initEvents() {
        $(document).on('keyup', 'input[date-picker].hasDatepicker', function () {
            var value = this.value;
            if (value && (value.length == 2 || value.length == 5)) {
                value = value + '/';
            }
            debugger
            $(this).val(value);
        })

        //TODO: Chọn item trong combobox:
        $(document).on('click', '.m-combobox button.m-combobox-trigger', function () {
            var comboboxData = $(this).siblings('.m-combobox-data');
            // Hiển thị màu sắc item được chọn có trong danh sách:
            var combobox = comboboxData.parent();
            var itemSelected = $(combobox).data('data');
            comboboxData.children().removeClass('mCombobox__item--selected');
            if (itemSelected && itemSelected.value) {
                var value = itemSelected.value;
                comboboxData.children("[value='" + value + "']").addClass('mCombobox__item--selected');
            }
            comboboxData.toggle();
        })

        //TODO: xây dựng combobox động
        $(document).on('click', '.m-combobox .m-combobox-item', function () {
            var comboboxData = this.parentElement;
            var input = $(comboboxData).siblings('input');
            var value = this.getAttribute('value'),
                text = this.textContent;
            input.val(text);
            $(input.parent()).data("data", { text: text, value: value });
            input.parent.data = { text: text, value: value };
            $(comboboxData).toggle();
        })
    }
    buildElements() {
        this.buildCombobox();
        this.buildDatePicker();
    }

    //TODO: build html cho combobox
    buildCombobox() {
        var inputs = $('mcombobox');
        $.each(inputs, function (index, input) {
            var label = $(input).attr('label'),
                id = $(input).attr('id'),
                labelCls = $(input).attr('label-cls'),
                controlCls = $(input).attr('input-cls'),
                fieldValue = $(input).attr('fieldValue'),
                fieldText = $(input).attr('fieldText');
            var controlHtml = $(`<div id="` + id + `" class="m-combobox" control-type="combobox">
                                    <div class="m-label `+ labelCls + `">` + label + `</div>
                                    <input class="m-combobox-input `+ controlCls + `" type="text" autocomplete="off" />
                                    <button class="m-combobox-trigger"><i class="fas fa-chevron-down"></i></button>
                                    <div class="m-combobox-data">
                                        <div class="m-combobox-item" value="1">Nam</div>
                                        <div class="m-combobox-item" value="0">Nữ</div>
                                        <div class="m-combobox-item" value="2">Khác</div>
                                    </div>
                                </div>`);
            $(this).replaceWith(controlHtml);
        })
    }

    //TODO: build html date picker:
    buildDatePicker() {
        var inputs = $('m-date-picker');
        $.each(inputs, function (index, input) {
            var label = $(input).attr('label'),
                id = $(input).attr('id'),
                labelCls = $(input).attr('label-cls'),
                controlCls = $(input).attr('input-cls'),
                format = $(input).attr('format'),
                fieldName = $(input).attr('fieldName');
            var controlHtml = $(`<div class="m-date-picker">
                                     <div class="` + (labelCls ? labelCls : '') + `">` + (label ? label : '') + `</div>
                                     <div class="` + (controlCls ? controlCls : '') + `">
                                        <div class="dateInput">
                                            <input id="` + (id ? id : '') + `" date-picker format="` + (format ? format : '') + `" fieldName="` + (fieldName ? fieldName : '') + `" type="text" placeholder="_ _/ _ _/ _ _ _ _" autocomplete="off"/>
                                            <div class="dateInput-icon-box"></div>
                                        </div>
                                    </div>
                                </div>`);
            $(this).replaceWith(controlHtml);
            $("#" + id + "").datepicker({
                showOn: "button",
                buttonImage: "/content/icon/date-picker.svg",
                buttonImageOnly: true,
                buttonText: "Chọn ngày",
                dateFormat: "dd/mm/yy"
            });
        })
    }
}