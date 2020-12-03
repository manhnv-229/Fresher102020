$(document).ready(function () {
    new MPlugin();
    (function ($) {
        $.fn.extend({
            // Lấy value với các element xác định là combobox:
            getValue: function (options) {
                var controlType = this.attr("control-type");
                switch (controlType) {
                    case "combobox":
                        var data = $(this).data('selected');
                        if (data && data.value) {
                            return data.value;
                        } else {
                            return null;
                        }
                        break;
                    default:
                        return null;
                }
            },
            getText: function (options) {
                var controlType = this.attr("control-type");
                switch (controlType) {
                    case "combobox":
                        var data = $(this).data('selected');
                        if (data && data.text) {
                            return data.text;
                        } else {
                            return null;
                        }
                        break;
                    default:
                        return null;
                }
            },
            getData: function (options) {
                var controlType = this.attr("control-type");
                switch (controlType) {
                    case "combobox":
                        return $(this).data('data');
                        break;
                    default:
                        return null;
                }
            }
        });
    })(jQuery);
})

class MPlugin {
    constructor() {
        this.init();
        this.initEvents();
    }
    init() {
        this.buildElements();
    }

    initEvents() {
        var me = this;
        $(document).on('keyup', 'input[date-picker].hasDatepicker', function () {
            var value = this.value;
            if (value && (value.length == 2 || value.length == 5)) {
                value = value + '/';
            }
            debugger
            $(this).val(value);
        })

        $(document).on('input', '[control-type="combobox"] input.m-combobox-input', function () {
            debugger;
            var inputValue = this.value;
            var combobox = $(this).parent();
            var data = combobox.data('data');
            var entity = combobox.data('entity');
            var dataFilter = $.grep(data, function (item) {
                return item[entity.FieldText].toLowerCase().includes(inputValue.toLowerCase()) == true;
            })
            me.buildHTMLComboboxData(combobox, dataFilter, entity.FieldText, entity.FieldValue);
            combobox.data('areFiltering', true);
            combobox.data('selected', null);
            $(this).siblings('.m-combobox-data').show();
        })

        //TODO: Chọn item trong combobox:
        $(document).on('click', '.m-combobox button.m-combobox-trigger', function () {
            var comboboxData = $(this).siblings('.m-combobox-data');
            var combobox = comboboxData.parent();

            // Build lại dữ liệu cho combobox:
            var data = combobox.data('data');
            var areFiltering = combobox.data('areFiltering');

            // Nếu đang có việc filter dữ liệu thì load lại data, không thì thôi:
            if (data && areFiltering) {
                combobox.data('areFiltering', false);
                var entity = combobox.data('entity');
                me.buildHTMLComboboxData(combobox, data, entity.FieldText, entity.FieldValue);
            }

            // Hiển thị màu sắc item được chọn có trong danh sách:
            var itemSelected = $(combobox).data('selected');
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
                text = this.firstElementChild.textContent;
            input.val(text);
            debugger
            $(input.parent()).data("selected", { text: text, value: value });
            input.parent.data = { text: text, value: value };
            $(comboboxData).toggle();
        })
    }

    buildElements() {
        this.buildCombobox();
        this.buildDatePicker();
    }

    //TODO: build html cho combobox
    buildCombobox(inputs) {
        var me = this;
        if (!inputs) {
            inputs = $('mcombobox');
        }
        $.each(inputs, function (index, combobox) {
            var apiGetUrl = $(this).attr('apiGetUrl');
            if (apiGetUrl) {
                $.ajax({
                    method: 'GET',
                    url: apiGetUrl,
                }).done(function (res) {
                    me.buildHTMLCombobox(combobox, res).bind(me);
                }).fail(function () {
                    me.buildHTMLCombobox(combobox, null).bind(me);
                })
            } else {
                me.buildHTMLCombobox(combobox, null).bind(me);
            }
        })
    }

    buildHTMLCombobox(combobox, data) {
        var label = $(combobox).attr('label'),
            id = $(combobox).attr('id'),
            labelCls = $(combobox).attr('label-cls'),
            controlCls = $(combobox).attr('input-cls'),
            dataIndex = $(combobox).attr('dataIndex'),
            fieldValue = $(combobox).attr('fieldValue'),
            fieldText = $(combobox).attr('fieldText');
        var controlHtml = $(`<div id="` + id + `" class="m-combobox" control-type="combobox">
                                    <div class="m-label `+ labelCls + `">` + label + `</div>
                                    <input class="m-combobox-input `+ controlCls + `" type="text" autocomplete="off" />
                                    <button class="m-combobox-trigger"><i class="fas fa-chevron-down"></i></button>
                                    <div class="m-combobox-data">
                                    </div>
                                </div>`);
        if (data) {
            this.buildHTMLComboboxData(controlHtml, data, fieldText, fieldValue);
            //$.each(data, function (index, item) {
            //    var text = item[fieldText],
            //        value = item[fieldValue];
            //    var itemHTML = `<div class="m-combobox-item" value="` + value + `"><span>` + text + `</span></div>`;
            //    controlHtml.find('.m-combobox-data').append(itemHTML);
            //})
        }

        // Lưu trữ dữ liệu của combobox
        $(controlHtml).data('data', data);

        // Lưu trữ thông tin entity sẽ bindding của Object:
        $(controlHtml).data('entity', {
            DataIndex: dataIndex,
            FieldText: fieldText,
            FieldValue: fieldValue
        });
        $(combobox).replaceWith(controlHtml);
    }

    /** ---------------------------------------------------------------
     * Thực hiện buil các item html cho element chứa dữ liệu cho combobox
     * @param {HTMLElement} comboboxHTML HTML của combobox
     * @param {Array} data mảng dữ liệu truyền vào
     * CreatedBy: NVMANH (03/12/2020)
     */
    buildHTMLComboboxData(comboboxHTML, data, fieldText, fieldValue) {
        var comboboxDataEl = comboboxHTML.find('.m-combobox-data');
        // clear toàn bộ dữ liệu cũ:
        $(comboboxDataEl).empty();
        $.each(data, function (index, item) {
            var text = item[fieldText],
                value = item[fieldValue];
            var itemHTML = `<div class="m-combobox-item" value="` + value + `"><span>` + text + `</span></div>`;
            comboboxDataEl.append(itemHTML);
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