$(document).ready(function () {
    new Employeejs();
})


class Employeejs extends BaseJs {
    constructor() {
        super();
    }

    setUrl() {
        this.getUrl = 'http://api.manhnv.net/api/employees';
    }
}

