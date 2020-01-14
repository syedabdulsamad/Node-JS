const mongoose = require("mongoose")

 mongoose.connect("mongodb://localhost/mongo-exercises", {useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => {
     console.log("Connected to courses DB for exercises.")
 }).catch( (error) => {
    console.log(error.message);
 });

const CourseSchema = new mongoose.Schema({
     tags: { 
         type: [String], 
         validate: {
             validator: async function(v) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        var result = (v != null && v.length > 0)
                        resolve(result);
                     }, 4000)
                });   
            },
            message: "Tags array should have atleast 1 tag."
            }
        },
     name: {type: String, required: true, minlength: 5, maxlength: 44},
     category: {type: String, required: true, enum: ["AI", "Maths"]},
     author: {  
         type: String,  
         required: true,
         validate: {
             validator: function(value) {
                 return (value!= null && value.length > 10);
             },
             message: "Author should be at least 5 chars long"
         }
        },

     isPublished: {type: Boolean, required: true},
     price: Number,
     date: {type: Date, default: Date.now()}
});


async function createCourse() {
    const Course = mongoose.model("course", CourseSchema);
    const course = new Course({
        name: "Discrete Maths",
        tags: [],
        author: "ddaassfd",
        category: "Maths",
        isPublished: false
    });

    try {
        await course.validate();
        console.log("Validation passed");
        const result = await course.save();
    } catch(ex) {
        //console.log(ex);
        for(field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
}

// find courses if its published and sort by name
async function findCoursesEx1() {

    const course = mongoose.model("course", CourseSchema);
    const courses = await course.find({isPublished: true})
    .sort({name: 1})
    .select({name: 1, author: 1});
    console.log(courses);
}

// find the courses if its published and the tags has frontend or backend keys
async function findCoursesEx2() {
    const course = mongoose.model("course", CourseSchema);
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
    const course = mongoose.model("course", CourseSchema);
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

//findCoursesEx3();
//findCoursesEx2();

//findCoursesEx1();

createCourse();