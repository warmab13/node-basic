const path = require("path");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

const uploadFiles = (req, res = response )=>{
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file){
        res.status(400).json({msg: 'No files were uploaded.'})
        return;
    }

    const { file } = req.files;

    const cutName = file.name.split('.');
    const extension = cutName[ cutName.length - 1 ];

    console.log(cutName)

    //File extension validate

    const validExtensions = ['png', 'jpg', 'jpeg', 'gif']

    if( !validExtensions.includes(extension)){
        return res.status(400).json({
            msg: `Extension ${extension} is not allowed, ${validExtensions}`
        })
    }

    const tempName = `${uuidv4()}.${extension}`
    const uploadPath = path.join(__dirname, '../uploads/', tempName);

    file.mv(uploadPath, (err)=>{
        if(err){
            console.log(err);
            return res.status(500).json(err);
        }

        res.json('File uploaded to ' + uploadPath);
    })
}

module.exports = {
    uploadFiles
}