import React from "react";
import Config from "react-native-config";

import { DebuggerMenu } from "./DebuggerMenu";

export const Debugger = () => {
  if (Config?.ENV?.includes("development")) {
    return <DebuggerMenu />;
  }
  return null;
};
