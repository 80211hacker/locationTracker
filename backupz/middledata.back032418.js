const dbx = require('./getAllItems');


// const getAllCords = function(callback){

const getAllCords = function(callback) {


  // var holdThis = callback.bind(this);
  // callback('callss');
  // callback("testing");

  dbx.getAllItems(function(datax){
    // console.log(dastax);
    // var mydata = JSON.stringify(datax);
    // res.writeHead(200,headerx.header)

    // var tmpx = JSON.parse(datax[20]);
    // console.log(datax[20]['latitude:']);
    // console.log(datax[20]);

    var tmpx = removeOthers(datax);

    // console.log(tmpx);
    callback(tmpx);
    // callback(datax);
    // holdThis(datax);

    // holdThis.callback(tmpx);
    // res.status(200).json(datax);
    // res.send(datax);
    // res.send(mydata);
    // res.end();
  })
  // END FUNCTION

  // console.log(datax);
  // holdThis('kfsk');


};


var removeOthers = function(datax){

  // var infox = JSON.parse(datax);
  // console.log(infox);
  var cordsArr = [];


  for(var k=0; k < datax.length; k++){

    // console.log(datax[k]['latitude:']);
    if(datax[k]['latitude:']){

      var cordsObj = {};

      cordsObj.lat = parseFloat(datax[k]['latitude:']);
      cordsObj.lng = parseFloat(datax[k]['longitude:']);

      cordsArr.push(cordsObj);

      // latitudeArr.push()
    }
  }

  return cordsArr;
}


module.exports = {
  getAllCords
};
