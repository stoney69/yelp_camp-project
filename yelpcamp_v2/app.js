var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser")
    mongoose   = require("mongoose")
    
mongoose.connect("mongodb://localhost:27017/yelp_camp" , { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var campground = mongoose.model("campground", campgroundSchema);

// campground.create(  { 
//                       name:"ice camp", 
//                       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfjYgdXLlJ222yA0mTyY0J_lkqukjv2EkHRvIr5zlFmNJPlq7XIg",
//                       description: "this is the new ice camp, newly and lovely place to visit"
// },
//                 function(err,campground){
//                     if(err)
//                     {
//                         console.log(err);
//                     }else{
//                         console.log("newly created campgoung");
//                         console.log(campground);
//                     }
//                 });


// var campground = [
//         { name:"mountain camp", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxpvfjNOfQGwYy5L1_lpkeFHd9MynVIDAwfIxa6DMtBYPSXZM"},
//         { name:"hill camp", image: "data:image/jpeg;base64,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"},
//         { name:"ice camp", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfjYgdXLlJ222yA0mTyY0J_lkqukjv2EkHRvIr5zlFmNJPlq7XIg"},
//         { name:"mountain camp", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxpvfjNOfQGwYy5L1_lpkeFHd9MynVIDAwfIxa6DMtBYPSXZM"},
//         { name:"hill camp", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkgvqWlql5PaDoKcDkVjrwRwTQ2uzq9bNT0IHI_dmH9L5ROxbG"},
//         { name:"ice camp", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKD14q1dA8Bu7P_8KJWVwe81oVTxnAbAN6xGf2juTrYLkys5wTOg"},
//         { name:"mountain camp", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVTGb76X-9fT98ogW5slzVTEOduJo_2ekgZ7UGFJWAPITvaUCTEQ"},
//         { name:"hill camp", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7QdQFnYezIO5tpVTzJMWJ9plN3fff_uv0NLwcpKhQ9jhm83aT "},
//         { name:"ice camp", image: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-j4aZlWrWQIzh5o88TgUgtGe5ImFPg0JczIVMl0yJugYFVJWKpQ"},
//         ];


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campground" ,function(req,res){
    campground.find({},function(err,allCampground){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campground:allCampground});
        }
    })
});

app.post("/campground", function(req,res){
    
    var name= req.body.name;
    var image= req.body.image;
    var desc = req.body.description;
    var newcampground = {name:name, image:image, description: desc};
   
   campground.create(newcampground,function(err,newlycreated){
       if (err){
           console.log(err);
       }else{
            res.redirect("/campground");
       }
   })
   
});

app.get("/campground/new", function(req, res){
    res.render("new");
});

app.get("/campground/:id", function(req, res){
    // res.send("this will be a show page one day");
    campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
             res.render("show", {campground: foundCampground});
        }
    });
   
});


app.listen(process.env.PORT,process.env.IP, function(){
    console.log("the yelpCamp server has started")
});