const globalLoadingData = {
    loading: false,
    loadTip: ""
}

const globalLoading = (state = globalLoadingData, action) => {
    switch (action.type) {
        case "GlobalLoadingShow":
            return { loading: true, loadTip: action.loadTip }
        case "DeleteGlobalLoading":
            return globalLoadingData
        default:
            return state
    }
}

export default globalLoading

export const GlobalLoadingShow = (loadTip) => {
    return { type: "GlobalLoadingShow", loadTip: loadTip ? loadTip : '' }
}

export const DeleteGlobalLoading = () => {
    return { type: "DeleteGlobalLoading" }
}
