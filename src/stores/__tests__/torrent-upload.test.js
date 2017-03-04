import TorrentUpload from '../torrent-upload'

describe('TorrentUpload', () => {
  describe('serialize', () => {
    it('magnet url link should return single object', async () => {
      const store = new TorrentUpload();
      store.setTorrentUrl('url')

      const torrents = await store.serialize()

      expect(torrents.length).toBe(1)
      expect(torrents[0].filename).toBe('url')
    })
  })
})
