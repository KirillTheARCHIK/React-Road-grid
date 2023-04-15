export const ROAD = {
  name: 'road',
  label: 'Дорога',
  currentClickIndex: -1,
  onClick: ({clickIndex, cellCoords,})=>{
    console.log({clickIndex, cellCoords,});
  }
}

export const TOOLS = {
  [ROAD.name]: ROAD,
};

export const BUILDINGS = {

};
