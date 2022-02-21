const express=require('express');
const ejs=require('ejs');
const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const flash=require('connect-flash');
const session=require('express-session');
const app=express();

//connect mongodb.
const dbDriver="#"

//buffer data.
app.use(express.urlencoded({
    extended:true
}))
app.set('view engine','ejs');
app.set('views','views');

//flash message code.
app.use(session({
    secret:'secret',
    cookie:{maxAge:600000},
    resave:false,
    saveUninitialized:false
}))
app.use(flash());
//end of flash message code.

//step 2: define path for multer.
app.use('/upload',express.static(path.join(__dirname,'upload')));

//step 3: fileupload using multer.
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

//step 4: declare file type.
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("jpeg")){
        cb(null,true)
    }
    else{
        cb(null,false)
    }    
}

//step 5: upload & store using multer.
app.use(multer({storage:fileStorage,fileFilter:fileFilter,limits:{fieldSize:1024*1024*5}}).single('image'))

//ceate a static folder path.
app.use(express.static(path.join(__dirname,'public')));

//define api.
const apiRoute=require('./route/apiRoute');
app.use('/api/',apiRoute)

//define route.
const homeRoute=require('./route/homeRoute');
app.use(homeRoute);

//define port.
const port=process.env.PORT || 5100
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    app.listen(port,()=>{
        console.log(`server running at http://localhost:${port}`);
        console.log(`Database connected successfully`);
    })
}).catch(err=>{
    console.log(`Connection failed`);
})