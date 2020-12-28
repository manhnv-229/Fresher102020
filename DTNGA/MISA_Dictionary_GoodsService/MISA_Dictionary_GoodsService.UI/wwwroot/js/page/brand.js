class BrandJs extends IndexJs {
    constructor() {
        super();
        var me = this;
        me.loadComboboxCustome();
    }

    loadComboboxCustome() {
        try {
            var me = this;
            // Load combobox BrandOrigin
            var brandOrigins = [];
            $.ajax({
                url: me.host + "/api/v1/Brands/origin",
                method: "GET"
            })
                .done(function (res) {
                    brandOrigins = res.Data;
                    var targetComboboxs = $(`.m-box[name="BrandOrigin"]`);
                    $.each(targetComboboxs, function (index, item) {
                        me.createComboBox(brandOrigins, item);
                    })
                })
                .fail(function (res) {
                    console.log(res);
                })

        }
        catch (e) {
            console.log(e);
        }
    }
}