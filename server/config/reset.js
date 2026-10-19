import { pool } from './database.js'
import './dotenv.js'
import itemData from '../data/items.js'

const createCustomItemsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS custom_items;

        CREATE TABLE IF NOT EXISTS custom_items (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            color VARCHAR(50) NOT NULL DEFAULT 'red',
            hat VARCHAR(100),
            skin VARCHAR(100),
            visor VARCHAR(100),
            hasChristmasPack BOOLEAN NOT NULL DEFAULT false,
            price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
            submittedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 custom_items table created successfully')
    } catch (err) {
        console.error('⚠️ error creating custom_items table', err)
    }
}

const seedCustomItemsTable = async () => {
    await createCustomItemsTable()

    for (const item of itemData) {
        const insertQuery = {
            text: 'INSERT INTO custom_items (name, color, hat, skin, visor, hasChristmasPack, price) VALUES (\$1, \$2, \$3, \$4, \$5, \$6, \$7)'
        }

        const values = [
            item.name,
            item.color,
            item.hat,
            item.skin,
            item.visor,
            item.hasChristmasPack,
            item.price
        ]

        try {
            await pool.query(insertQuery, values)
            console.log(`✅ ${item.name} added successfully`)
        } catch (err) {
            console.error('⚠️ error inserting item', err)
        }
    }
}

seedCustomItemsTable()