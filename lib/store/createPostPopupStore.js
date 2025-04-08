import { create } from 'zustand'

const useCreatePostPopupStore = create((set) => ({
    showCreatePostPopup: false,
    setShowCreatePostPopup: (value) => set({ showCreatePostPopup: value }),
}))

export default useCreatePostPopupStore
