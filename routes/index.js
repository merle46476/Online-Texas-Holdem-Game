let express = require('express');
let passport = require('../passport/conf');
let router = express.Router();
let player = require('../models/player');

/* GET home page. */
router.get('/', (req, res, next)=>{
    res.render('index', { title: 'Express' });
});

router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/');
});

router.get('/login', (req, res, next)=>{
    res.render('login', { message: req.flash('error') });
});

//used in log in page to check whether the user is authenticated
router.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err, user, info)=>{
        if (err) { return next(err); }
        //authenticate failed
        if (!user) { return res.render('login', { message: info.message }); }
        
        //success!
        req.login(user, (err)=>{
            if (err) { return next(err); }
            //console.log(user, req.session);
            res.redirect(req.session.returnTo || '/profile');
            delete req.session.returnTo;
            //console.log('after delete', req.session);
        });
    })(req, res, next);
});

router.get('/register', (req, res, next)=>{
    res.render('register', { message: req.flash('error') });
});

//add user info to database
router.post('/register', (req, res, next)=>{
    let newUser = new player({ username: req.body.username, password: req.body.password, email:req.body.email});
    newUser.save((err)=>{
        if (err) return handleError(err);
    });
    req.login(newUser, (err)=>{
        if (err) { return next(err); }
        return res.redirect('/profile');
    });
});

//if the user logged in, render the profile page, otherwise redirect to log in page
router.get('/profile', 
    (req, res, next)=>{
        if (req.user){
            next();
        } else {
            res.redirect('/login');
        }
    },
    (req, res, next)=>{
        player.findOne({ username: req.user.username }, (err, found)=>{
            if (err) { return done(err); }
            res.render('profile', { username: found.username, email: found.email, chips: found.chips });    
        });
    });


//helper function to check whether the user logged in
const checkAuth = (req, res, next)=>{
    if (req.user) {
        next();
    } else {
        //used to return to previous page
        req.session.returnTo = req.originalUrl;
        res.redirect('/login');
    }
}

router.get('/game', checkAuth, (req, res, next)=>{
   res.render('game');   
});


module.exports = router;
