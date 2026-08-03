const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs') 
const { readFileSync } = require('fs') 
const { ApiClient } = require('@mondaydotcomorg/api')
const { BOARDS, Columns, GetBoardQuery, CreateItemQuery, AddFileQuery, GetItemQuery } = require('./utils/constants.js')
require('dotenv').config()

const PORT = 8080
const app = express()
const token = process.env.MONDAY_API_TOKEN
const mondayClient = new ApiClient({ token })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '.temp/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
    const fileExtension = path.extname(file.originalname) 
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension) 
  }
}) 
const upload = multer({ storage: storage }) 

app.use(cors())
app.use(express.json())

app.get('/api/boards/:boardId', async (req, res) => {
    const { boardId } = req.params
    const limit = 500

    try {
        const data = await mondayClient.request(GetBoardQuery, { boardId, limit })
        const board = data?.boards?.[0] 

        if (!board) {
            return res.status(404).json({ error: "Board not found." }) 
        }

        res.json({
            success: true,
            cursor: board.items_page.cursor,
            items: board.items_page.items
        }) 
    } catch (error) {
        console.error("Monday API Error:", error) 
        res.status(500).json({ 
            success: false, 
            error: "Failed to retrieve items from monday.com" 
        }) 
    }
})

app.post('/api/inventory/add-vehicle', upload.array('attachments'), async (req, res) => {
    try {
        const boardId = BOARDS.inventory

        let stockNumbers = []
        if (req.body.stockNumbers) {
            stockNumbers = JSON.parse(req.body.stockNumbers)
        }

        console.log('Form Text Data:', req.body)
        console.log('Uploaded Files:', req.files)
        console.log('Stock Numbers:', stockNumbers)


        await stockNumbers.forEach(stockNumber => createItem(boardId, stockNumber, req.body, req.files))
        

        res.status(200).json({ message: 'Data received successfully!' })
    } catch (error) {
        res.status(400).json({ error: 'Failed to process request data' })
    }
})

app.get('/api/inventory/edit-vehicle/:itemId', async (req, res) => {
    const itemId = req.params.itemId
    try {
        const item = await mondayClient.request(GetItemQuery, { itemId })

        res.json({
            success: true,
            item: item
        }) 
    } catch (err) {
        console.error("There was an issue getting the item with the id", itemId, err)
    }
})

app.listen(PORT, ()=> console.log(`Listening on: http://localhost:${PORT}`))




async function createItem(boardId, stockNumber, columnData, files) {
    const fileColumnId = Columns.ATTACHMENTS
    const formattedData = formatColumnData(columnData)
    
    await mondayClient.request(CreateItemQuery, { boardId, stockNumber, columnData: formattedData }).then((res) => {
        const itemId = res.create_item.id

        files.forEach(async (element) => {
            try {
                const fileBuff = readFileSync(element.path)
                const file = new File([fileBuff], element.originalname, { type: element.mimetype })
                await mondayClient.request(AddFileQuery, { itemId, fileColumnId, file })
            } catch(err) {
                console.error("Add File Error", err)
            } finally {
                fs.unlink(element.path, (err) => {
                    if (err) {
                        console.error(`Failed to delete temporary file ${element.path}:`, err) 
                    } else {
                        console.log(`Successfully removed temporary file: ${element.path}`) 
                    }
                }) 
            }
        })
    })
}

function formatColumnData(columnData) {
    const { submitBy, email, storeName, carType, origin, transactionMethod, titleOrPayoff, titleType, lienHolder, payoffAmount, perDiem, goodTill, formNotes, isReversal } = columnData
    const pointOfOrigin = getOriginData(carType, origin)
    const pointOfTransaction = getTransactionData(origin, transactionMethod)

    return JSON.stringify({
        [Columns.FORM_NOTES]: formNotes,
        [Columns.TITLE_OR_PAYOFF]: { 
            "label": titleOrPayoff 
        },
        [Columns.TITLE_STATUS]: { 
            "label": titleType 
        },
        [Columns.PAYOFF_AMOUNT]: payoffAmount,
        [Columns.GOOD_TILL_DATE]: goodTill,
        [Columns.LIEN_HOLDER]: lienHolder,
        [Columns.PER_DIAM]: perDiem,
        [Columns.STORE]: { 
            "labels": [storeName] 
        },
        [Columns.SUBMIT_BY]: submitBy,
        [Columns.RETURN_EMAIL]: { 
            "email": email, 
            "text": email 
        },
        [Columns.CAR_TYPE]: { 
            "label": carType 
        },
        [Columns.REVERSAL]: { 
            "checked": isReversal 
        },
        ...pointOfOrigin,
        ...pointOfTransaction
    }) 
}

function getOriginData(carType, carOrigin) {
    if(carType === 'New') {
        return {
            [Columns.NEW_ORIGIN]: {
                "label": carOrigin
            }
        }
    }

    return {
        [Columns.USED_ORIGIN]: {
            "label": carOrigin
        }
    }
}

function getTransactionData(carOrigin, transactionMethod) {
    if(carOrigin === 'Wholesale/Auction Sale') {
        return {
            [Columns.WHOLESALE_TRANSACTION_METHOD]: {
                "label": transactionMethod
            }
        }
    }
    
    return {
        [Columns.AUCTION_TRANSACTION_METHOD]: {
            "label": transactionMethod
        }
    }
}