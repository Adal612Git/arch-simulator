import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { OperationMode } from '@/lib/types';

type UiState = {
  mode: OperationMode;
  selectedNodeId?: string;
  setMode: (mode: OperationMode) => void;
  selectNode: (id?: string) => void;
};

export const useUiStore = create<UiState>()(
  immer((set) => ({
    mode: 'design',
    selectedNodeId: undefined,
    setMode: (mode) =>
      set((state) => {
        state.mode = mode;
      }),
    selectNode: (id) =>
      set((state) => {
        state.selectedNodeId = id;
      })
  }))
);
