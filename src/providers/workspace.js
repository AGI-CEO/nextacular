// workspace.js - Client Component
// "use client" indicates that this component and all its descendants are client components.

"use client"; // This directive marks this module as a Client Component

import { createContext, useContext } from 'react';

const initialState = {
  workspace: null,
};

export const WorkspaceContext = createContext(initialState);

export const useWorkspace = () => useContext(WorkspaceContext);

export const WorkspaceProvider = ({ children }) => {
  // Client-side state management can be implemented here if necessary
  return (
    <WorkspaceContext.Provider value={initialState}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceProvider;
