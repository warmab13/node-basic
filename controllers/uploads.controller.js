const { response } = require("express");
const path = require("path");
const fs  = require("fs");
const { uploadFile } = require("../helpers/upload-file");
const { User, Product } = require('../models');

const uploadFiles = async (req, res = response )=>{
   try {
       
    //const name = await uploadFile( req.files, ['txt', 'md'], 'textos' );

    const name = await uploadFile( req.files, undefined, 'imgs' );

    res.json({name});

   } catch (error) {
       res.status(400).json({error});
   }
}

const updateImage = async( req, res = response )=>{
    const { collection, id } = req.params;

    let model;

    switch ( collection ){
        case 'users':
            console.log('Inside users')
            model = await User.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg: `This user ID ${id} does not exist`
                })
            }
            break;
        
        case 'products':
            console.log('Inside products')
            model = await Product.findById(id);
            console.log(model)
            if( !model ){
                return res.status(400).json({
                    msg: `This product ID ${id} does not exist`
                })
            }
            break;
        
        default:
            return res.status(500).json({msg: 'Forgot to validate this'});
    }

    //Clear previous images
    if( model.img ){
        //Delete previous image on server
        const pathImage = path.join(__dirname, '../uploads', collection, model.img)
        if( fs.existsSync(pathImage) ){
            fs.unlinkSync( pathImage );
        }
    }

    const name = await uploadFile( req.files, undefined, collection );
    model.img = name; 

    await model.save();

    res.json(model);
}

const showImage = async (req, res = response) =>{
    const { id, collection } = req.params;

    let model;

    switch ( collection ){
        case 'users':
            console.log('Inside users')
            model = await User.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg: `This user ID ${id} does not exist`
                })
            }
            break;
        
        case 'products':
            console.log('Inside products')
            model = await Product.findById(id);
            console.log(model)
            if( !model ){
                return res.status(400).json({
                    msg: `This product ID ${id} does not exist`
                })
            }
            break;
        
        default:
            return res.status(500).json({msg: 'Forgot to validate this'});
    }

    //Clear previous images
    if( model.img ){
        //Delete previous image on server
        const pathImage = path.join(__dirname, '../uploads', collection, model.img)
        if( fs.existsSync(pathImage) ){
            return res.sendFile( pathImage )
        }
    }

    const pathImageNotFound = path.join(__dirname, '../assets', 'no-image.jpg')
    res.sendFile(pathImageNotFound)
}

module.exports = {
    uploadFiles,
    updateImage,
    showImage
}