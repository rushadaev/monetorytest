import { defineStore } from 'pinia'

export const useStore = defineStore({
    id: 'main',
    state: () => ({
        tags: [] as TagType[],
        foundTags: [] as TagType[],
        selectedTags: [] as TagType[],
        savedTags: [] as TagType[],
    }),
    actions: {
        setTags(tags: TagType[]) {
            this.tags = tags
        },
        setFoundTags(tags: TagType[]) {
            this.foundTags = tags
        },
        setSelectedTags(tags: TagType[]) {
            this.selectedTags = tags
        },
        setSavedTags(tags: TagType[]) {
            this.savedTags = tags
        }
    }
})