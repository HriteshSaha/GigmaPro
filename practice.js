// Remove the duplicate
// [1, 2, 1, 1, 4, 5, 7, 1, 2, 4, 1]

// const arr = [2, 4, 1, 4, 1, 5, 7, 4, 2, 5, 1]
// const newArr = []

// for(let i = 0; i<arr.length; i++){
//   let isDuplicate = false
//   for(let j = 0; j<newArr.length; j++){
//     if(arr[i] === newArr[j]){
//       isDuplicate = true
//       break
//     }
//   }

//   if(!isDuplicate){
//     newArr.push(arr[i])
//   }
// }

// console.log(newArr);



// ____________________________________________________________________________________________

// sort the array

// const arr = [2, 4, 1, 3, 6, 7, 5, 9, 8, 10 ]

// for(let i = 0; i<arr.length -1; i++){
//   for(let j = 0; j<arr.length -i -1; j++){
//     if( arr[j] > arr[j+1]){
//       [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
//     }
//   }
// }
// console.log(arr);

// _____________________________________________________________________________________________________

// Search element in the array

// const arr = [ 2, 4, 1, 3, 6, 7, 5, 9, 8, 10 ]
// const target = 11
// let index
// for(let i = 0; i<arr.length; i++){
//   if(target === arr[i]){
//     index = i
//     console.log(`Element ${target} is found in index number ${index}`);
//     break
//   }
// }
// if(!index){
//   console.log(`Element ${target} not presaent in the array`);
// }


let arr = [1, 2, 3, 4, 5];
let sliced = arr.slice(0, 4);
console.log(sliced); // Output: [2, 3, 4]
console.log(arr);    // Original array is unchanged: [1, 2, 3, 4, 5]

// __________________________________________________________________________

let arr1 = [ 2, 7, 7, 5, 2, 4, 5, 7, 6, 4, 1]
for(let i = 0; i<arr1.length -1; i++){
  for(let j = 0; j<arr1.length -i -1; j++){
    if(arr1[j] > arr1[j+1]){
      [arr1[j], arr1[j+1]] = [arr1[j+1], arr1[j]]
    }
  }
}
console.log(arr1);

const newA = new Set(arr1)
console.log(newA);
