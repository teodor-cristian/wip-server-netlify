const express = require('express'),
  router = express.Router(),
  Utils = require( './../utils/utils' ),
  path = require("path");

const directoryName = "./src/posts"
const postPath = (process.env.LAMBDA_TASK_ROOT)? path.resolve(process.env.LAMBDA_TASK_ROOT, directoryName):path.resolve(__dirname, directoryName)


router.get('/getAllPosts',(req,res) => {
    Utils.readAllFilesFromDirectory(postPath)
    .then((filenames) => {
      let enhancedFilesNames = Utils.enhanceFilesNames(filenames)
      res.status(200).send(enhancedFilesNames)
    })
    .catch((err) => res.status(500).send(err))
})

router.get('/getPosts/:fileNameURL',(req,res) => {
    let fileNameURL = req.params.fileNameURL;

    Utils.readAllFilesFromDirectory(postPath)
    .then((fileNames) => {
      let enhancedFilesNames = Utils.enhanceFilesNames(fileNames),
        fileName = Utils.getFileName(fileNameURL, enhancedFilesNames)

        if (fileName) {
          Utils.readFile(`${postPath}/${fileName}`)
          .then((data) => {
            res.status(200).send(data)
          })
          .catch((err) => res.status(500).send(err))
        } else {
            res.status(400).send(`Bad request! No matching post for this url: ${fileNameURL}`)
        }
    })
    .catch((err) => res.status(500).send(err))

})


module.exports = router;