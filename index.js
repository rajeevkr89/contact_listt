const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    
    {
        name: "Tony Stark", 
        phone: "123456789", 
        remarks : "No label"
    },
    

]

app.get('/', function(req, res){

    Contact.find({}, function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home', {
            title: "My Contacts List",
            contact_list: contacts
        });
    });

    
});

app.get('/practice', function(req, res){
    return res.render('practice',{
        title: "Let us play with ejs"
    });
});

app.post('/create-contact', function(req, res){

    // contactList.push(req.body);

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    Contact.create({
        name:req.body.name,
        phone: req.body.phone,
        remarks: req.body.remarks
    }, function(err, newContact){
        if(err){
            console.log('error in creating a contact!');
            return;
        }

        console.log('*********', newContact);
        return res.redirect('/');      //return res.redirect('back');
    });

    
});

app.get('/delete-contact', function(req, res){
    //get the id from the query in the ul

    let id = req.query.id;

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });


});


app.listen(port, function(err){
    if(err){console.log('Error is running the server', err);}

    console.log('Yup! My express server is runnning on port: ', port);
});