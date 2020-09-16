// 10
class Musician {
  constructor(albumsUrl) {
    this.albumsUrl = albumsUrl;
  }

  async getAlbums() {
    const res = await fetch(this.albumsUrl);
    const data = await res.json();
    return data;
  }
}

const musician = new Musician('https://jsonplaceholder.typicode.com/albums');
musician.getAlbums().then(albums => console.log(albums));
