const mongoose = require("mongoose")

 mongoose.connect("mongodb://localhost/mongo-exercises", {useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => {
     console.log("Connected to courses DB for exercises.")
 }).catch( (error) => {
    console.log(error.message);
 });


const Course =  mongoose.Schema({
     tags: [String],
     name: String,
     author: String,
     isPublished: Boolean,
     price: Number,
     date: {type: Date, default: Date.now()}
});


// find courses if its published and sort by name
async function findCoursesEx1() {

    const course = mongoose.model("course", Course);
    const courses = await course.find({isPublished: true})
    .sort({name: 1})
    .select({name: 1, author: 1});
    console.log(courses);
}

// find the courses if its published and the tags has frontend or backend keys
async function findCoursesEx2() {
    const course = mongoose.model("course", Course);
    const courses = await course.find({isPublished: true})
    .or([{tags: /.*frontend.*/}, {tags:  /.*backend.*/}])
    .sort({price: -1})
    .select({name: 1, author: 1, tags: 1});
    console.log(courses);
}

// I ahve made it a bit complex to test nested or statement 
// simple this can be done by 1 or statement like this

// or([{price: {$gte: 15} }, {isPublished: true },  {name: /.*by.*/}])

// find the couse if its published or have prive >= 15 has "by" in name
async function findCoursesEx3() {
    const course = mongoose.model("course", Course);
    const courses = await course.find()
    .or([     
        {$or: 
            [{price: {$gte: 15} }, {isPublished: true }]
        }, 
        {name: /.*by.*/}
    ])
    .sort({price: -1})
    .select({name: 1, author: 1, tags: 1, price: 1, isPublished: 1});
    console.log(courses);
}


findCoursesEx3();
//findCoursesEx2();

//findCoursesEx1();
