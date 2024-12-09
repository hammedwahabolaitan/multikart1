const express = require("express");
const database = require("./database");
const products = express.Router();
// const upload =  multer({storage:storageConfig})

// products.post('/addproducts',function(req,res){
//   // console.log(req.file)
//   // let itemsName =req.body.itemsName
//   // let itemsPrice =req.body.itemsPrice
//   // let description =req.body.description
//   // let categorys = req.body.categorys

//   if(itemsName!=""&&itemsPrice!=""&&description!="" &&categorys!=""){
//     database.connect(function(err){
//       // console.log(err);
//       database.query("INSERT INTO products(itemsName,itemsPrice,description,categorys,imageUrl)VALUES(?,?,?,?)",[itemsName,itemsPrice,description,categorys,imageUrl],function(err,result){
//         if(result['insertId']==0){
//           res.send({'status':'not successfuly'})
//          }else {
//           res.send({'status':'added successfuly'})
//          }
//         res.send(result)
//         console.log(result);
//     })

//     })
//   }else{
//     res.send({'status':'fill all the value'})
//   }

// })





// all available products
products.post("/availableproducts", function (req, res) {
  var tag = req.body.tag;
  if (!tag){
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
    res.json(output);
  });
}
});

//view product by id
products.post("/view-product", function (req, res) {
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
            var output={
                status:"succes",
                message:"lis of cart",
               result:result
                };
                res.json(output);
          }

      })
      

    }
      
    



})

// delete car
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






const express = require("express");
const database = require("./database");
const userinfo = express.Router();
const nodemailer =require("nodemailer")
const mymail ="olaitanwahabhammed@gmail.com"
const mypass = 'mkwd obwu gogb shsf'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mymail,
    pass: mypass
  }
});

 function sendmail(to , subject, text) {
  console.log("hello");
  
  const mailOptions = {
    from: mymail,
    to: to,
    subject: subject,
    html: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return false
    } else {
      console.log('Email sent: ' + info.response);
      return true
    }
  });
 }
function validatUser(username,email){
  database.query('SELECT*FROM  customerinfo WHERE username = ? or email = ?', [username,email], function(err, results){
  console.log(results);
  
  if (results.length===0) {
    return true
  }else {
    return false
  }
    
  })

}
userinfo.post("/signup", (req, res) => {
  const { fullname,username,phoneNumber,email, password } = req.body;

  if ( !fullname, !email || !username || !phoneNumber || !password) {
    return res.status(400).send({ status: "Invalid input data" });
  }



  database.query('SELECT*FROM  customerinfo WHERE username = ? or email = ?', [username,email], function(err, results){
    console.log(results);
    if (results.length===0) {
      
    const query = "INSERT INTO customerinfo ( fullname,username,phonenumber,email, password ) VALUES (?, ?, ?, ?,?)";
    database.query(query, [fullname,username,phoneNumber,email, password], (err, result) => {
      if (err) {
        return res.status(500).send({ status: "Database error", error: err });
      }
      const htmlcontent ="<h1> Welcome to our website</h1> <p> you have login successfully to our website </p>";

      sendmail(email,"registration successfull", htmlcontent)
      res.send({
        status: result.insertId ? "Added successfully" : "Not successfully",
      });

   

      });
    }else {
     res.send("existed")
    }
      
    })




  
});

// User Login
userinfo.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ status: "Invalid input data" });
  }

  const query = "SELECT * FROM customerinfo WHERE username = ? AND password = ?";
  database.query(query, [username, password], (err, result) => {
    if (err) {
      return res.status(500).send({ status: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(401).send({ status: "Invalid credentials" });
    }
;
   
    res.send({ status: "successful", result});  
    console.log(result);
     
    
  });
});


module.exports = userinfo;


 













// const express = require("express");
// const database = require("./database");
// const userinfo = express.Router();
// const nodemailer =require("nodemailer")
// const mymail ="olaitanwahabhammed@gmail.com"
// const mypass = 'mkwd obwu gogb shsf'
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: mymail,
//     pass: mypass
//   }
// });

//  function sendmail(to , subject, text) {
//   console.log("hello");
  
//   const mailOptions = {
//     from: mymail,
//     to: to,
//     subject: subject,
//     html: text
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//       return false
//     } else {
//       console.log('Email sent: ' + info.response);
//       return true
//     }
//   });
//  }
// function validatUser(username,email){
//   database.query('SELECT*FROM  customerinfo WHERE username = ? or email = ?', [username,email], function(err, results){
//   console.log(results);
  
//   if (results.length===0) {
//     return true
//   }else {
//     return false
//   }
    
//   })

// }
// userinfo.post("/signup", (req, res) => {
//   const { fullname,username,phoneNumber,email, password } = req.body;

//   if ( !fullname, !email || !username || !phoneNumber || !password) {
//     return res.status(400).send({ status: "Invalid input data" });
//   }



//   database.query('SELECT*FROM  customerinfo WHERE username = ? or email = ?', [username,email], function(err, results){
//     console.log(results);
//     if (results.length===0) {
      
//     const query = "INSERT INTO customerinfo ( fullname,username,phonenumber,email, password ) VALUES (?, ?, ?, ?,?)";
//     database.query(query, [fullname,username,phoneNumber,email, password], (err, result) => {
//       if (err) {
//         return res.status(500).send({ status: "Database error", error: err });
//       }
//       const htmlcontent ="<h1> Welcome to our website</h1> <p> you have login successfully to our website </p>";

//       sendmail(email,"registration successfull", htmlcontent)
//       res.send({
//         status: result.insertId ? "Added successfully" : "Not successfully",
//       });

   

//       });
//     }else {
//      res.send("existed")
//     }
      
//     })




  
// });

// // User Login
// userinfo.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).send({ status: "Invalid input data" });
//   }

//   const query = "SELECT * FROM customerinfo WHERE username = ? AND password = ?";
//   database.query(query, [username, password], (err, result) => {
//     if (err) {
//       return res.status(500).send({ status: "Database error", error: err });
//     }  

//     if (result.length === 0) {
//       return res.status(401).send({ status: "Invalid credentials" });
//     }  
//     ;  
    
//     res.send({ status: "successful", result});  
//     console.log(result);
    
    
//   });  
  
// });


// module.exports = userinfo;


 




  
  
  

  
  
  
  

