export function buildUrlQueryParams(url, queryParams): string {
    return url + "?" + Object.getOwnPropertyNames(queryParams).map(queryParam => {
        if (Array.isArray(queryParams[queryParam])) {
            return queryParams[queryParam].map(queryParamValue => (`${queryParam}=${queryParamValue}`)).join("&")
        }
        return `${queryParam}=${queryParams[queryParam]}`
    }).join("&")
}
