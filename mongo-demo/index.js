const mongoose =  require("mongoose");
mongoose.connect("mongodb://localhost/playground", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("connected to database"))
.catch(error => console.log("Cound not connect to db" + error.message));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type:Date, default: Date.now},
    price: Number,
    isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);
// async function createCourse (){
//     var course0 = new Course({
//         name: "Javascript course",
//         author: "Syed Abdul Samad",
//         tags: ["NodeJS", "Backend development"],
//         price: 24,
//         isPublished: true
//     });

//     var result = await course0.save();

//     const course1 = new Course({
//         name: "Tensorflow course",
//         author: "Syed Abdul Samad",
//         tags: ["NodeJS", "Backend development"],
//         price: 10,
//         isPublished: true
//     });

//     result = await course1.save();
//     const course2 = new Course({
//         name: "Python course",
//         author: "Syed Abdul Samad",
//         tags: ["NodeJS", "Backend development"],
//         price: 16,
//         isPublished: true
//     });
    
//     result = await course2.save();
//     console.log(result);
// }

//createCourse();



// async function findCourses() {
//    const courses = await Course.find()
//    .limit(10)
//    .sort({name: 1})
//    .select({isPublished: 1, name: 1, tags: 1})
//    console.log(courses);
// }

const pageNumber = 2;
const pageSize = 1;

async function findCourses() {
const courses = await Course.find({name: /.*low.*/i})
    .sort({name: 1})
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
    //.count(pageSize);
    .select({isPublished: 1, name: 1, price: 1});
    console.log(courses);
}
findCourses();