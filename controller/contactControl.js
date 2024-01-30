import axios from "axios";
import asyncHandler from "express-async-handler";
import { user }   from "./userControl.js";

const Contacts = asyncHandler(async(req,res) => {
    const URL = "https://contacts-api-3wwu.onrender.com/api/contacts";
    try {
        const result = await axios.get(URL, { headers: { Authorization: `Bearer ${req.cookies.jwtToken}` } }); // Validation part has already been done in the api , so so need for new middleware , axios can authorized  by itself 
       // axios is a powerful tool, many things can be done with it , less code , best tool for handling api. still various 
        const User =  await user(req,res); 
     res.render("homePage.ejs", { contacts: result.data , userName: User}); // res.render is used for rendering ejs files , here contacts is the ejs file and result.data is the data from the api
     }
    catch (error) {
        console.log(error);
        res.status(500);
        res.redirect("/login");
    }
});

const newContactPage = asyncHandler(async(req,res) => {
    res.render("newContact.ejs");   
});


const addContact = asyncHandler(async(req,res) => {
    const URL = "https://contacts-api-3wwu.onrender.com/api/contacts";
    try {
        const result = await axios.post(URL,req.body, { headers: { Authorization: `Bearer ${req.cookies.jwtToken}` } });
        // console.log(result.data);
        res.redirect("/contacts");
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.redirect("/login");
    }
});

const contactDetail = asyncHandler(async(req,res) => {
    const URL = `https://contacts-api-3wwu.onrender.com/api/contacts/${req.params.id}`;
    try {
        const result = await axios.get(URL, {headers: {Authorization: `Bearer ${req.cookies.jwtToken}`}});
        // console.log(result.data); 
        res.render("contactDetail.ejs", {contact: result.data});
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.redirect("/login");
    }
});

const editContactPage = asyncHandler(async(req,res) => {
    const URL = `https://contacts-api-3wwu.onrender.com/api/contacts/${req.params.id}`;
    try {
        const result = await axios.get(URL, {headers: {Authorization: `Bearer ${req.cookies.jwtToken}`}});
        // console.log(result.data); 
        res.render("newContact.ejs", {contact: result.data});
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.redirect("/login");
    }
});

const editContact = asyncHandler(async(req,res) => {
    const URL = `https://contacts-api-3wwu.onrender.com/api/contacts/${req.params.id}`;
    try{
        const result = await axios.put(URL, req.body ,{headers: {Authorization: `Bearer ${req.cookies.jwtToken}`}}); 
        console.log(result.data);
        res.redirect("/contacts/"+ req.params.id);
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.redirect("/login");
    }
    
});

const deleteContact = asyncHandler(async(req,res)  => {
    const URL = `https://contacts-api-3wwu.onrender.com/api/contacts/${req.params.id}`;
    try {
        const result = await axios.delete(URL, { headers: { Authorization: `Bearer ${req.cookies.jwtToken}` } });
        console.log(result.data);
        res.redirect("/contacts");
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.redirect("/login");
    }
});


const logout = asyncHandler(async(req,res) => {
    res.clearCookie('jwtToken');
    res.redirect("/login");
    // res.send("logout"); // for debugging
});



export { Contacts, addContact, newContactPage,contactDetail, editContactPage, editContact,deleteContact,logout};