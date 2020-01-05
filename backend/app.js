const express = require('express');

const app = express();


app.use('/posts', (req, res, next) => {
    //sending the posts back
    const recipes = [
        {
            id: "fdgdrt3454",
            title: "First server side post",
            method: "This is coming from the server"
        },
        {
            id: "dfgerg3434",
            title: "Second server side post",
            method: "This is coming from the server"
        },
        {
            id: "ghfhgfe3454",
            title: "Third server side post",
            method: "This is coming from the server"
        }
    ];
    res.status(200).json({
        message: 'posts fetched succsessfully',
        recipes: recipes
    });
});

module.exports = app;

