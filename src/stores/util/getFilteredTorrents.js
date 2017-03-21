import { comparatorsMap, extractDomains } from 'stores/torrent-store';

export default function getFilteredTorrents (torrentStore, prefsStore) {
  const regexp = new RegExp(torrentStore.textFilter, 'i'); // TODO: Escape!

  return torrentStore.torrents.filter((torrent) => {
    if (prefsStore.statusFilter !== -1 && prefsStore.statusFilter !== torrent.status) return false;
    if (torrentStore.trackerFilter && !extractDomains(torrent).includes(torrentStore.trackerFilter)) return false;
    if (torrentStore.textFilter && !regexp.test(torrent.name)) return false;

    return true;
  }).sort(comparatorsMap[prefsStore.sortCriteria]);
}
