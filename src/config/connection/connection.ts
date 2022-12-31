/* eslint-disable no-console */
import * as mongoose from 'mongoose'
import config from '../env/index'

const { MONGODB_URI_MAIN, MONGODB_URI_HAIANHEZI } = config.database

export const dbMain = mongoose.createConnection(MONGODB_URI_MAIN)
export const dbHaianhezi = mongoose.createConnection(MONGODB_URI_HAIANHEZI)

// handlers

dbMain.on('error', (error) => {
  console.log('\x1b[31m', `MongoDB-main :: connection ${error}`)
})

dbMain.once('open', () => {
  console.log('\x1b[32m', 'MongoDB-main :: connection opened')
})
dbHaianhezi.on('error', (error) => {
  console.log('\x1b[31m', `MongoDB-haianhezi :: connection ${error}`)
})

dbHaianhezi.once('open', () => {
  console.log('\x1b[32m', 'MongoDB-haianhezi :: connection opened')
})
