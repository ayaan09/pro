// used to obtain a user's initials

// eslint-disable-next-line
export default {
  getInitialsFromName: (name) => {
    const letters = String(name)
      .split(" ")
      .map((i) => i.charAt(0));
    return letters.join("");
  },
};
