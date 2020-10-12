export const fixName = (name: string): string => {
   const a = name.split(".");
   a.pop();
   const b = a.join(".");
   return b;
};