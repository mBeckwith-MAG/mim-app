const express = require('express')
const cors = require('cors')
const { ApiClient } = require('@mondaydotcomorg/api')
require('dotenv').config()

const PORT = 8080
const app = express()
const token = process.env.MONDAY_API_TOKEN
const mondayClient = new ApiClient({ token })

app.use(cors())
app.use(express.json())

app.get('/api/boards/:boardId', async (req, res) => {
    const { boardId } = req.params
    const limit = 500
    const query = `
        query getBoardItems($boardId: ID!, $limit: Int) {
            boards(ids: [$boardId]) {
                items_page(limit: $limit) {
                cursor
                items {
                    id
                    name
                    column_values {
                        id
                        text
                        value
                    }
                }
                }
            }
        }
    `;

    try {
        const data = await mondayClient.request(query, { boardId, limit })
        const board = data?.boards?.[0];

        if (!board) {
            return res.status(404).json({ error: "Board not found." });
        }

        res.json({
            success: true,
            cursor: board.items_page.cursor,
            items: board.items_page.items
        });
    } catch (error) {
        console.error("Monday API Error:", error);
        res.status(500).json({ 
        success: false, 
        error: "Failed to retrieve items from monday.com" 
        });
    }
})

app.listen(PORT, ()=> console.log(`Listening on: https://localhost:${PORT}`))