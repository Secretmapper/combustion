import React from 'react';
import TorrentStore from '../torrent-store'
import Torrent from '../torrent'

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

describe('TorrentStore', () => {
  describe('filteredTorrents', () => {
    let store
    beforeEach(() => {
      store = new TorrentStore();
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
        expect(store.filteredTorrents.length).toBe(7);
      })
    })
    describe('when showing active', () => {
      xit('should show active torrents')
    })
    describe('when showing downloading', () => {
      it('should only show downloading torrents', () => {
        store.statusFilter = STATUS_DOWNLOAD;

        expect(mapStatus(store.filteredTorrents)).toContain(STATUS_DOWNLOAD);
        expect(store.filteredTorrents.length).toBe(1);
      })
    })
    describe('when showing seeding', () => {
      it('should only show seeding torrents', () => {
        store.statusFilter = STATUS_SEED;

        expect(mapStatus(store.filteredTorrents)).toContain(STATUS_SEED);
        expect(store.filteredTorrents.length).toBe(1);
      })
    })
    describe('when showing paused', () => {
      it('should only show paused torrents', () => {
        store.statusFilter = STATUS_STOPPED;

        expect(store.filteredTorrents[0].status).toBe(STATUS_STOPPED);
        expect(store.filteredTorrents.length).toBe(1);
      })
    })
    describe('when showing finished', () => {
      xit('should show finished torrents')
    })
  })
})
