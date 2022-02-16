const { response } = require("express");
const { uploadFile } = require("../helpers/upload-file");

const uploadFiles = async (req, res = response )=>{
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file){
        res.status(400).json({msg: 'No files were uploaded.'})
        return;
    }

   try {
       
    //const name = await uploadFile( req.files, ['txt', 'md'], 'textos' );

    const name = await uploadFile( req.files, undefined, 'imgs' );

    res.json({name});

   } catch (error) {
       res.status(400).json({error});
   }

}

module.exports = {
    uploadFiles
}