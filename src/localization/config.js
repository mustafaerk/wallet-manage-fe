import StringList from "./string.json";

export const getString = (key) => {
  const trm = StringList[key];
  return trm;
};
