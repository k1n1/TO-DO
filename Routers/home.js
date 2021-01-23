const router = require('express').Router()
const TODO = require("../DB/todo")


router.get("/", (req, res) => {

    TODO.find()
        .then((data)=>{
            res.json(data)
        })
        .catch((err)=>{
            console.log(err)
            res.json({
                message : "Somthing Got Wrong"
            })
        })
})


router.post("/addTodo", (req, res) => {
    const todoTitle = req.body.title
    const todoDescription = req.body.description
    const todoDeadline = req.body.deadline

    const todo = new TODO({
        title : todoTitle,
        description : todoDescription,
        deadline: todoDeadline,
    })
    todo.save()
        .then((data)=>{
            res.json(data)
        })
        .catch((err)=>{
            res.json({
                message : "Somthing GOt Wrong"
            })
        })
})



router.delete('/delete/:id', (req, res) => {
    TODO.deleteOne({_id:req.params.id})
        .then((data)=>{
            TODO.find()
            .then((data)=>{
                res.json(data)
                
            })
            .catch((err)=>{
                console.log(err)
                res.json({
                    message : "Somthing Got Wrong"
                })
            })
        })
        .catch((err)=>{
            res.json({
                "message" : "Somthing Wrong Try Again"
            })
        })

})

router.put("/statusupdate/",(req, res)=>{
    TODO.findByIdAndUpdate({"_id": req.body.id}, {"status": req.body.status})
    .then((data)=>{
        TODO.find()
            .then((data)=>{
                res.json(data)
                
            })
            .catch((err)=>{
                console.log(err)
                res.json({
                    message : "Somthing Got Wrong"
                })
            })
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.put("/done/", (req, res)=>{
    TODO.findByIdAndUpdate({"_id": req.body.id}, {"status": req.body.status})
    .then((data)=>{
        TODO.find()
            .then((data)=>{
                res.json(data)
                
            })
            .catch((err)=>{
                console.log(err)
                res.json({
                    message : "Somthing Got Wrong"
                })
            })
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.put("/todoupdate", (req,res)=>{
    console.log(req.body);
    TODO.findByIdAndUpdate({"_id" : req.body.id }, {"title" : req.body.title,"description" : req.body.description,"deadline": req.body.deadline})
    .then((data)=>{
        TODO.find()
            .then((data)=>{
                res.json(data)
                
            })
            .catch((err)=>{
                console.log(err)
                res.json({
                    message : "Somthing Got Wrong"
                })
            })
    })
    .catch((err)=>{
        res.json({
            message : "Somthing Wrong"
        })
        console.log(err);
    })
})

router.get("/search/:quary",(req,res)=>{
    TODO.find(
        { "title": { "$regex": req.params.quary, "$options": "i" } },
    )
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.json(err)
    })
    
})


module.exports = router