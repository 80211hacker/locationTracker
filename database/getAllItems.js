var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const getAllItems = function(callback) {
  // TODO - your code here!

  var myResult;

    console.log("Connected!");

    MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("forbes");
  dbo.collection("customerx").find({}).toArray(function(err, result) {
    if (err) throw err;
    // console.log(result);
    // myResult = result;

    callback(result);


    db.close();
  		});
	});

    // console.log(myResult);

	// callback(myResult);


};

const getItem = function(itemx, callback) {

	// console.log(" simple query: ");
	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("forbes");
  // var query = { item: "hammer" };
  dbo.collection("customerx").find(itemx).toArray(function(err, result) {
    if (err) throw err;

    // console.log(result);
    callback(result);

    db.close();
  		});
	});



};


const insertItem = function(itemx, callback) {

	console.log(" insertItem: ");


	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("forbes");
  // var myobj = { name: "Company Inc", address: "Highway 37" };
  // var myobj = { id: 2, item: "drill", description: "This is a great", quantity: 30, price: "18.50", image:"images/drill1.jpg" };
  var myobj = { id: 3, item: "hammer", description: "This is a great", quantity: 30, price: "18.50", image:"images/drill1.jpg" };

  dbo.collection("customerx").insertOne(itemx, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");

    callback(itemx);

    db.close();
   });
  });


};

  // Remove one query
const removeOne = function(itemx, callback) {


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("forbes");
    var myquery = { name: 'Company Inc' };
   dbo.collection("customerx").deleteOne(myquery, function(err, obj) {
     if (err) throw err;
     console.log("1 document deleted");
     console.log(obj.result.n + " document(s) deleted");
     db.close();

     callback();
    });
  });

}

module.exports = {
  getAllItems, getItem, insertItem, removeOne
};
