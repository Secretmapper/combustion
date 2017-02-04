function buildEntryTree(entry, getEntryPath = (entry) => entry) {
  return getEntryPath(entry).split('/').reduceRight((partialTree, part) => {
    return {
      [part]: {
        ...entry,
        entries: partialTree,
      },
    };
  }, {});
  }

function mergeEntryTrees(tree = {}, otherTree = {}) {
  if (typeof tree !== 'object' && typeof otherTree !== 'object') {
    return tree;
  }

  const allKeys = [...new Set([...Object.keys(tree), ...Object.keys(otherTree)])];

  return allKeys.reduce(function(partialTree, key) {
    if (tree[key] && !otherTree[key]) {
      partialTree[key] = tree[key];
    }

    if (!tree[key] && otherTree[key]) {
      partialTree[key] = otherTree[key];
    }

    if (tree[key] && otherTree[key]) {
      partialTree[key] = mergeEntryTrees(tree[key], otherTree[key]);
    }

    return partialTree;
  }, {});
}

export function generateTree(entries) {
  return entries
    .map((entry) => buildEntryTree(entry, ({ name }) => name))
    .reduce(mergeEntryTrees, {});
}
