import { create } from 'zustand';

const useStore = create((set, get) => ({
    // Структура сайта
    siteStructure: null,

    gallery: [],

    // Активные инструменты (массив строк)
    activeTools: [],

    // ID текущего редактируемого блока (основного)
    editingElementId: null,

    // ID текущего редактируемого подблока (карточки, элемента)
    editingSubElementId: null,

    // Методы для работы со структурой сайта
    setSiteStructure: (structure) => set({ siteStructure: structure }),

    // Обновить галерею
    setGallery: (newGallery) => set({ gallery: newGallery }),

    // Методы для работы с инструментами
    addActiveTool: (toolName) => {
        set((state) => ({
            activeTools: [...state.activeTools, toolName]
        }));
        console.log('После добавления activeTools:', get().activeTools);
    },

    removeActiveTool: (toolName) =>
        set((state) => ({
            activeTools: state.activeTools.filter(t => t !== toolName)
        })),

    clearActiveTools: () => set({ activeTools: [] }),

    // Методы для работы с ID
    setEditingElementId: (id) => set({ editingElementId: id }),
    setEditingSubElementId: (id) => set({ editingSubElementId: id }),
    clearElementId: () => set({ editingElementId: null }),
    clearSubElementId: () => set({ editingSubElementId: null }),
}));

export { useStore };