const expres = require('express');
const router = expres.Router();

let todos = [
    {
        id: 1, task: 'Belajar Node.js', completed: false
    },
    {
        id: 2, task: 'Membuat API', completed: false
    },
    {
        id: 3, task: 'Membuat data baru', completed: false
    },
];

// Endpoint unruk mendapatkan data Todos
router.get('/', (req, res) => {res.json(todos); });

router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1, // Memperbaiki 'lenght' menjadi 'length'
        task: req.body.task, // Memperbaiki 'req body task' menjadi 'req.body.task'
        completed: false
    };
    todos.push(newTodo); // Memperbaiki 'todos push' menjadi 'todos.push'
    res.status(201).json(newTodo); // Memperbaiki 'res status(201)json' menjadi 'res.status(201).json'
});

router.delete('/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).json({ message: 'Tugas tidak ditemukan' });

    const deletedTodo = todos.splice(todoIndex, 1)[0];
    res.status(200).json({ message: `Tugas '${deletedTodo.task}' telah dihapus` });
});

router.put('/:id',(req, res) =>{
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({message: 'Tugas tidak ditemukan'});

    res.status(200).json({
        message:'Tugas dengan ID ${todo.id} telah diperbarui',
        updateTodo: todo
    });
});

module.exports = router;