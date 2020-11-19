$(document).ready(function () {
    

    const openModalButtons = $('[data-modal-target]');
    const closeModalButtons = $('[data-close-button]');

    openModalButtons.each(function () {
        const modal = $(this).attr('data-modal-target');
        $(this).click(function () {
            oppenModal(modal);
        });
    });


    closeModalButtons.each(function () {
        $(this).click(function () {
            closeModal();
        })
    })
    /**
     * function thực hiện mở modal khi click button
     * @param {any} modal là id của modal bị target bởi button
     * CreatedBy TuongNC (12/11/2020)
     */
    function oppenModal(modal) {
        $('#overlay').show(100);
        $(modal).show(100);
    }

    /**
     * function xử lý đóng modal khi click 'X' 
     * CreatedBy TuongNC (12/11/2020)
     */
    function closeModal() {
        $('#overlay').hide();
        $('#modal').hide();
    }
})