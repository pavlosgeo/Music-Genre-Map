const artistCache = new Map();

export const getCachedArtist = (name) => artistCache.get(name);

export const setCachedArtist = (name, data) => {
  artistCache.set(name, data);
};
