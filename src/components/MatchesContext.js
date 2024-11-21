import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from 'prop-types';

const MatchesContext = createContext();

export function MatchesProvider({ children }) {
  const [matches, setMatches] = useState([]);

  const addMatch = (match) => {
    setMatches((prevMatches) => [...prevMatches, match]);
  };

  const value = useMemo(() => ({ matches, addMatch }), [matches]);

  return (
    <MatchesContext.Provider value={value}>
      {children}
    </MatchesContext.Provider>
  );
}
MatchesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useMatches = () => {
  const context = useContext(MatchesContext);
  if (!context) {
    throw new Error("useMatches must be used within a MatchesProvider");
  }
  return context;
};
