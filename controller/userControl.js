import axios from "axios"; 
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const register = asyncHandler(async(req,res) => {
    res.render("register.ejs");
    
});

const redirect = asyncHandler(async(req,res) => {
    const URL =  "https://contacts-api-3wwu.onrender.com/api/users/register";
    try{
     const result = await axios.post(URL, req.body);
     console.log(result.data);
     res.redirect("/login")
    }
    catch (error) {
     res.status(500).send("server error");
 }
 
});


const loginPage = asyncHandler(async(req,res) => { 
    jwt.verify(req.cookies.jwtToken , process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        req.cookies.jwtToken = decoded;
        if(err) {
            res.render("login.ejs");
        }
        else {
            req.cookies.jwtToken = decoded;
            res.redirect("/contacts");
        }
    });
   
 });


 const login = asyncHandler(async(req,res) => { 
    const URL =  "https://contacts-api-3wwu.onrender.com/api/users/login";
    try{
     const result = await axios.post(URL, req.body);
        const jwtToken = result.data.accessToken; 
        console.log(result.data);
        res.cookie("jwtToken", jwtToken, {
            httpOnly: true,
            secure: true, // set to false for localhost
            sameSite: 'lax', // can be 'lax' or 'strict' for localhost
        });
            console.log("login successful");
            res.redirect("/contacts"); // send the response
            console.log("redirected");
            // res.end(); // send the response      
    } 
    catch (error) {
        console.log(error);
     res.status(500);
 }
 });

 const  user = asyncHandler(async(req,res) => {
    const URL = "https://contacts-api-3wwu.onrender.com/api/users/current";
    try{
   const result = await axios.get(URL,{ headers: { Authorization: `Bearer ${req.cookies.jwtToken}` } }); // since validation was done for contact route in api , but to get current user information valdiation middleware was added iin /current route
   console.log(result.data);
//    res.json(result.data);
    return result.data; // ensures that the function always returns a Promise, which can be awaited
    
    }
    catch (error) {
        console.log(error);
     res.status(500);
 }
 })

 export {register,login,redirect,loginPage,user};
