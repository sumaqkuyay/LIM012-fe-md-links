const suma = (a, b) => {
  return a + b;
}
const resta = (a, b) => {
  return b(3,4) - a; // b = suma
}
console.log(resta(4,(a, b) => {
  return a + b;
} ));

const multiplicación = (a,b) =>{
  return a*b;
}

const division = (a,b) =>{
  return b(2,4) / a;
}
console.log(division(16,(a,b) =>{
  return a*b;}));

//practicar
for(var i=0; i<5;i++)
{
  setTimeout(function(){console.log(i);},i*5000)
}
