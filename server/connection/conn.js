let mongoose = require('mongoose');

const conn1="mongodb+srv://yusufsaif0:FK2Mx6UU3mmvyBQX@cluster0.9kyv9jp.mongodb.net/auction?retryWrites=true&w=majority"
const conn=mongoose.connect(conn1,
  { useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>
{console.log("connection success");
}).catch((err)=>{(err);})
module.exports = conn

