import { create } from 'zustand'

const useCreatePostPopupStore = create((set) => ({
    showCreatePostPopup: false,
    parentThreadID: 0,
    setParentThreadID: (value) => set({ parentThreadID: value }),
    setShowCreatePostPopup: (value) => set({ showCreatePostPopup: value }),
}))

export default useCreatePostPopupStore
