const fs = require("fs");

(async function(){
    const seasons = (fs.readdirSync("./")).filter(entry => !entry.includes("."));
    const episodes = [];
    for(let i = 0; i < seasons.length; i++){
        episodes.push(fs.readdirSync(`./${seasons[i]}`))
    }
    fs.writeFileSync("./watch.html", `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>The Owl House</title>
    </head>
    <body>
        ${episodes.map((season, index) => {
            return `
                <h1>Season${index+1}</h1>
                ${season.map(episode => `
                <div>
                    <p>${episode.replace(".mp4","")}</p>
                    <video width="${1920/5}" height="${1080/5}" controls="">
                        <source src="./${seasons[index]}/${episode}" type="video/mp4">
                    </video>
                </div>
                `).join("")}
            `
        }).join("")}
    </body>
    </html>
    `)
})()