const { Entertainment } = require('../models');

// Create a new entertainment entry
async function createEntertainment(req, res) {
    try {
        const newEntertainment = await Entertainment.create(req.body);
        res.status(201).json(newEntertainment);
    } catch (error) {
        console.error('Error creating entertainment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get all entertainment entries
async function getAllEntertainment(req, res) {
    try {
        const entertainmentList = await Entertainment.findAll();
        res.status(200).json(entertainmentList);
    } catch (error) {
        console.error('Error fetching entertainment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get a specific entertainment entry by ID
async function getEntertainmentById(req, res) {
    const { id } = req.params;
    try {
        const entertainment = await Entertainment.findByPk(id);
        if (!entertainment) {
            res.status(404).json({ error: 'Entertainment not found' });
        } else {
            res.status(200).json(entertainment);
        }
    } catch (error) {
        console.error('Error fetching entertainment by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Update a specific entertainment entry by ID
async function updateEntertainment(req, res) {
    const { id } = req.params;
    try {
        const [updatedRowCount] = await Entertainment.update(req.body, {
            where: { id },
        });
        if (updatedRowCount === 0) {
            res.status(404).json({ error: 'Entertainment not found' });
        } else {
            res.status(200).json({ message: 'Entertainment updated successfully' });
        }
    } catch (error) {
        console.error('Error updating entertainment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete a specific entertainment entry by ID
async function deleteEntertainment(req, res) {
    const { id } = req.params;
    try {
        const deletedRowCount = await Entertainment.destroy({
            where: { id },
        });
        if (deletedRowCount === 0) {
            res.status(404).json({ error: 'Entertainment not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        console.error('Error deleting entertainment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createEntertainment,
    getAllEntertainment,
    getEntertainmentById,
    updateEntertainment,
    deleteEntertainment,
};
