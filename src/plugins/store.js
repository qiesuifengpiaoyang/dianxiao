export let store = {
    debug:true,
    state:{
        addressList:[],
    },
    setAddressListAction(newValue){
        this.state.addressList = newValue;
        // console.log(this.state.addressList,'这是在store文件中的输出');
    }
};
export let Y = ["1100001", "1200001", "5000001"];
// export let store = {
//     debug:true,
//     state:{
//         addressList:[],
//     },
//     setAddressListAction(newValue){
//         this.state.addressList = newValue
//     }
// };
// export let Y = ["1100001", "1200001", "5000001"];