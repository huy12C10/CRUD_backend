import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';
import mysql from 'mysql2/promise';
require('dotenv').config();
const salt = bcrypt.genSaltSync(10);




// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     database: process.env.NAME,
//     connectTimeout: 60000, 
   
//   });

const hashUserPassword = (userPassword) =>{
    let hashPassword = bcrypt.hashSync(userPassword,salt);

    return hashPassword;
}

const createNewUser = async(email,password,username) =>{
    let hashPass = hashUserPassword(password);
    const connection = await mysql.createConnection({host: 'localhost', user:'root', database: 'jwt',Promise: bluebird  })
    try{
      const [rows,fields] = 
      await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
        [email, hashPass, username]);
    } catch(error){
         console.log('check error: ',error)
    }
   

}

const getUserList = async()=>{
    const connection = await mysql.createConnection({host: 'localhost', user:'root', database: 'jwt',Promise: bluebird  })
    let users = [];
   
  //  connection.query(
  //   'Select * From users ',
  //   function(err, results, fields) {
  //     if (err) {
  //       console.error('Error inserting into database:', err);
  //       return users;
  //     }
  //     users = results;
  //     console.log("run user: ",users)
  //     return users;
  //   }
  // );
  try{
    const [rows,fields] = await connection.execute('Select * From users');
   return rows;
  }catch(error){
         console.log('check error: ',error)
  }
  

 
}

const deleteUser = async(id) =>{
  const connection = await mysql.createConnection({host: 'localhost', user:'root', database: 'jwt',Promise: bluebird  })
  let users = [];

try{
  const [rows,fields] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);
 return rows;
}catch(error){
       console.log('check error: ',error)
}

}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser
}