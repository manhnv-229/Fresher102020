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
        $(document).on('keyup','input[date-picker].hasDatepicker', function () {
            var value = this.value;
            if (value && (value.length == 2 || value.length == 5)) {
                value = value + '/';
            }
            debugger
            $(this).val(value);
        })

        $(document).on('click', '.m-combobox button.m-combobox-trigger', function () {
            var comboboxData = $(this).siblings('.m-combobox-data');
            comboboxData.toggle();
        })

        //TODO: xây dựng combobox động
        $(document).on('click', '.m-combobox .m-combobox-item', function () {
            var comboboxData = this.parentElement;
            var input = $(comboboxData).siblings('input');
            var value = this.getAttribute('value'),
                text = this.textContent;
            input.val(text);
            debugger
            $(input.parent).data("data", { text: text, value: value });
            $(comboboxData).toggle();
        })
    }
    buildElements() {
        this.buildCombobox();
        this.buildDatePicker();
    }

    //TODO: build html cho combobox
    buildCombobox() {

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