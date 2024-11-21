const express = require('express');
const router = express.Router();

let animals = [
    { id: 1, name: 'Lion', type: 'Carnivore', age: 5 },
    { id: 2, name: 'Elephant', type: 'Herbivore', age: 10 },
    { id: 3, name: 'Zebra', type: 'Herbivore', age: 3 }
];

// GET all animals
router.get('/', (req, res) => {
    res.json(animals);
});

// POST new animal
router.post('/', (req, res) => {
    const { name, type, age } = req.body;
    const newAnimal = {
        id: animals.length + 1,
        name,
        type,
        age
    };
    animals.push(newAnimal);
    res.status(201).json(newAnimal);
});

// PUT update animal by ID
router.put('/:id', (req, res) => {
    const animal = animals.find(a => a.id === parseInt(req.params.id));
    if (!animal) return res.status(404).json({ message: 'Animal not found' });

    const { name, type, age } = req.body;
    animal.name = name || animal.name;
    animal.type = type || animal.type;
    animal.age = age || animal.age;

    res.status(200).json({
        message: `Animal with ID ${animal.id} has been updated`,
        updatedAnimal: animal
    });
});

// DELETE animal by ID
router.delete('/:id', (req, res) => {
    const animalIndex = animals.findIndex(a => a.id === parseInt(req.params.id));
    if (animalIndex === -1) return res.status(404).json({ message: 'Animal not found' });

    const deletedAnimal = animals.splice(animalIndex, 1)[0];
    res.status(200).json({
        message: `Animal '${deletedAnimal.name}' has been deleted`,
        deletedAnimal: deletedAnimal
    });
});

module.exports = router;
