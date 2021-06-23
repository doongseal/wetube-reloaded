import Video from "../models/Video";

/*


    
);
*/
export const news = (req, res) => res.send("New Videos");



export const home = async(req, res) => {
    try {    
        const videos = await Video.find({});
        
        return res.render("home", {pageTitle : "HOME", videos});
        } catch {
        return res.render("server-error")};
};


export const watch = async (req, res) => {
    const {id} = req.params;
    
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle : "Video not found."});
    }
    return res.render("watch", {pageTitle : video.title ,video});    
};





export const videoEdit = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", {pageTitle : "Video not found."});
    }
    return res.render("edit",{pageTitle : `Edit ${video.title}`, video});
}

export const postEdit = async (req,res) => {
    const {id} = req.params;
    const { title, description, hashtags } =req.body;
    const video = await Video.exists({_id:id});
    if(!video){
        return res.status(404).render("404", {pageTitle : "Video not found."});
    }
    await Video.findByIdAndUpdate(id, {
        title, description, hashtags: Video.formatHashtags(hashtags),

    });
     
    return res.redirect(`/videos/${id}`);

};


export const videoDelete = (req, res) => res.send("Delete Video");




export const getUpload = (req,res) => {

    return res.render("upload",{pageTitle : "upload video"});
}



export const postUpload  = async (req,res) => {
    const { title, description, hashtags } =req.body;
    const file = req.file;
    try {
    await Video.create({
        title,
        description,
        fileUrl:file.path,
        hashtags: Video.formatHashtags(hashtags),

    });
    
    return res.redirect("/");
    } catch(error) {
        console.log(error);
        return res.status(400).render("upload",{pageTitle : "upload video", errorMessage: error._message});
    }
}


export const deleteVideo = async (req,res) => {
    const {id} =req.params;
    await Video.findByIdAndDelete(id);
    

    return res.redirect("/");
}


export const search  = async (req,res) => {
    const {keyword} = req.query;
    let videos = [];
    if(keyword){
        videos = await Video.find({
            title: {
              $regex: new RegExp(`${keyword}`, "i")      
            }
        });
        
    }
    

    return res.render("search",{pageTitle : "Search", videos})
}

export const registerView = async (req,res) => {
    const {id} = req.params;
    const video = await video.findById(id);
    if(!video){
        return res.sendStatus(404);
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
}