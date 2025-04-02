import { create } from 'zustand'

const useThreadStore = create((set) => ({
    threads: [],
    setThreads: (newThreads) => set({ threads: newThreads }),
    addThread: (newThread) => set((state) => ({ threads: [newThread, ...state.threads] })),
}))

export default useThreadStore
