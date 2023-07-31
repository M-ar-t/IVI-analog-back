const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER, primaryKey : true, autoIncrement: true},
    email:{type:DataTypes.STRING, unique: true},
    password:{type:DataTypes.STRING},
    role:{type: DataTypes.STRING, defaultValue:"USER"}
})

const MovieBascket = sequelize.define('movieBasket',{
    id:{type:DataTypes.INTEGER, primaryKey : true, autoIncrement: true},
})

const MovieBascket_film = sequelize.define('movieBasket_film',{
    id:{type:DataTypes.INTEGER, primaryKey : true, autoIncrement: true},
})

const Film = sequelize.define('film',{
    id:{type:DataTypes.INTEGER, primaryKey : true, autoIncrement: true},
    name:{type:DataTypes.STRING, unique: true},
    description:{type:DataTypes.STRING},
    rating:{type: DataTypes.INTEGER, defaultValue:0},
    img:{type:DataTypes.STRING, allowNull: false},
    src_video:{type: DataTypes.STRING, allowNull: false},
    price:{type:DataTypes.INTEGER,allowNull: false},
    category_film:{type: DataTypes.STRING, allowNull: false}
})

const Rating = sequelize.define('rating',{
    id:{type:DataTypes.INTEGER, primaryKey : true, autoIncrement: true},
    rate:{type: DataTypes.INTEGER, allowNull:false}
})

const Category = sequelize.define('category',{
    id:{type:DataTypes.INTEGER, primaryKey : true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull:false, unique: true}
})

User.hasOne(MovieBascket)
MovieBascket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

MovieBascket.hasMany(MovieBascket_film)
MovieBascket_film.belongsTo(MovieBascket)

MovieBascket_film.hasOne(Film)
Film.belongsTo(MovieBascket_film)

Film.hasMany(Rating)
Rating.belongsTo(Film)

Category.hasMany(Film)
Film.belongsTo(Category)

module.exports = {
    User,
    MovieBascket,
    Rating,
    MovieBascket_film,
    Film,
    Category
}
