const express = require("express");
const database = require("./database");
const products = express.Router();
const jwt = require("jsonwebtoken");
// all available products

function validatUser(req,res,next) {
  const token =req.headers.authorization.split(" ")
  console.log(token[1]);
  try {
    const user = jwt.verify(token[1], "wabham");
    next()
  } catch (error) {
    res.json({
      status:"fail",
      message:"unauthorize"
    })
  }
 


}





products.post("/availableproducts", validatUser, function (req, res) {
  var tag = req.body.tag;

  // const token =req.headers.authorization.split(" ")
  // console.log(token[1]);

  
  if (!tag){
    // console.log(user.username, pass.password);
     
  database.query("SELECT*FROM products", function (err, result) {
    var output = {
      status: "success",
      result: result,
    };
    res.json(output);
  });

}else{
  database.query("SELECT*FROM products WHERE tag=?",[tag], function (err, result) {
    var output = {
      status: "success",
      result: result,
    };
    res.json(output,);
  });
}
});

//view product by id
products.post("/view-product", function (req, res) {999
  var productid = req.body.productid;

  database.query(
    "SELECT*FROM products WHERE id=?",
    [productid],
    function (err, result) {
      if (result.length > 0) {
        var output = {
          status: "success",
          result: result,
        };
        res.json(output);
      } else {
        var output = {
          status: "failed",
        };
        res.json(output);
      }
    }
  );
});

// add items to cart endpoint
products.post("/add-cart", function (req, res) {
  var customerID = req.body.customerID;
  var productID = req.body.productID;
  var itemQuantity = req.body.itemQuantity;
  if (!customerID && !productID && !itemQuantity) {
    var output = {
      status: "failed",
      message:'fill all input'
    };
    res.json(output);
  }else {
    database.query(
      "INSERT INTO cart (customerID,productID,itemQuantity) VALUES(?,?,?)",
      [customerID, productID, itemQuantity],function 
      (err,result) {
        // console.log(result);
        // res.send('success')
        
        if (result['affectedRows']==0) {
          var output = {
            status: "failed",
            message: "product already in cart"
            
            };
            res.json(output);
          }else {
            var output={
                status:"succes",
                message:"added to the cart"
                };
                res.json(output);
          }
      }
    );

  }
});

// cartlist

products.post('/cart-list',function(req, res) {
  var customerID = req.body.customerID;
  if (!customerID) {
    var output = {
      status: "failed",
      message: "customerID is required"
      };
      res.json(output);
    }else{

      database.query("SELECT * FROM cart WHERE customerID = ?", [customerID], function(err,result){

        if (result.length === 0) {
          var output = {
            status: "empty",
            message: "add to cart"
            
            };
            res.json(output);
          }else {
            // var items = [];

            //   result.forEach(element => {
            //     var productID = element.productID;
            //     database.query("SELECT*FROM products WHERE id = ?",[productID],function(err,result){
            //       items = result
            //       console.log(result)
            //     })                
            //   });
            // res.send(items);




            // var output={
            //     status:"succes",
            //     message:"list of cart",
            //    result:result
            //     };
            //     res.json(output);
          }

      })
      

    }
      
    



})

// delete cart
products.post('/delete-cart',function(req, res) {
  var cartID = req.body.cartID;
  if (!cartID) {
    var output = {
      status: "failed",
      message: "cartID is required"

      
      
    }
    res.json(output);
    
  }else {
    database.query("DELETE FROM cart WHERE cartID = ?", [cartID], function(err, result){
      if (result.affectedRows === 0) {
        var output = {
          status: "failed",
          message: "cartID is not found"
        }
        res.json(output);
      }else{
        var output = {
          status: "succes",
          message: "delete from cart"
      }
      res.json(output);
    }
    })
  }

})

module.exports = products;
