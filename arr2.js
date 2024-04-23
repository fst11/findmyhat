let arr = new Array(1, 2, 3);
// console.log(arr);

let arr2 = new Array(3)
// console.log(arr2);

for (let index = 0; index < arr2.length; index++) {
    arr2[index] = index + 1;

}
console.log(arr2);

const width = 5;
const height = 4;

const field2D = new Array(height).fill("0").map(Element => new Array("░", "░"));
// console.log(field2D);

// for (let index = 0; index < height; index++) {
//     console.log("index at " + index + "has a array of:[" + field2D[index] + " ]. ");
// }

const fieldCharacter = "░"
const hole = "o"

const field2D_v2 = new Array(height).fill("0").map(Element => new Array(width));

let limit = Math.round((Math.random() * 0.1 + 0.1) * 10) / 10;

for (let y = 0; y < height; y++) {

    for (let x = 0; x < width; x++) {
        const ceiling = Math.round(Math.random() * 10) / 10;
        field2D_v2[y][x] = limit < ceiling ? fieldCharacter : hole;

    }
}
console.log(field2D_v2);