import { create } from 'zustand'

const useCreatePostPopupStore = create((set) => ({
    showCreatePostPopup: false,
    parentThreadID: null,
    setParentThreadID: (value) => set({ parentThreadID: value }),
    setShowCreatePostPopup: (value) => set({ showCreatePostPopup: value }),
}))

export default useCreatePostPopupStore
