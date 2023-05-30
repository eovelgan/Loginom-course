/*const sequelize=require('../db')
const {DataTypes}=require('sequelize')
const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    email: {type:DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue:"USER"}
})

const Basket = sequelize.define('basket', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})

const BasketDevice = sequelize.define('basket_device', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})

const Device = sequelize.define('device', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type:DataTypes.STRING, unique:true, allowNull:false},
    price: {type:DataTypes.INTEGER, allowNull:false},
    rating: {type:DataTypes.INTEGER, defaultValue:0},
    img: {type:DataTypes.STRING, allowNull:false},
})

const Type = sequelize.define('type', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type:DataTypes.STRING, unique:true, allowNull:false},
})

const Brand = sequelize.define('brand', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type:DataTypes.STRING, unique:true, allowNull:false},
})

const Rating = sequelize.define('rating', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    rate: {type:DataTypes.INTEGER, allowNull:false},
})

const DeviceInfo = sequelize.define('device_info', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    title: {type:DataTypes.STRING, allowNull:false},
    description: {type:DataTypes.STRING, allowNull:false},
})


const TypeBrand=sequelize.define('type_brand',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo,{as:'info'})
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand,{through:TypeBrand})
Brand.belongsToMany(Type,{through:TypeBrand})

module.exports = {
    User, 
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}
*/

const sequelize=require('../db')
const {DataTypes}=require('sequelize')
const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    email: {type:DataTypes.STRING, unique:true},
    firstname: {type:DataTypes.STRING},
    lastname: {type:DataTypes.STRING},
    surname: {type:DataTypes.STRING},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue:"USER"}
})

const Question = sequelize.define('question', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type:DataTypes.STRING, unique:true, allowNull:false}
})

const Answer = sequelize.define('answer', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type:DataTypes.STRING, allowNull:false},
    correct: {type:DataTypes.BOOLEAN, allowNull:false}
})

const Result = sequelize.define('result', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    result: {type:DataTypes.BOOLEAN, allowNull:false}
})

const File = sequelize.define('file', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type:DataTypes.STRING, unique:true, allowNull:false},
    file: {type:DataTypes.STRING, allowNull:false},
})

const Formula = sequelize.define('formula', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    value: {type:DataTypes.STRING, allowNull:false}
})


Question.hasMany(Answer)
Answer.belongsTo(Question)

Question.hasMany(Result)
Result.belongsTo(Question)

Answer.hasMany(Result)
Result.belongsTo(Answer)

User.hasMany(Result)
Result.belongsTo(User)

module.exports = {
    User,
    Question,
    Answer,
    Result,
    File,
    Formula
}