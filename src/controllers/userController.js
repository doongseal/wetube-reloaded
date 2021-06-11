
import User from "../models/User";
import bcrypt from "bcrypt";



export const getJoin = (req, res) => res.render("join", {pageTitle:"Join"});
export const postJoin = async (req, res) => {
    const {name, username, email, password,password2, location} = req.body;
    if(password !== password2){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"Password confirmation does not match."} );
    }
    const exists = await User.exists( { $or: [ {username} , {email} ] } );
    if(exists) {
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"This username/email is already taken."} );
    }
    try {
    await User.create({
        name,
        username,
        email,
        password,
        location,
    })
    return res.redirect("/login");
    }   catch (error) {
        return res.status(400).render("join", {
            pageTitle : "Join",
            errorMessage: error._massage,
        })

    }
}

export const getLogin = (req, res) => res.render("login", {pageTitle: "Login"});


export const postLogin = async (req, res) => {
    const pageTitle = "Login";
    const {username, password} = req.body;
    const user = await User.findOne({username});
    
    if(!user){
        return res.status(400).render("login", {pageTitle, errorMessage:"An account with this username does no exists."})
    }
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", {pageTitle, errorMessage:"Wrong password."})

    }
    req.session.loggedIn = true;
    req.session.user = user;


    return res.redirect("/");

}

export const users = (req, res) => res.send("Users Main");
export const edit = (req, res) => res.send("Edit Profile");
export const profile = (req, res) => res.send("User Profile");
