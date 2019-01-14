export function pagination(c, m) : Array<String> {
    let current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i >= left && i < right) {
            range.push({value:i,text:i});
        }
    }
    // debugger
    // for (let i of range) {
    //     if (l) {
    //         if (i.value - l === 2) {
    //             rangeWithDots.push(l + 1);
    //         } else if (i.value - l !== 1) {
    //             rangeWithDots.push('...');
    //         }
    //     }
    //     rangeWithDots.push(i);
    //     l = i;
    // }

    return range;
}
