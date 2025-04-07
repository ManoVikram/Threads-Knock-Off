import { create } from 'zustand'

const useLoginPopupStore = create((set) => ({
    showLoginPopup: false,
    setShowLoginPopup: (value) => set({ showLoginPopup: value }),
}))

export default useLoginPopupStore
