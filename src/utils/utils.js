( function utils() {
    const
      fs = require( 'fs' ),
      path = require('path'),
      Utils = {
  
        readAllFilesFromDirectory: (dirname) => {
            return new Promise((resolve,reject) => {
                fs.readdir(dirname, function(err, filenames) {
                    if (err) {
                      reject(err)
                    }
                    resolve(filenames);
                  });
            })
        },

        readFile: (fileName) => {
            return new Promise((resolve,reject) => {
                fs.readFile(fileName, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data)
                });
            })
        },

        getFileName: (fileNameURL, enhancedFilesNames) => {
            const matchingFile = enhancedFilesNames.find(enhancedFileName => enhancedFileName.fileNameURL === fileNameURL);

            if ( matchingFile ) {
                return matchingFile.fileName + '.md';
            } else {
                return null;
            }
            
        },

        enhanceFilesNames: (fileNames) => {
            let enhancedFilesNames = null;
            enhancedFilesNames = fileNames.map((fileName) => {
                let fileNameWithoutExtension = path.parse(fileName).name,
                  fileNameURL = fileNameWithoutExtension.toLowerCase()
                                                        .replace(/ /g,"-")
                                                        .replace(/[&\/\\#,+()$~%'":*?!<>{}]/g, '');
                return {
                    fileName: fileNameWithoutExtension,
                    fileNameURL
                }
            });
            return enhancedFilesNames;
        }
      };
  
    module.exports = Utils;
  
  }());
  