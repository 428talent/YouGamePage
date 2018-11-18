interface BaseModel {

}

interface PageResult<T> {
    count: number,
    page: number,
    page_size: number,
    result: Array<T>
}
