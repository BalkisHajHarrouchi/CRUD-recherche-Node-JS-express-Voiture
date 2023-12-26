var express = require('express');
var router = express.Router();
var db = require('../database/database');
//var Voiture = require('../models/Voiture')(db.sequelize)
/* GET Voitures listing. */
router.get('/', async function(req, res, next) {
  try {
    const { Voiture } = await db();
    //const Voitures = await Voiture.findAll();

    // Now you can use sequelize and Voiture model
    const Voitures = await Voiture.findAll();
    console.log("€€€€€€€€€€€€€");
    console.log(Voitures);
    //res.json(Voitures)
    // Now 'Voitures' contains the fetched data
    // You can use it in your response or render the view

    // Example: Render a view with the Voitures
    res.render('voiture.twig', { title: 'My Vehicule', Voitures: Voitures });
  } catch (e) {
    console.log(e);
    // Handle errors appropriately, send an error response, etc.
    res.status(500).send('Internal Server Error');
  }
});

router.post('/create',async function(req, res, next) {
  //console.log(req.body);
  //res.redirect('/forms');
  const { Voiture } = await db();
  const { matricule,marque,modele } = req.body;
  await Voiture.create({matricule,marque,modele});
  res.redirect('/voitures');
});


router.get('/update/:id', async (req, res) => {
  try {
    const { Voiture } = await db();

    // Assuming you send the updated Voiture data in the request body
    // const { Voiturename,password,birthday } = req.body;
    const { id } = req.params;

    // Find the Voiture by ID
    const VoitureToUpdate = await Voiture.findByPk(id);

    // Check if the Voiture exists
    if (!VoitureToUpdate) {
      return res.status(404).json({ error: 'Voiture not found' });
    }
    res.render('voitureupdate.twig', { title: 'Update voiture', Voiture: VoitureToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const { Voiture } = await db();

    // Assuming you send the updated Voiture data in the request body
    const { matricule,marque,modele } = req.body;
    const { id } = req.params;

    // Find the Voiture by ID
    const VoitureToUpdate = await Voiture.findByPk(id);

    // Check if the Voiture exists
    if (!VoitureToUpdate) {
      return res.status(404).json({ error: 'Voiture not found' });
    }

    // Update the Voiture
    VoitureToUpdate.matricule = matricule;
    VoitureToUpdate.marque = marque;
    VoitureToUpdate.modele = modele;
    await VoitureToUpdate.save();

    // Send the updated Voiture as a response
    // res.json(VoitureToUpdate);
    res.redirect('/voitures');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/delete/:id', async (req, res) => {
  try {
    const { Voiture } = await db();

    const { id } = req.params;

    // Find the Voiture by ID
    const VoitureToDelete = await Voiture.findByPk(id);

    // Check if the Voiture exists
    if (!VoitureToDelete) {
      return res.status(404).json({ error: 'Voiture not found' });
    }

    // Delete the Voiture
    await VoitureToDelete.destroy();

    // Send a success message as a response
    //res.json({ message: 'Voiture deleted successfully' });
    res.redirect('/voitures');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/recherche', async (req, res) => {
    try {
      const { Voiture } = await db();
      
      const { matricule } = req.body;

      const VoitureToFind = await Voiture.findOne({ where: { matricule } });
  
      if (!VoitureToFind) {
        res.render('voiture.twig', { title: 'Search', RechVoiture: "notFound" });
      }
      else{
      res.render('voiture.twig', { title: 'Search', RechVoiture: VoitureToFind });
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
