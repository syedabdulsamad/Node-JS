const p = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve(25);
        //reject( Error("Failure") );
    }, 2000); 
});

p.then(value => console.log(value))
 .catch(reason =>  console.log( reason.message));