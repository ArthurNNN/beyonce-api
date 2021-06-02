//load the 'express' module which makes writing webservers easy
const express = require('express');

const app = express();

app.use(express.json())


const albumsData = [
    {
        albumId: "10",
        artistName: "Beyoncé",
        collectionName: "Lemonade",
        artworkUrl100:
            "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
        releaseDate: "2016-04-25T07:00:00Z",
        primaryGenreName: "Pop",
        url:
            "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
    },
    {
        albumId: "11",
        artistName: "Beyoncé",
        collectionName: "Dangerously In Love",
        artworkUrl100:
            "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
        releaseDate: "2003-06-24T07:00:00Z",
        primaryGenreName: "Pop",
        url:
            "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
    },
];

app.get('/', function (request, response) {
    response.send("hello Express world!")
});

app.get("/albums", function (req, res) {
    res.send(albumsData);
});

app.get("/albums/:ambumId", function (req, res) {
    const albumId = req.params.albumId;
    let album = albumsData.find(item => item.id === albumId);
    if (album) {
        res.send(album);
    } else {
        res.status(404).send();
    }
});

// post 
app.post("/albums", function (req, res) {
    const album = req.body;
    let nextId = Math.max(...albumsData.map(item => item.albumId)) + 1;
    console.log({ "albumId": nextId, ...album });
    albumsData.push({ "albumId": nextId, ...album });
    res.send({success: true});
});


// delete
app.delete("/albums/:albumID", function (req, res) {
    const albumId = req.params.albumId;
    let index = albumsData.findIndex(item => item.id === albumId);
    if (index < 0) {
        response.status(404).send('');
      } else {
        albumsData.splice(index, 1, undefined);
        res.status(204).send(albumsData[index]);
    } 
  });

app.listen(3000, () => console.log("Listening on port 3000"));
//Start our server so that it listens for HTTP requests!
// app.listen(process.env.PORT);