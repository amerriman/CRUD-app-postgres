var express = require('express');
var router = express.Router();

var options = {
  //Initialization Options
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgress://localhost:5432/puppies';
//Below allows us to use all the methods for postgres promise
var db = pgp(connectionString);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/puppies', function(req, res, next){
  db.any('select * from pups')
    .then(function (data){
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all puppies!'
        });
    })
    .catch(function(err){
      return next(err);
    });
});

router.get('/api/puppy/:id', function(req, res, next){
  var pupID = req.params.id;
  db.one('select * from pups where id =$1', pupID)
  .then(function (data){
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ONE puppy!'
      });
    })
    .catch(function(err){
      return next(err);
  });
});

//test post in curl
// curl --data "name=Test&breed=test&age=7&sex=female" http://127.0.0.1:3000/api/puppies
router.post('/api/puppies', function(req, res, next){
  db.none("insert into pups(name, breed, age, sex) values($1, $2, $3, $4)", [req.body.name, req.body.breed, req.body.age, req.body.sex])
  .then(function (){
    res.status(200)
      .json({
        status: 'success',
        message: 'You added a puppy!'
      });
  })
  .catch(function(err){
    return next(err);
  });
});

//This works for updating all
// //test put in curl, for puppy with id of 1, for updating all things
// // curl -X PUT --data "name='Test'&breed='test'&age=7&sex='female'" http://127.0.0.1:3000/api/puppy/1
// router.put('/api/puppy/:id', function(req, res, next){
//   // db.one('update pups set '+req.body.column+'='+req.body.value+' wgere id =$1', [req.body.column, req.body.value, req.params.id])
//   db.none('update pups set name=($1), breed=($2), age=($3), sex=($4) where id=($5)', [req.body.name, req.body.breed, req.body.age, req.body.sex, req.params.id])
//   .then(function (data){
//     res.status(200)
//       .json({
//         status: 'success',
//         data: data,
//         message: 'You updated a puppy!'
//       });
//   })
//   .catch(function(err){
//     return next(err);
//   });
// });

//this only works with one value
//test put in curl, for puppy with id of 1, for updating all things
// curl -X PUT -d column=name -d value=john http://127.0.0.1:3000/api/puppy/1
router.put('/api/puppy/:id', function(req, res, next){
  // console.log(req.body)
  db.none('update pups set $1^=$2 where id=$3', [req.body.column, req.body.value, req.params.id])
  .then(function (data){
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'You updated a puppy!'
      });
  })
  .catch(function(err){
    return next(err);
  });
});


router.delete('/api/puppies/:id', function(req, res, next){
  var pupID = req.params.id;
  //the .none is about what is getting returned
  db.none('delete from pups where id=$1', pupID)
  .then(function(){
    res.status(200)
      .json({
        status: 'success',
        message: 'You deleted a puppy!'
      });
  })
  .catch(function(err){
    return next(err);
  });
});


module.exports = router;
