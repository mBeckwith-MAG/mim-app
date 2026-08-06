const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const { ApiClient } = require('@mondaydotcomorg/api')
const { ObjectStorage } = require('@mondaycom/apps-sdk')
const { BOARDS, Columns, GetBoardQuery, CreateItemQuery, AddFileQuery, GetItemQuery, UpdateItemQuery, GetAssetQuery } = require('./utils/constants.js')
require('dotenv').config()

const PORT = 8080
const app = express()
const token = process.env.API_TOKEN
const mondayClient = new ApiClient({ token })

const upload = multer({ storage: multer.memoryStorage() })

app.use(cors())
app.use(express.json())

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
})

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

app.get('/api/assets/:assetId', async (req, res) => {
    const { assetId } = req.params
    try {
        const data = await mondayClient.request(GetAssetQuery, { assetId })
        const asset = data?.assets?.[0]

        if (!asset?.public_url) {
            return res.status(404).json({ error: 'Asset not found' })
        }

        const fileResponse = await fetch(asset.public_url)
        const contentType = fileResponse.headers.get('content-type') || 'application/octet-stream'

        res.setHeader('Content-Type', contentType)
        res.setHeader('Content-Disposition', `inline; filename="${asset.name}"`)

        const { Readable } = require('stream')
        Readable.fromWeb(fileResponse.body).pipe(res)

    } catch (err) {
        console.error('Asset proxy error:', err)
        res.status(500).json({ error: 'Failed to retrieve file' })
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
        res.status(500).json({ success: false, error: "Failed to retrieve item" })
    }
})

app.post('/api/inventory/add-vehicle', upload.array('attachments'), async (req, res) => {
    try {
        const boardId = BOARDS.inventory

        let stockNumbers = []
        if (req.body.stockNumbers) {
            stockNumbers = JSON.parse(req.body.stockNumbers)
        }

        await Promise.all(stockNumbers.map(stockNumber => createItem(boardId, stockNumber, req.body, req.files)))

        res.status(200).json({ message: 'Data received successfully!' })
    } catch (error) {
        res.status(400).json({ error: 'Failed to process request data' })
    }
})

app.post('/api/inventory/update/:itemId', upload.array('attachments'), async (req, res) => {
    const itemId = String(req.params.itemId)
    const boardId = String(BOARDS.inventory)
    try {
        await updateItem(boardId, itemId, req.body, req.files)
        res.status(200).json({ message: 'Data received successfully!' })
    } catch (error) {
        res.status(400).json({ error: 'Failed to process request data' })
    }
})

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`))


async function uploadFileToMonday(element, itemId, fileColumnId) {
    const objectStorage = new ObjectStorage()
    const storageKey = `temp-uploads/${Date.now()}-${element.originalname}`

    try {
        await objectStorage.uploadFile(storageKey, element.buffer, {
            contentType: element.mimetype
        })

        const downloaded = await objectStorage.downloadFile(storageKey)

        const file = new File([downloaded.content], element.originalname, { type: element.mimetype })
        await mondayClient.request(AddFileQuery, { itemId, fileColumnId, file })

    } catch (err) {
        console.error("File upload error:", err)
    } finally {
        await objectStorage.deleteFile(storageKey)
    }
}


async function createItem(boardId, stockNumber, columnData, files) {
    const fileColumnId = Columns.ATTACHMENTS
    const formattedData = formatColumnData(columnData)

    const res = await mondayClient.request(CreateItemQuery, { boardId, stockNumber, columnData: formattedData })
    const itemId = res.create_item.id

    if (files && files.length) {
        for (const element of files) {
            await uploadFileToMonday(element, itemId, fileColumnId)
        }
    }
}

async function updateItem(boardId, itemId, columnData, files) {
    const fileColumnId = Columns.ATTACHMENTS
    const formattedData = formatUpdateColumns(columnData)

    await mondayClient.request(UpdateItemQuery, { boardId, itemId, columnData: formattedData })

    if (files && files.length) {
        for (const element of files) {
            await uploadFileToMonday(element, itemId, fileColumnId)
        }
    }
}

function formatUpdateColumns(columnData) {
    const { titleOrPayoff, titleType, lienHolder, payoffAmount, perDiem, goodTill, formNotes, isReversal } = columnData

    const newValues = {
        "status": {
            "label": "Updated"
        }
    }

    if(titleOrPayoff) {
        newValues[Columns.TITLE_OR_PAYOFF] = { 
            "label": titleOrPayoff 
        }
    }
    if(titleType) {
        newValues[Columns.TITLE_STATUS] = { 
            "label": titleType 
        }
    }
    if(lienHolder) {
        newValues[Columns.LIEN_HOLDER] = lienHolder
    }
    if(payoffAmount) {
        newValues[Columns.PAYOFF_AMOUNT] = payoffAmount
    }
    if(perDiem) {
        newValues[Columns.PER_DIAM] = perDiem
    }
    if(goodTill) {
        newValues[Columns.GOOD_TILL_DATE] = goodTill
    }
    if(formNotes) {
        newValues[Columns.FORM_NOTES] = formNotes
    }
    if(isReversal === true || isReversal === "true") {
        newValues[Columns.REVERSAL] = { 
            "checked": "true" 
        }
    }

    console.log("Values", newValues)

    return JSON.stringify(newValues)
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
