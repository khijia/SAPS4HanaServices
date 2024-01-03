const cds = require('@sap/cds')
const { dta } = cds.entities('tc.masterdata')
//const SequenceHelper = require("./lib/SequenceHelper");

module.exports = cds.service.impl(async (service) => {
	// const db = await cds.connect.to("db");
	// const { Items_Header } = service.entities.Items_Header;

	// service.before("CREATE", Items_Header, async (context) => {
	// 	const itemId = new SequenceHelper({
	// 		db: db,
	// 		sequence: "ID",
	// 		table: "Items_Header",
	// 		field: "ID"
	// 	});
  //   var id = await itemId.getNextNumber();
  //   console.log("id:"+id);
	// 	context.data.ID = id;
	// });
});
