class PaginationManager {
    constructor() {
        this.postTakeNumber = 10;
    };


    calcPostSkipNumber(pageNum) {
        return pageNum * this.postTakeNumber;
    };
};



module.exports = new PaginationManager();