const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const cors = require('cors')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('601365c674d0d001485d8d4e')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


const corsOptions = {
  origin: "https://cse341-my-shop.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://evgi:cVnKOA5Z0z72EaZT@cluster0.hhyrx.mongodb.net/evgi-shop?retryWrites=true&w=majority";
                      
mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
      User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Jeka',
          email: 'jeka@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
// mongoose
//   .connect(
//     'mongodb+srv://evgi:cVnKOA5Z0z72EaZT@cluster0.hhyrx.mongodb.net/evgi-shop?retryWrites=true&w=majority'
//   )
//   .then(result => {
//     User.findOne().then(user => {
//       if (!user) {
//         const user = new User({
//           name: 'Jeka',
//           email: 'jeka@test.com',
//           cart: {
//             items: []
//           }
//         });
//         user.save();
//       }
//     });
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });
