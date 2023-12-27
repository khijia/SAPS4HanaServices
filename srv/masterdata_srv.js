const cds = require('@sap/cds')
const { dta } = cds.entities('tc.masterdata')

class MasterDataService extends cds.ApplicationService { init(){

  // Reduce stock of ordered books if available stock suffices
  this.on ('submitOrder', async req => {
    // const {book,quantity} = req.data
    // let {stock} = await SELECT `ItemName` .from (dta,book)
    // if (stock >= quantity) {
    //   await UPDATE (Books,book) .with (`stock -=`, quantity)
    //   await this.emit ('OrderedBook', { book, quantity, buyer:req.user.id })
    //   return { stock }
    // }
    // else return req.error (409,`${quantity} exceeds stock for book #${book}`)
  })

  // Add some discount for overstocked books
  this.after ('READ','Items_Header', each => 
  {
    
  console.log(each.ItemName )  ;
  })

  return super.init()
}}

module.exports = { MasterDataService }
