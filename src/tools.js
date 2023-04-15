export const ROAD = {
  name: 'road',
  label: 'Дорога',
  currentClickIndex: -1,
  onClick: ({clickIndex, cellCoords,})=>{
    console.log({clickIndex, cellCoords,});
    if (clickIndex==0) {
      
    }
  }
}

export const TOOLS = {
  [ROAD.name]: ROAD,
};

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

export const ROAD_NODE = {
  name: 'road_node',
  label: 'Узел дороги',
  
}

export const BUILDINGS = {

};

