const chai = require('chai')
const request = require('supertest')
const app = require('../src/config/server/server').default
const Meta = require('../src/components/Meta/model').default
chai.should()

global._id = ''

before(async () => {
  try {
    const data1 = await Meta.create({ name: 'testMeta1', num: 78 })
    global._id = data1._id
    await Meta.create({ name: 'testMeta2', num: 79 })
  } catch (error) {
    console.log('在开始测试之前出了点问题', error.message)
  }
})

/**
 * API tests
 */
describe('Meta-CRUD', () => {
  it('创建一个Meta', (done) => {
    request(app)
      .post('/Meta')
      .send({ name: 'testMeta3', num: 80 })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(true)
        res.body.data.should.be.an('object')
        res.body.data.should.have.property('_id')
      })
      .end(done)
  })
  it('创建一个缺少必须键的Meta', (done) => {
    request(app)
      .post('/Meta')
      .send({})
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(false)
        res.body.data.should.be.an('object')
      })
      .end(done)
  })
  it('使用存在的唯一键创建一个Meta', (done) => {
    request(app)
      .post('/Meta')
      .send({ name: 'testMeta3', num: 80 })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(false)
        res.body.data.should.be.an('object')
        res.body.msg.length.should.be.above(0)
      })
      .end(done)
  })
  it('使用非法表单创建一个Meta', (done) => {
    request(app)
      .post('/Meta')
      .send({ name: 't', num: 1 })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(false)
        res.body.data.should.be.an('object')
        res.body.msg.length.should.be.above(0)
      })
      .end(done)
  })
  it('获取一个Meta', (done) => {
    request(app)
      .get('/Meta')
      .query({ condition: { name: 'testMeta3', num: 80 } })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(true)
        res.body.data.should.be.an('object')
        res.body.data.list.should.be.an('array')
        res.body.data.list[0].should.have.property('_id')
        res.body.data.list.length.should.equal(1)
      })
      .end(done)
  })
  it('获取所有Meta', (done) => {
    request(app)
      .get('/Meta')
      .query({ limit: Number.MAX_SAFE_INTEGER })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(true)
        res.body.data.should.be.an('object')
        res.body.data.list.should.be.an('array')
        res.body.data.list[0].should.have.property('_id')
        res.body.data.should.have.property('total')
        res.body.data.should.have.property('page')
        res.body.data.should.have.property('maxPage')
        res.body.data.should.have.property('limit')
        res.body.data.should.have.property('total')
        res.body.data.should.have.property('find')
        res.body.data.find.should.equal(res.body.data.list.length)
      })
      .end(done)
  })
  it('获取不存在的Meta', (done) => {
    request(app)
      .get('/Meta')
      .query({ condition: { name: 'testMeta4' } })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(true)
        res.body.data.should.be.an('object')
        res.body.data.list.should.be.an('array')
        res.body.data.list.length.should.equal(0)
        res.body.data.should.have.property('total')
        res.body.data.should.have.property('page')
        res.body.data.should.have.property('maxPage')
        res.body.data.should.have.property('limit')
        res.body.data.should.have.property('total')
        res.body.data.should.have.property('find')
        res.body.data.find.should.equal(0)
      })
      .end(done)
  })
  it('使用非法表单获取Meta', (done) => {
    request(app)
      .get('/Meta')
      .query({ page: 'abc' })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(false)
        res.body.data.should.be.an('object')
      })
      .end(done)
  })
  it('更新一个Meta', (done) => {
    request(app)
      .put('/Meta')
      .send({ _id: global._id, name: 'testMeta5', num: 81 })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(true)
        res.body.data.should.be.an('object')
        res.body.data.should.have.property('_id')
      })
      .end(done)
  })
  it('使用错误的_id更新Meta', (done) => {
    request(app)
      .put('/Meta')
      .send({ _id: '123', name: 'testMeta5', num: 81 })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(false)
        res.body.data.should.be.an('object')
      })
      .end(done)
  })
  it('使用合法但不存在的_id更新Meta', (done) => {
    request(app)
      .put('/Meta')
      .send({ _id: '63af17b2303e012d3a99bc0e', name: 'testMeta5', num: 81 })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(false)
        res.body.data.should.be.an('object')
      })
      .end(done)
  })
  it('使用存在的唯一键更新Meta', (done) => {
    request(app)
      .put('/Meta')
      .send({ _id: global._id, name: 'testMeta2', num: 81 })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(false)
        res.body.data.should.be.an('object')
      })
      .end(done)
  })
  it('使用自身的唯一键更新Meta', (done) => {
    request(app)
      .put('/Meta')
      .send({ _id: global._id, name: 'testMeta1', num: 99 })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(true)
        res.body.data.should.be.an('object')
        res.body.data.num.should.equal(99)
        res.body.data._id.should.equal(global._id.toString())
      })
      .end(done)
  })
  it('删除一个Meta', (done) => {
    request(app)
      .delete('/Meta')
      .send({ _id: global._id })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(true)
        res.body.data.should.be.an('object')
        res.body.data.should.have.property('_id')
      })
      .end(done)
  })
  it('使用非法表单删除Meta', (done) => {
    request(app)
      .delete('/Meta')
      .send({ _id: 'abc' })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(false)
        res.body.data.should.be.an('object')
      })
      .end(done)
  })
  it('使用合法但不存在的_id删除Meta', (done) => {
    request(app)
      .delete('/Meta')
      .send({ _id: '63af17953cea7771a1b9a13f' })
      .set('authorization', global.token)
      .expect((res) => {
        res.status.should.equal(200)
        res.body.success.should.equal(false)
        res.body.data.should.be.an('object')
      })
      .end(done)
  })
})

/**
 * clear database after tests
 */
after(async () => {
  try {
    await Meta.findOneAndDelete({ name: 'testMeta1' })
    await Meta.findOneAndDelete({ name: 'testMeta2' })
    await Meta.findOneAndDelete({ name: 'testMeta3' })
    await Meta.findOneAndDelete({ name: 'testMeta4' })
    await Meta.findOneAndDelete({ name: 'testMeta5' })
  } catch (error) {
    console.log('测试结束之后出了点问题', error.message)
  }
})
