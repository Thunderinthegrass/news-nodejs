const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Слушаем порт ${PORT}`);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));//логгер, показывающий в консоли разную инфу

app.use(express.static('styles')); //express.static - метод, добавляющий папку styles в исключения, то есть делающий её общедоступной

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), {title});//заголовок создавать не нужно, express автоматически определяет тип данных
})

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    {name: 'Youtube', link: 'https://nasachevskyroman.com/'},
    {name: 'Github', link: 'https://nasachevskyroman.com/'},
    {name: 'nasachevskyroman.com', link: 'https://nasachevskyroman.com/'},
  ];
  res.render(createPath('contacts'), { contacts, title });//заголовок создавать не нужно, express автоматически определяет тип данных
})

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  res.render(createPath('post'), { title });//заголовок создавать не нужно, express автоматически определяет тип данных
})

app.get('/posts', (req, res) => {
  const title = 'Posts';
  res.render(createPath('posts'), { title });//заголовок создавать не нужно, express автоматически определяет тип данных
})

app.get('/add-post', (req, res) => {
  const title = 'Add-post';
  res.render(createPath('add-post'), { title });//заголовок создавать не нужно, express автоматически определяет тип данных
})

app.get('/about', (req, res) => {
  res.redirect('/contacts');//заголовок создавать не нужно, express автоматически определяет тип данных
})

app.use((req, res) => {
  const title = 'About';
  res
  .status(404)
  .render(createPath('error'), { title });
});
