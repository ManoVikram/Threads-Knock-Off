import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useThreadStore = create(
    persist(
        (set) => ({
            threads: [],
            setThreads: (newThreads) => set({ threads: newThreads }),
            addThread: (newThread) => set((state) => ({ threads: [newThread, ...state.threads] })),
        }),
        {
            name: 'thread-storage', // key in localStorage
        }
    )
)

export default useThreadStore
