const express = require('express');

const Recipe = require('../models/recipe');

const router = express.Router();


//adding recipe via post
router.post("",( req, res, next) => {
    const recipe = new Recipe({
        title: req.body.title,
        method: req.body.method
    });
    recipe.save().then(createRecipe => {
        res.status(201).json({
        message: "recipe added successfully",
        RecipeId: createRecipe._id
    });
 });
});

//Keep session with edit window
router.get("/:id", (req, res, next) => {
    Recipe.findById(req.params.id).then(recipe => {
        if (recipe) {
                res.status(200).json(recipe)
        } else{
            res.status(404).json({message: 'Recipe not found!'
        });
        }
    })
});


//Capital R for schema
//Update a recipe.
router.put("/:id" , (req, res, next) => {
    const recipe = new Recipe({
        _id: req.body.id,
        title: req.body.title,
        method: req.body.method
    });
        Recipe.updateOne({_id: req.params.id}, recipe).then(result => {
            res.status(200).json({message: "Recipe update successful"});
        });
    });
    
router.get("", (req, res, next) => {
    //sending the posts back
   Recipe.find().then(documents => {
        res.status(200).json({
        message: 'Recipes fetched succsessfully',
        recipes: documents
        });
    });
});

//send a request to post passing the id of the object you want to delete
router.delete("/:id", (req, res, next) => {
    Recipe.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result);
        res.status(200).json({message: 'Recipe Deleted'})
    });
});

module.exports = router;