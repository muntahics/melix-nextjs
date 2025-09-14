import {create} from "zustand"

type SearchState = {
    loading: boolean
    setLoading: (value: boolean) => void
}

export const useSearchStore = create<SearchState>((set)=>(
    {
        loading: false,
        setLoading: (value) => set({loading: value})
    }
))