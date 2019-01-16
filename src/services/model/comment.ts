export interface Comment {
    id: number
    user_id: number
    good_id: number
    content: string
    rating: number
    update_at: Date
}

export interface CommentSummary {
    rating_count: Array<{
        rating: number
        count: number
    }>
}
