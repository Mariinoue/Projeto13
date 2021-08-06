const musics = require("../models/music")
//const fs = require("fs")

const createMusic = (req, res) => {
    let{ title,
    duration,
    launchYear,
    favorited,
    artists }=req.body;

    let musicId=req.params.id
    let music={
        id:musicId,
        title,
        duration,
        launchYear,
        favorited,
        artists

    }

    musics.findOne({ id:musicId}, function( err,musicFound){
        if(err){

            res.status(500).send({ message: err.message })

        }else{

            if(musicFound){
                let newMusic= new musics(music)
                newMusic.save(function(err){
                    if(err){

                        res.status(500).send({ message: err.message })

                    }else{

                        musicFound.push(music)
                        musics.updateOne({ id:musicId}), {$set:{ music:musicFound}},
                        function (err) {
                            if (err) {
                                res.status(500).send({ message: err.message }) //responder com o erro
                            }
                            res.status(201).send({
                                message: "Item adicionado com sucesso!",
                                ...musicFound.toJSON()
                            });

                    }
                }
            })

        } else {
            
            res.status(404).send({ message: "lista não encontrada para inserir musica!" });
        }

        }
    })
}


const deleteMusic = (req, res) => {
    const requiredId = req.params.id;
    musics.findOne({ id: requiredId }, function (err, musicsFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (musicsFound) {
                //deleteMany remove mais de um registro
                //deleteOne remove apenas um registro
                musics.deleteOne({ id: requiredId }, function (err) {
                    if (err) {
                        res.status(500).send({
                            message: err.message,
                            status: "FAIL"
                        })
                    } else {
                        res.status(200).send({
                            message: 'Musica removida com sucesso',
                            status: "SUCCESS"
                        })
                    }
                })
            } else {
                res.status(404).send({ message: 'Não há nada para ser removido com esse id' })
            }
        }
    })
};

const updateMusic = (req, res) => {
    const requiredId = req.params.id;
    musics.findOne({ id: requiredId }, function (err, musicFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (musicFound) {
                musics.updateOne({ id: requiredId }, { $set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Registro alterado com sucesso" })
                    }
                })
            } else {
                res.status(404).send({ message: "Não há registro para ser atualizado com esse id" });
            }
        }
    })
};

const updateFavorited = (req, res) => {
    const requiredId = req.params.id;
    let newMusic = req.body.name;
    musics.findOne({ id: requiredId }, function (err, musicFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (musicFound) {
                musics.updateOne({ id: requiredId }, { $set: { name: newMusic } }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Arquivo atualizado com sucesso!" })
                    }
                })
            } else {
                res.status(404).send({ message: "Música não encontrada para modificar o nome." });
            }
        }
    })
}

const getAllMusics = (req, res) => {
  
    musics.find(function(err,musicsFound){
        console.log('viagens encontradas');
        console.log(musicsFound);
        if(err){
            res.status(500).send({ message:err.message})
        }else{

            if(musicsFound && musicsFound.length>0){
                res.status(200).send(musicsFound)
            }else{
                res.status(204).send()
            }

        }
       
    
    })

}

const getMusic = (req, res) => {
    const musicId = req.params.id

    musics.findOne({ id:musicId}, function(err,musicFound) {
        if(err){
            res.status(500).send({ message:err.message})

        }else{

            if(musicFound){

                res,status(200).send(musicFound)

            }else{
                res.status(204).send()
            }
        }
    })
}

module.exports = {
    createMusic,
    deleteMusic,
    updateFavorited,
    updateMusic,
    getAllMusics,
    getMusic,
}