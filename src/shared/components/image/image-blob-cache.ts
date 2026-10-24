// Session cache of loaded image blobs, keyed by request signature. Lets remounted images
// (virtualized rows/cards scrolled back into view, back navigation) display immediately
// instead of re-requesting the image from the server.
// Entries in use are never revoked; unused entries are evicted least-recently-used first
// once their combined size exceeds the budget.

const MAX_UNUSED_BYTES = 64 * 1024 * 1024;

interface Entry {
    refs: number;
    size: number;
    url: string;
}

// Map iteration order doubles as LRU order: entries are re-inserted on every acquire.
const entries = new Map<string, Entry>();
let unusedBytes = 0;

const prune = () => {
    if (unusedBytes <= MAX_UNUSED_BYTES) return;

    for (const [key, entry] of entries) {
        if (entry.refs > 0) continue;

        URL.revokeObjectURL(entry.url);
        entries.delete(key);
        unusedBytes -= entry.size;

        if (unusedBytes <= MAX_UNUSED_BYTES) return;
    }
};

const touch = (key: string, entry: Entry) => {
    if (entry.refs === 0) unusedBytes -= entry.size;
    entry.refs += 1;
    entries.delete(key);
    entries.set(key, entry);
    return entry.url;
};

export const acquireCachedImage = (key: string): null | string => {
    const entry = entries.get(key);
    return entry ? touch(key, entry) : null;
};

export const storeCachedImage = (key: string, blob: Blob): string => {
    const existing = entries.get(key);
    if (existing) return touch(key, existing);

    const url = URL.createObjectURL(blob);
    entries.set(key, { refs: 1, size: blob.size, url });
    return url;
};

export const releaseCachedImage = (key: string) => {
    const entry = entries.get(key);
    if (!entry || entry.refs === 0) return;

    entry.refs -= 1;

    if (entry.refs === 0) {
        unusedBytes += entry.size;
        prune();
    }
};
