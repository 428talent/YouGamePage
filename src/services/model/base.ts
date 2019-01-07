interface BaseModel {

}

export interface Link {
    href: string;
    rel: string;
    type: string;
}

export interface PageResult<T> {
    count: number,
    page: number,
    page_size: number,
    next_page: string,
    prev_page: string,
    result: Array<T>
}

export interface ApiResponse<T> {
    requestSuccess: boolean,
    message: any,
    statusCode: number,
    data: T
}
