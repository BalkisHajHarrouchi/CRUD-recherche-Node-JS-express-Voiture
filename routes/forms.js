var express = require('express');
var router = express.Router();
var db = require('../database/database');
//var User = require('../models/User')(db.sequelize)
/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const { User } = await db();
    //const Users = await User.findAll();

    // Now you can use sequelize and User model
    const Users = await User.findAll();
    console.log("€€€€€€€€€€€€€");
    console.log(Users);
    //res.json(Users)
    // Now 'Users' contains the fetched data
    // You can use it in your response or render the view

    // Example: Render a view with the Users
    res.render('form.twig', { title: 'My form', Users: Users });
  } catch (e) {
    console.log(e);
    // Handle errors appropriately, send an error response, etc.
    res.status(500).send('Internal Server Error');
  }
});

router.post('/create',async function(req, res, next) {
  //console.log(req.body);
  //res.redirect('/forms');
  const { User } = await db();
  const { username,password,birthday } = req.body;
  await User.create({username,password,birthday});
  res.redirect('/forms');
});


router.get('/update/:id', async (req, res) => {
  try {
    const { User } = await db();

    // Assuming you send the updated User data in the request body
    // const { username,password,birthday } = req.body;
    const { id } = req.params;

    // Find the User by ID
    const UserToUpdate = await User.findByPk(id);

    // Check if the User exists
    if (!UserToUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.render('formupdate.twig', { title: 'Update form', User: UserToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const { User } = await db();

    // Assuming you send the updated User data in the request body
    const { username,password,birthday } = req.body;
    const { id } = req.params;

    // Find the User by ID
    const UserToUpdate = await User.findByPk(id);

    // Check if the User exists
    if (!UserToUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the User
    UserToUpdate.username = username;
    UserToUpdate.password = password;
    UserToUpdate.birthday = birthday;
    await UserToUpdate.save();

    // Send the updated User as a response
    // res.json(UserToUpdate);
    res.redirect('/forms');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/delete/:id', async (req, res) => {
  try {
    const { User } = await db();

    const { id } = req.params;

    // Find the User by ID
    const UserToDelete = await User.findByPk(id);

    // Check if the User exists
    if (!UserToDelete) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the User
    await UserToDelete.destroy();

    // Send a success message as a response
    //res.json({ message: 'User deleted successfully' });
    res.redirect('/forms');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
