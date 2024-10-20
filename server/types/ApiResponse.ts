export type ApiResponse = {
    code: number,
    data?: any 
};

export function makeResponse(code: number, data?: any): ApiResponse {
    return { code, data };
}