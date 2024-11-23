export interface IError extends Error {
    status: number,
    msg: string
}