export function getRatingText(ratingAvg) {
    if (ratingAvg < 2) {
        return "多半差评"
    } else if (ratingAvg < 2.5) {
        return "褒贬不一"
    } else if (ratingAvg < 3.5) {
        return "较为好评"
    } else if (ratingAvg <= 5) {
        return "多数好评"
    }
}