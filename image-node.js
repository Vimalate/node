//HOST 为 https 时改为 https
const https=require('http')
const cheerio=require('cheerio')
const download=require('download')

const HOST='http://www.itheima.com/'
let req=https.request(HOST+'teacher.html',res=>{
    let chucks=[]
    res.on('data',c=>chucks.push(c))
    res.on('end',()=>{
        let str=Buffer.concat(chucks).toString('utf8')
        let $=cheerio.load(str)
        
        let imgs=Array.prototype.map.call($('.tea_main .tea_con .li_img>img'),item=>HOST+encodeURI($(item).attr('src')) 
        )
        console.log(imgs)
        Promise.all(imgs.map(x=>download(x,'img'))).then(()=>{
            console.log('ok')
        })
    })
})
req.end()