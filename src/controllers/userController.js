
import User from "../models/User";
import fetch from "node-fetch";
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
    const user = await User.findOne({username, socialOnly: false});
    
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

export const startGithubLogin = (req,res) => {
    const baseUrl = 'https://github.com/login/oauth/authorize';
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup:false,
        scope: "read:user user:email"
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    console.log(finalUrl);
    return res.redirect(finalUrl)
};

export const finishGithubLogin = async (req,res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    console.log(baseUrl)
    const config = {
        client_id : process.env.GH_CLIENT,
        client_secret : process.env.GH_SECRET,
        code: req.query.code,
    };
    
    console.log(config);
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;


    const tokenRequest = await (await fetch(finalUrl,{
        method: "POST",
        headers: {
            Accept : "application/json",
        },
    })).json();
    console.log(tokenRequest);

    if("access_token" in tokenRequest){
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch (`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })).json();
        console.log(userData);

        const emailData = await (
            await fetch (`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })).json();
            console.log(emailData);
            const emailObj = emailData.find(email => email.primary === true && email.verified ===true);
            if(!emailObj){
                return res.redirect("/login")
            }
            let user = await User.findOne({email: emailObj.email});
            if(!user){
                user = await User.create({
                    avatayUrl : userData.avatar_url,
                    name:userData.name,
                    username:userData.login,
                    email:emailObj.email,
                    password:"",
                    location:userData.location,
                    socialOnly:true,});
            };

            
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
   
    }else {
        return res.redirect("/login");
    }

}



export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

export const getEdit = (req,res) => {
    
    return res.render("edit-Profile", {pageTitle:"Edit Profile"});

}

export const postEdit = (req,res) => {
    
    return res.render("edit-Profile", {pageTitle:"Edit Profile"});
};


export const edit = (req, res) => res.send("Edit Profile");
export const profile = (req, res) => res.send("User Profile");
