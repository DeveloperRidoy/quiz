class AppError extends Error {
    code: number;
    
    constructor (code: 400 | 401 | 403 | 404 | 500, message: string) {
        super(message);
        this.code = code;
    
        // set prototype explicitly 
        Object.setPrototypeOf(this, AppError.prototype);
    }
}


export default AppError;