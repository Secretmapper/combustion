import { isArray, isObject } from 'lodash';

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
  // Merge arrays
  if (isArray(tree) && isArray(otherTree)) {
    return [...new Set([...tree, ...otherTree])];
  }

  // Merge primitive types (number, string, ...)
  if (!isObject(tree) && !isObject(otherTree)) {
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
    .map((entry, entryIndex) => buildEntryTree({...entry, priority: [entry.priority], fileIds: [entryIndex]}, ({ name }) => name))
    .reduce(mergeEntryTrees, {});
}
