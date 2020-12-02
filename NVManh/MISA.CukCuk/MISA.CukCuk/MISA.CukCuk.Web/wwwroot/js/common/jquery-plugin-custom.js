$(document).ready(function () {
    (function ($) {
        $.fn.extend({
            // Lấy value với các element xác định là combobox:
            getValue: function (options) {
                var controlType = this.attr("control-type");
                switch (controlType) {
                    case "combobox":
                        var data = $(this).data('data');
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
                        var data = $(this).data('data');
                        if (data && data.text) {
                            return data.text;
                        } else {
                            return null;
                        }
                        break;
                    default:
                        return null;
                }
            }
        });
    })(jQuery);
})