const fs = require('fs')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.getItems = (req,res) => {
    console.log('Outputting all items Route')
    // console.log('filepath: ', filePath)
    // console.log(process.env.STRIPE_SECRET_KEY)
    fs.readFile('items.json', (error, data) => {
        // console.log('data', data)
        if(error) return res.status(500).json({ message: "Failed to retrieve items"})
        res.status(200).json({
            publickey: process.env.STRIPE_PUBLIC_KEY,
            items: JSON.parse(data)
        })
    })
}

exports.purchase = (req, res) => {
    console.log('Purchase Route')
    fs.readFile('items.json', (error, data) => {
        // console.log('data', data)
        if(error) return res.status(500).json({ message: "Failed to purchase items"})
        const itemsJSON = JSON.parse(data)
        const itemsArray = itemsJSON.music.concat(itemsJSON.merch)
        let total = 0
        req.body.items.forEach((item) => {
            const itemJson = itemsArray.find((i) => {
                return i.id = item.id
            })
            total = total + itemJson.price *item.quantity
        })
        console.log('Total Amount: ', total)
        stripe.charges.create({
            amount: total,
            currency: 'usd',
            source: 'tok_amex',
            description: 'My First Test Charge (created for API docs)',
          }).then(() => {
            console.log('Charge Successful')
            res.status(200).json({
                message: "Successfully purchased Items"
            })
        }).catch((err) => {
            console.log('Charge Failed')
            res.status(400).json({
                message: "Failed to purchase Items",
                error: err
            })
        })
    })
}