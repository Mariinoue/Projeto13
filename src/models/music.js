const mongoose=require('mongoose')

const musicsSchema=new mongoose.Schema({
    id:{ type:Number },
    title:{ type:String },
    duration:{ type:String },
    launchYear:{ type:String },
    favorited:{ type:Boolean },
    artists:{ type:Object }
},{

    versionKey:false

});

const musics=mongoose.model('musics',musicsSchema);

module.exports=musics 