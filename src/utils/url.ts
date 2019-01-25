export function buildUrlQueryParams(url, queryParams): string {
    return url + "?" + Object.getOwnPropertyNames(queryParams).filter(queryName => queryName.length > 0 && queryParams[queryName] !== undefined).map(queryParam => {
        if (Array.isArray(queryParams[queryParam])) {
            return queryParams[queryParam].map(queryParamValue => (`${queryParam}=${queryParamValue}`)).join("&")
        }
        return `${queryParam}=${queryParams[queryParam]}`
    }).join("&")
}
