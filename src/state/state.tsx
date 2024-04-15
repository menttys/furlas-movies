import { create } from "zustand";

import { storage } from "./localStorage";

export const useStore = create(() => ({
  storage,
}));
