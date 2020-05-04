app.set('view engine', 'pug');              // pug is the templating engine
app.set('views', './views');                // this is optional. this is where we store out html pages

// we make a folder with the name views
// then add a .pug file where we erite code


app.get('/api/get-genres', (request, response) => {
    // response.render('index', {title: 'Vidly', message: 'Hello'});
    response.send(genres);
});