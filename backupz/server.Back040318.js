// const express = require('express');
const express = require('express');

const bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
// const db = require('');


// FOR DATABASE   getAllItems   query:
const dbx = require('./database/getAllItems');
var headerx = require('./serverx/headerscros');
const middlex = require('./database/middledata');

// ADDED FOR WEBSOCKET IMPORTS
var http = require('http').Server(express);
var io = require('socket.io')(http);




const PORT = 4101;
const app = express();


app.use(cors());



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));


app.use(express.static(__dirname + '/../react-client/front'));
app.use(express.static(path.join(__dirname, 'publicx')));
app.use('/static', express.static('publicx'))
app.use('/static', express.static(path.join(__dirname, 'publicx')));

// app.use(bodyParser);

// app.use(express.bodyParser());


// app.use(function(req, res, next) {
//   // res.header("Access-Control-Allow-Origin", "*");
//   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('access-control-allow-origin','*');
//   res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('access-control-allow-headers', 'content-type, accept');
//   // res.header("");
//   // res.header("");
//
//
//
//   next();
// });

// app.get('/api/transactions', (req, res) => {
//
// 	res.send(' API TRANS: ');
// 	res.end();
//
// });

// app.get('/product', (req, res) => {
//
// 	// console.log(" PRODUCT  endpoint requested: ")
//   	var query = { item: "hammer" };
//
// 	dbx.getItem(query, function(datax){
//
// 		// res.send(' PRODUCT  endpoint requested: ');
// 		res.send(datax);
//
// 		res.end();
//
//
// 	});
//
//
//
// });

// app.get('/', (req, res) => {
//
// 	console.log(" root  endpoint requested: ")
// 	dbx.getItem();
// 	res.send(' You reached my server. \n This is root endpoint: ');
// 	res.end();
//
// });


// ADDED FOR WEBSOCKET BEGIN

io.on('connection', function(socket){
  console.log('a user connected');
  console.log(socket.id);
  // io.emit('RECEIVE_MESSAGE', 'kkkkkkk');

  // setInterval(function(){ counterx++; io.emit('RECEIVE_MESSAGE', counterx); console.log(counterx); }, 5000);
  // io.emit('RECEIVE_MESSAGE', 5255);


});
// ADDED FOR WEBSOCKET END

// ADDED ENDPOINT TO TEST WEBSOCKET
app.get('/testws', (req, res) => {

  console.log("this is testws endpoint: ");

    io.emit('RECEIVE_MESSAGE', 111);

    res.send('testws endpont reached:');

});



// ENDPOINT TO REMOVE ONE ITEM
app.get('/removeone', (req, res) => {

  dbx.removeOne(function(datax){

    res.send('Item Removed:');

  })

  });

// ENDPOINT TO RECEVIE CORDS
app.get('/cordsxx', (req, res) => {

  console.log("cords endpoint: ");
  console.log(req.body);
  res.send(' This is cords endpoint: ');

  });


app.post('/cordsyy', (req, res) => {

  var contentx = req.body;
  console.log("cords endpoint: ");
  console.log(contentx);


  dbx.insertItem(req.body, function(datax){
    console.log(datax);
    var mydata = JSON.stringify(datax);
    // res.writeHead(200,headerx.header)

    // res.status(200).json(datax);

    // USEFUL RES. send
    // res.send('Cords inserted:');


    // res.send(mydata);
    // res.end();
  })

  io.emit('RECEIVE_MESSAGE', contentx);
  res.send('Cords inserted:');



  // var tmpObj = JSON.parse(req.body);

  // console.log(req.body);
  // console.log(tmpObj);
  // console.log(tmpObj.latitude);
  // res.send(' This is cords endpoint: ');

  });



  // GET ALL DATA JUST COORDINATES
  app.get('/justcords', (req, res) => {

    // console.log("justcords endpoint: ");
    middlex.getAllCords(function(datax){

      res.send(datax);
      // res.send(datax);


      }
    );
    // console.log(req.body);
    // res.send(' This is justcords endpoint: ');

    });

    var masterArrMarkers = [];


    // GET INTERVAL OF COORDINATES
  app.get('/getint', (req, res) => {

    var masterArrPolys = [];
    // var masterArrMarkers = [];

    middlex.getAllCords(function(datax){

      // console.log(datax);
      console.log(datax.length);
      console.log("*****************");
      var arrdatax = datax;
      var arrPath = [];
      console.log(arrdatax.length);



        // console.log("!!!!!!!!!!!!!!*****************");

        var refreshIntervalId = setInterval(function(arrdatax){
           // streamCord(datax)
           // console.log(datax);

          if(datax.length == 1){
            clearInterval(refreshIntervalId);
          }else {
            console.log(datax.length)
            // console.log(datax.pop());
            var holder = datax.pop();
            arrPath.push(holder);

            //  COMMENTED OUT TEMP/ SOLVE SLOWNESS
            // masterArrPolys.push(arrPath);
            masterArrPolys[0] = arrPath;

            // masterArrMarkers.push(holder);

            masterArrMarkers[0] = holder;

            io.emit('RECEIVE_CORDS', masterArrMarkers);
            io.emit('RECEIVE_PATHS', masterArrPolys);



          }

        }, 300);
        // FUNCTION ENDS

        res.send('Stream of cords ended:');



    });


    }
  );

  app.post('/test', (req, res) => {

    console.log("test endpoint: ");

    // var tmpObj = JSON.parse(req.body);

    // console.log(req.body);
    // console.log(tmpObj);
    // console.log(tmpObj.latitude);
    res.send(' This is test endpoint: ');

    });


    app.get('/test', (req, res) => {

      console.log("GET test endpoint: ");
      console.log(req.body);

      // var tmpObj = JSON.parse(req.body);

      // console.log(req.body);
      // console.log(tmpObj);
      // console.log(tmpObj.latitude);
      res.send(' This is GET test endpoint: ');

      });


    app.post('/cords', (req, res) => {


      console.log(" POST realtime endpoint: ");
      console.log(req.body);

      middlex.realtime(req.body, function(markerArray, polysArray){

        console.log("#####")
        // console.log(markerArray);
        console.log(polysArray);

        io.emit('RECEIVE_CORDS', markerArray);
        io.emit('RECEIVE_PATHS', polysArray);


      });

      res.end();




    });


      // app.get('/cords', (req, res) => {
      //
      //   console.log("GET cords endpoint: ");
      //
      //   // var tmpObj = JSON.parse(req.body);
      //
      //   // console.log(req.body);
      //   // console.log(tmpObj);
      //   // console.log(tmpObj.latitude);
      //   res.send(' This is GET cords endpoint: ');
      //
      //   });



app.listen(PORT, () => {
	console.log('listening on port ' + PORT);
	// console.log(`listening on port ${PORT}`);

});

// ADDED FOR WEBSOCKET TO LISTEN ON THIS PORT
http.listen(3000, function(){
  console.log('listening on *:3000');
});
