var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})
 
var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Platzigram' });
})

app.get('/signup', function (req, res) {
  res.render('index', { title: 'Platzigram - Signup' });
})

app.get('/signin', function (req, res) {
  res.render('index', { title: 'Platzigram - Signin' });
})

app.get('/api/pictures', function (req, res, next) {
  var pictures = [
    {
      user: {
        username: 'slifszyc',
        avatar: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11031148_10153448564292612_2579019413701631604_n.jpg?oh=d83cdd0687c87c91b247a42375fc5a57&oe=57B12767'
      },
      url: 'office.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'slifszyc',
        avatar: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11031148_10153448564292612_2579019413701631604_n.jpg?oh=d83cdd0687c87c91b247a42375fc5a57&oe=57B12767'
      },
      url: 'office.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ];

  setTimeout(() => res.send(pictures), 2000)
});

app.post('/api/pictures', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  })
})

app.get('/api/user/:username', function (req, res) {
  const user = {
    username: 'slifszyc',
    avatar: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11031148_10153448564292612_2579019413701631604_n.jpg?oh=d83cdd0687c87c91b247a42375fc5a57&oe=57B12767',
    pictures: [
      {
        id: 1,
        src: 'https://igcdn-photos-a-a.akamaihd.net/hphotos-ak-xpt1/t51.2885-15/e35/11934723_222119064823256_2005955609_n.jpg',
        likes: 20
      },
      {
        id: 2,
        src: 'https://igcdn-photos-c-a.akamaihd.net/hphotos-ak-xft1/t51.2885-15/e35/12976459_703617449776938_150514897_n.jpg',
        likes: 3
      },
      {
        id: 3,
        src: 'https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xft1/t51.2885-15/e35/13129218_1692859530968044_751360067_n.jpg',
        likes: 5
      },
      {
        id: 4,
        src: 'https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xpt1/t51.2885-15/e35/12918062_250455468626532_375100569_n.jpg',
        likes: 9
      },
      {
        id: 5,
        src: 'https://igcdn-photos-d-a.akamaihd.net/hphotos-ak-xfp1/t51.2885-15/e35/12750226_959818050763267_1636662410_n.jpg',
        likes: 29
      },
      {
        id: 6,
        src: 'https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xft1/t51.2885-15/e15/917918_1571654889723553_1310692890_n.jpg',
        likes: 7
      }
    ]
  }

  res.send(user);
});

app.get('/:username', function (req, res) {
  res.render('index', { title: `Platzigram - ${req.params.username}` });
})

app.listen(3000, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log('Platzigram escuchando en el puerto 3000');
})