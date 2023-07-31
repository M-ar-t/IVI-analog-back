const uuid = require('uuid')
const path = require('path')
const { Film } = require('../models/models')
const ApiError = require('../error/ApiError')

class FilmController{
    async create(req,res,next){
     try{
        const {name, description,
            src_video,price, category_film} = req.body
        const {img} = req.files
        let fileName = uuid.v4()+'.jpg'
        img.mv(path.resolve(__dirname,'..','static',fileName))

        const film = await Film.create({
            name, description, img:fileName,
            src_video,price,category_film
        })
        return res.json(film)
     }catch(e){
        next(ApiError.badRequest(e.message))
     }
    }
    async getAll(req,res){
        let {category_film, limit, page} = req.query
        category_film  = category_film
        page = page || 1
        limit = limit || 9
        let offset = limit * page - limit
        let film;
        if(!category_film){
            film = await Film.findAndCountAll({limit,offset})
        }
        if(category_film){
            film = await Film.findAndCountAll({where:{category_film},limit,offset})
        }
       
        return res.json(film)
    }
    async getOne(req,res){
        const {id} = req.params
        const film = await Film.findOne({
            where:{id}
        })
        return res.json(film)
     }
}

module.exports = new FilmController()