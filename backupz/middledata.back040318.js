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
  /*
    This is the array that holds the cords for the MARKERS of all current nodes
    in memory
  */
  var markerArray = {};

  var masterSuperObject = {};



const realtime = function(nodex, callback) {


  // var latx = {};
  // var longx = {};

  var idx = nodex.idx;
  var objectx = {};

  var objectAllInfo = {};

  /*
    THIS IS THE ARRAY SENT TO PRODUCTION
    CONTAINS CORDS MARKERS OF ACTIVE NODES
  */

  var markersActiveNodesProd = [];

  // objectx.lat = nodex.latitude;
  objectx.lat = parseFloat(nodex.latitude);

  // objectx.lon = nodex.longitude;
  objectx.lng = parseFloat(nodex.longitude);
  objectx.idx = nodex.idx;




  // THIS INFO CONTAINS ALL THE SESSION INFO
    objectAllInfo.lat = parseFloat(nodex.latitude);
    objectAllInfo.lng = parseFloat(nodex.longitude);
    objectAllInfo.altitud = parseFloat(nodex.altitud);
    objectAllInfo.speed = parseFloat(nodex.speed);
    objectAllInfo.time = parseFloat(nodex.time);
    objectAllInfo.bear = parseFloat(nodex.bear);
    objectAllInfo.speedkm = parseFloat(nodex.speedkm);
    objectAllInfo.idx = nodex.idx;
    objectAllInfo.polyLineColor = {strokeColor: '#FF0000'};




  markerArray[idx] = objectx;

  for(var mark in markerArray){

    markersActiveNodesProd.push(markerArray[mark]);
  }


  if(masterSuperObject[idx]){

    masterSuperObject[idx].push(objectAllInfo);

  }else{

    masterSuperObject[idx] = [];
    masterSuperObject[idx].push(objectAllInfo);

    console.log("id does not exit on masterSuperObject: ");
  }

  console.log(" \n ");
  console.log("**************************** ");
  // console.log(markerArray);

  // console.log(masterSuperObject);
  // console.log(masterSuperObject[idx]);

  /*
    This (nodesPolylinesArray) is the Array that will be sent to the front
    to render multiple polylines of the nodes currently in the masterSuperObject object
  */
  var nodesPolylinesArray = [];

  for(var tmp in masterSuperObject){

    // console.log(masterSuperObject[tmp]);
    nodesPolylinesArray.push(masterSuperObject[tmp]);
  }
  // console.log(markerArray[idx].lat);

  // console.log(nodesPolylinesArray);

  callback(markersActiveNodesProd, nodesPolylinesArray)




}


module.exports = {
  getAllCords, realtime
};
