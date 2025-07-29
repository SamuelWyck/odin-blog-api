class PaginationManager {
    constructor() {
        this.postTakeNumber = 10;
        this.commentTakeNumber = 20;
    };


    calcPostSkipNumber(pageNum) {
        return pageNum * this.postTakeNumber;
    };

    clacCommentSkipNumber(pageNum) {
        return pageNum * this.commentTakeNumber;
    };
};



module.exports = new PaginationManager();