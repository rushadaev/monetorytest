import { defineStore } from 'pinia'

export const useStore = defineStore({
    id: 'main',
    state: () => ({
        tags: [] as string[],
        foundTags: [] as string[],
        selectedTags: [] as string[],
        savedTags: [] as string[],
    }),
    actions: {
        setTags(tags: string[]) {
            this.tags = tags
        },
        setFoundTags(tags: string[]) {
            this.foundTags = tags
        },
        setSelectedTags(tags: string[]) {
            this.selectedTags = tags
        },
        setSavedTags(tags: string[]) {
            this.savedTags = tags
        }
    }
})