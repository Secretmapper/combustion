import React from 'react';

import TorrentStore from 'stores/torrent-store'
import PrefsStore from 'stores/prefs-store'
import Torrent from 'stores/torrent'
import getFilteredTorrents from 'stores/util/getFilteredTorrents'

const {
  STATUS_STOPPED,
  STATUS_CHECK_WAIT,
  STATUS_CHECK,
  STATUS_DOWNLOAD_WAIT,
  STATUS_DOWNLOAD,
  STATUS_SEED_WAIT,
  STATUS_SEED
} = Torrent;

const mapStatus = arr => arr.map(({ status }) => status)

describe('getFilteredTorrents', () => {
  let store
  let prefs
  beforeEach(() => {
    store = new TorrentStore();
    prefs = new PrefsStore();

    store.torrents = [
      new Torrent({ status: Torrent.STATUS_STOPPED }),
      new Torrent({ status: Torrent.STATUS_CHECK_WAIT }),
      new Torrent({ status: Torrent.STATUS_CHECK }),
      new Torrent({ status: Torrent.STATUS_DOWNLOAD_WAIT }),
      new Torrent({ status: Torrent.STATUS_DOWNLOAD }),
      new Torrent({ status: Torrent.STATUS_SEED_WAIT }),
      new Torrent({ status: Torrent.STATUS_SEED })
    ]
  })

  describe('when showing all', () => {
    it('should show all torrents', () => {
      const filteredTorrents = getFilteredTorrents(store, prefs);

      expect(filteredTorrents.length).toBe(7);
    })
  })
  describe('when showing active', () => {
    xit('should show active torrents')
  })
  describe('when showing downloading', () => {
    it('should only show downloading torrents', () => {
      prefs.statusFilter = STATUS_DOWNLOAD;
      const filteredTorrents = getFilteredTorrents(store, prefs);

      expect(mapStatus(filteredTorrents)).toContain(STATUS_DOWNLOAD);
      expect(filteredTorrents.length).toBe(1);
    })
  })
  describe('when showing seeding', () => {
    it('should only show seeding torrents', () => {
      prefs.statusFilter = STATUS_SEED;
      const filteredTorrents = getFilteredTorrents(store, prefs);

      expect(mapStatus(filteredTorrents)).toContain(STATUS_SEED);
      expect(filteredTorrents.length).toBe(1);
    })
  })
  describe('when showing paused', () => {
    it('should only show paused torrents', () => {
      prefs.statusFilter = STATUS_STOPPED;
      const filteredTorrents = getFilteredTorrents(store, prefs);

      expect(filteredTorrents[0].status).toBe(STATUS_STOPPED);
      expect(filteredTorrents.length).toBe(1);
    })
  })
  describe('when showing finished', () => {
    xit('should show finished torrents')
  })
})
