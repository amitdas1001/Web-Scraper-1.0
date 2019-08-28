const rp = require('request-promise')
const otcsv = require('objects-to-csv')
const cheerio = require('cheerio')
const fs = require('fs')
const {parse, stringify} = require('flatted/cjs');
const data=require('./email.json')
//const baseURL = 'https://www.yellowpages.com';
//const searchURL = '/search?search_terms=printing&geo_location_terms=New+York%2C+NY';

const baseURL = 'web pages\\Best 30 Printing in New York, NY with Reviews.html';
const searchURL = 'web pages\\Global Copy 2578 Broadway, New York, NY 10025.html';

const getCompanies = (callback) => {
     fs.readFile(baseURL,'utf8',(err,data)=>{ //readfile asynchronously
        if(err) return console.log(err)
        else {
            var $ = cheerio.load(data)
            //console.log($.html())
            const name = $('a.business-name').text()
            // .map(()=>{
            //   return (this.type === 'text') ? $(this).text()+' ' : '';
            // }).get().join('');
            
            fs.writeFileSync('bussinessname.json',name)
            // console.log(name)
            //const email = $('')
            return callback(name)
            //console.log(name.split(" "))
            //const bussinessmap = cheerio('a.business-name',$.html()).get()
            //console.log("extracted data after cherrion is: ",bussinessmap)
        }
    })
    //const html = rp(baseURL)
    //console.log(html)
}
const getPhonesandEmail = (callback) =>{
  fs.readFile(searchURL,'utf8',(err,data)=>{
    if(err) return console.log(err)
    else {
            var $ = cheerio.load(data)
            //console.log($.html())
            const phone = $('p.phone').text()
            // const email = $('a.email-bussiness').prop('href')
            // console.log(email)
            const email_parsed = stringify($('a.email-bussiness'))
            fs.writeFileSync('email.json',email_parsed)
            //console.log("email is: ",email_parsed)
            /*$('a.email-bussiness').each((index, value) => {
              var link = $(value).attr('href');
              //links.push({"link": link});
              console.log("email inside callback: ",link)
           });*/
            //const email = $('')
            return callback(phone,"abc")
    }
  })
}
getCompanies((name)=>{
  //console.log("name is: ",name)
  /*const transformed = new otcsv(name);
  return transformed.toDisk('./output.csv');*/
});
getPhonesandEmail((phone,email)=>{
  console.log("phone and email are: ",phone,email)
});
/*const getCompanies = async () => {
    const html = await rp(baseURL + searchURL);
    const businessMap = cheerio('a.business-name', html).map(async (i, e) => {
      const link = baseURL + e.attribs.href;
      const innerHtml = await rp(link);
      const emailAddress = cheerio('a.email-business', innerHtml).prop('href');
      const name = e.children[0].data;
      const phone = cheerio('p.phone', innerHtml).text();
  
      return {
        emailAddress,
        link,
        name,
        phone,
      }
    }).get();
    return Promise.all(businessMap);
  };

getCompanies()
  .then(result => {
    const transformed = new otcsv(result);
    return transformed.toDisk('./output.csv');
  })
  .then(() => console.log('SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'));*/

  // const getData=(data)=>{
  //   fs.writeFileSync('data.json',data)
  // }
  // getData(data)