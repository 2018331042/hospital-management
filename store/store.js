import create from "zustand";

const rteContentStore = (set) => ({
  text: "",
  setText: () => {
    set((state) => ({ text: state.text }));
  },
});

const useRteContentStore = create(rteContentStore);

export default useRteContentStore;
