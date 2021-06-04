let videos = [{
    title: "First Video",
    rating:5,
    comments:2,
    createdAt:"2 min ago",
    views: 1,
    id: 1
}, {
    title: "video #2",
    rating:5,
    comments:2,
    createdAt:"2 min ago",
    views: 59,
    id: 2
},{
    title: "video #3",
    rating:5,
    comments:2,
    createdAt:"2 min ago",
    views: 59,
    id: 3
}
];

export const trending = (req, res) => {

    return res.render("home", {pageTitle : "HOME", videos});
};

export const news = (req, res) => res.send("New Videos");

export const watch = (req, res) => {
    const {id} = req.params;
    const video = videos[id - 1];
    
    return res.render("watch", {pageTitle : `WATCH ${video.title}`, video});
};


export const videoEdit = (req, res) => {
    const {id} = req.params;
    const video = videos[id - 1];
  
    return  res.render("edit", {pageTitle : `EDIT ${video.title}`,video});
}

export const postEdit = (req,res) => {
    const {id} = req.params;
    const {title} = req.body;
    videos[id-1].title = title;
  
    return res.redirect(`/videos/${id}`);

};

export const videoDelete = (req, res) => res.send("Delete Video");


export const getUpload = (req,res) => {

    return res.render("upload",{pageTitle : "upload video"});
}

export const postUpload  = (req,res) => {
    const { title } =req.body;
    const newVideo = {
        title: title,
        rating:0,
        comments:0,
        createdAt:"just now",
        views: 0,
        id: videos.length + 1
    }
    videos.push(newVideo);
    return res.redirect("/");
}