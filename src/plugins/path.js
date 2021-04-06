
let specfield = ["price", "stock", "market_price", "group_price", "cost_price", "strd","member_price"];
// let Host = `${window.location.protocol}//${window.location.host}`
// let apiHost = `${Host}/api`
// // apiHost =  'http://shopping.tongxintailm.com/api'

// export {apiHost, specfield,Host}






// let host = process.env.NODE_ENV === 'development' ? 'https://www.fastmock.site/mock/43590fe9e1a9a3af3dc043ffe4661782/dx/api' : `${window.location.host}`;
// let apiHost = host;





// let specfield = ["price", "stock", "market_price", "group_price", "cost_price", "strd"];
let Host = `${window.location.protocol}//${window.location.host}`

let apiHost = process.env.NODE_ENV === 'development' ? '' : `${Host}/api`

export {apiHost, specfield}