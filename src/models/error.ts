

let errorId = 0;
export default ({
    namespace: "error",
    state: {
        messages: []
    },
    subscriptions: {},
    effects: {},
    reducers: {
        sendError(state, {message}) {
            errorId++;
            return {
                ...state,
                messages: [...state.messages, {id: errorId, message}]
            }
        },
        messageShow(state, {id}) {
            return {
                ...state,
                messages: [...state.messages.filter(error => error.id !== id)]
            }
        },
        'setState'(state, {payload}) {
            return {
                ...state,
                ...payload,
            }
        }
    },

})
