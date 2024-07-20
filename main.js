const express = require('express')
const app = express()
const port = 2007
const bodyParser = require('body-parser')
const db = require('./route')
const response = require('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    db.query("SELECT * FROM kelas", (err , result) =>{
        // console.log(result);
        response(200, result , 'Done' , res)
    })
})

app.get('/name', (req , res) =>{
    const sql = `SELECT NAMA FROM kelas WHERE GOLONGAN_DARAH = '${req.query.Gol}'`
    db.query(sql , (err, result) =>{
        response(200 , result , 'DONE' , res)
    })
})
app.post('/tambah', (req , res) =>{
    const {nama , kelas , gol_darah} = req.body;
    const sql = `INSERT INTO kelas ( NAMA, KELAS, GOLONGAN_DARAH) VALUES ( '${nama}' , '${kelas}' , '${gol_darah}')`

    db.query(sql, (err , result) =>{
        if(err) throw err;
        if (result?.affectedRows) {
            const data = {
                SuccesNum : result.affectedRows,
                id : result.insertId
            }
            response(200 , data , 'InsertDataSucessfuly' , res)
        }
    })
})
app.put('/ganti' , (req , res) =>{
    const {nama , kelas , gol_darah , id} = req.body
    const sql = `UPDATE kelas SET NAMA = '${nama}', KELAS = '${kelas}', GOLONGAN_DARAH = '${gol_darah}' WHERE ID  = ${id}`

    db.query(sql , (err , result) =>{
        if (err) response(500 , 'err' , 'err' , res)
        if (result?.affectedRows) {
            const data = {
                SuccesNum : result.affectedRows,
                message : result.message
            }
            response(200 , data , 'InsertDataSucessfuly' , res)
        }else{
            response(200 , 'Data Gagal Di Ganti' , 'Error' , res)
        }
    })
})
app.delete('/hapus', (req , res) =>{
    const {id} = req.body 
    const sql = `DELETE FROM kelas WHERE ID = ${id}`

    db.query(sql , (err , result) =>{
        if(err) throw err
        if (result.affectedRows) {
            const data = {
                SuccesNum : result.affectedRows,
                message : result.message
            }
            response(200 , data , 'DeleteDataSucessfully', res)
        }else{
            response(500 , 'User Tidak Ditemukan!' , 'error' , res)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})