export default function (oldState, newState){
    let xmxm = [];
    for(let i = 0; i < oldState.length; i++){
        
        if(newState[i].order_id !== oldState[i].order_id){
            xmxm.push({data:newState[i],index:i});
        }
    }
    console.log(xmxm);

}