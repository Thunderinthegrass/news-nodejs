const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3002;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Слушаем порт ${PORT}`);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));//логгер, показывающий в консоли разную инфу

app.use(express.urlencoded({ extended: false }))//метод для парсинга входящего запроса

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
  const post = {
    id: '1',
    text: 'Грунты - горные породы различного состава, свойств и происхождения, слагающие верхние слои земной коры, подверженные процессам выветривания',
    title: 'Первый пост',
    date: '02.05.2022',
    author: 'Сашок'
  }
  res.render(createPath('post'), { title, post });//заголовок создавать не нужно, express автоматически определяет тип данных
})

app.get('/posts', (req, res) => {
  const title = 'Posts';
  const posts = [
    {
      id: '1',
      text: 'Грунты - горные породы различного состава, свойств и происхождения, слагающие верхние слои земной коры, подверженные процессам выветривания',
      title: 'Первый пост',
      date: '02.05.2022',
      author: 'Сашок'
    }
  ]
  res.render(createPath('posts'), { title, posts });//заголовок создавать не нужно, express автоматически определяет тип данных
})

app.post('/add-post', (req, res) => {//создание нового поста
  const { title, author, text } = req.body;
  const post = {
    id: new Date(),
    date: (new Date()).toLocaleDateString(),
    title,
    author,
    text,
  }
  res.render(createPath('post'), { post, title });
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
