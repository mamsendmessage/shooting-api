class Response {
    constructor() {
        this.result = -1;
        this.payload = null;
        this.errorCode = 0;
        this.errorMessage = "";
    }

    static GetGeneralError() {
        const tResponse = new Response();
        tResponse.result = -1;
        tResponse.errorCode = 500;
        tResponse.errorMessage = "Internal Server Error";
        tResponse.payload = null;
        return tResponse;
    }

    static GetErrorResponse(pCode, pMessage = "") {
        const tResponse = new Response();
        tResponse.result = -1;
        tResponse.errorCode = pCode;
        tResponse.errorMessage = pMessage;
        tResponse.payload = null;
        return tResponse;
    }

    static GetSuccessResponse(pPyload) {
        const tResponse = new Response();
        tResponse.result = 0;
        tResponse.errorCode = 0;
        tResponse.errorMessage = "";
        tResponse.payload = pPyload;
        return tResponse;
    }
}

module.exports = Response;