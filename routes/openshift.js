var exec = require('child_process').exec;
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/scale', function(req, res, next) {
  var command = 'oc scale dc/';
  if(req.query.service && req.query.replicas){
    command = command + req.query.service + ' --replicas=' + req.query.replicas; 
    var project = req.query.project;
    if(!project){
      project = 'default';
    } 

    command = command + ' -n=' + project; 
    exec(command, function(error, out, err){
       if(error){
         res.send( { status: 'Failed', message: error });
       } else {
         res.send( { status: 'Success', message: out });
       }
    });
  } else {
    console.log('Need service and replicas parameter');
  }
  console.log(command);
  res.send({ status: 'Success' } );

});

router.get('/status', function(req,res,next){
    console.log('scaling');
});

router.get('/project', function(req,res,next){
    console.log('Setting project');
    if(req.query.project){
      var command = 'oc project ' + req.query.project + ' 2>/dev/null || echo "Project does not exist"';
      console.log('command: ', command);
      exec(command,function(error,out){
          console.log(error);
          res.send({ status: 'Success', message: out });
      });
    } else {
        res.send( { status: 'Failed', message: 'Project paramter is required' });
    }
});

module.exports = router;
