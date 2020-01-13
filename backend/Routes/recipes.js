const express = require('express');

const Recipe = require('../models/recipe');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();


//adding recipe via post
router.post("", checkAuth,( req, res, next) => {
    const recipe = new Recipe({
        title: req.body.title,
        method: req.body.method,
        //authorisation
        creator: req.userData.userId
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
router.put("/:id" , checkAuth, (req, res, next) => {
    const recipe = new Recipe({
        _id: req.body.id,
        title: req.body.title,
        method: req.body.method,
        creator: req.userData.userId
    });  
        Recipe.updateOne({_id: req.params.id, creator: req.userData.userId}, recipe).then(result => {
            if (result.nModified > 0) {
                res.status(200).json({ message: "Update successful!" });
              } else {
                res.status(401).json({ message: "Not authorized!" });
              }
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
router.delete("/:id", checkAuth, (req, res, next) => {
    Recipe.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result =>{
        if (result.n > 0) {
            res.status(200).json({ message: "Delete successful!" });
          } else {
            res.status(401).json({ message: "Not authorized to delete!" });
          }
    });
});

module.exports = router;