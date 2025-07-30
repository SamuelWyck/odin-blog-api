class PaginationManager {
    constructor() {
        this.postTakeNumber = 11;
        this.commentTakeNumber = 11;
    };


    calcPostSkipNumber(pageNum) {
        return pageNum * (this.postTakeNumber - 1);
    };

    calcCmtSkipNumber(pageNum) {
        return pageNum * (this.commentTakeNumber - 1);
    };
};



module.exports = new PaginationManager();