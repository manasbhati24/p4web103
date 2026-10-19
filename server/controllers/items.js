import { pool } from '../config/database.js'

// Incompatibility validation helper
const validateChristmasPack = (hasChristmasPack, hat, skin, visor) => {
    const christmasItems = ['santa hat', 'santa suit', "Santa's beard"]
    const selectedChristmasItems = [hat, skin, visor].filter(item => christmasItems.includes(item))
    
    if (!hasChristmasPack && selectedChristmasItems.length > 0) {
        return `Cannot equip Christmas items (${selectedChristmasItems.join(', ')}) without activating the Christmas Pack.`
    }
    return null
}

const getItems = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM custom_items ORDER BY id ASC'
        const results = await pool.query(selectQuery)
        res.status(200).json(results.rows)
    } catch (error) {
        console.error('💥 FULL ERROR CAUGHT IN getItems:');
        console.error(error);
        
        res.status(409).json({
            error: error.message || String(error) || 'Unknown server error',
            code: error.code || null,
            detail: error.detail || null
        });
    }
}

const getItemById = async (req, res) => {
    try {
        const selectQuery = `
            SELECT id, name, color, hat, skin, visor, hasChristmasPack, price, submittedOn
            FROM custom_items
            WHERE id=$1
        `
        const itemId = req.params.itemId
        const results = await pool.query(selectQuery, [itemId])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Item not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const createItem = async (req, res) => {
    try {
        const { name, color, hat, skin, visor, hasChristmasPack, price } = req.body

        // Rubric check: Reject impossible feature combination
        const validationError = validateChristmasPack(hasChristmasPack, hat, skin, visor)
        if (validationError) {
            return res.status(400).json({ error: validationError })
        }

        const results = await pool.query(`
            INSERT INTO custom_items (name, color, hat, skin, visor, hasChristmasPack, price)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [name, color || 'red', hat || null, skin || null, visor || null, hasChristmasPack || false, price || 0]
        )

        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateItem = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, color, hat, skin, visor, hasChristmasPack, price } = req.body

        // Rubric check: Reject impossible feature combination on update
        const validationError = validateChristmasPack(hasChristmasPack, hat, skin, visor)
        if (validationError) {
            return res.status(400).json({ error: validationError })
        }

        const results = await pool.query(`
            UPDATE custom_items 
            SET name = $1, color = $2, hat = $3, skin = $4, visor = $5, hasChristmasPack = $6, price = $7
            WHERE id = $8
            RETURNING *`,
            [name, color, hat || null, skin || null, visor || null, hasChristmasPack, price, id]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Item not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteItem = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM custom_items WHERE id = \$1 RETURNING *', [id])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Item not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
}