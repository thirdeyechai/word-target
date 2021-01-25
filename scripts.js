* {box-sizing: border-box;}

h1 {
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

h2 {
  margin: 0;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-size: medium;
  font-weight: 100;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.flex-child {
  flex: 1;
}

.flex-child:first-child {
  margin-right: 50px;
}

#grid-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 214px;
  max-height: 220px;
  width: 100%;
  border: solid black;
  border-width: 4px 0 0 4px;
  justify-content: center;
}

#guesses-container {
  position: relative;
  height: 220px;
}

.cell {
  flex: 1 0 32%;
  border: solid black;
  border-width: 0 4px 4px 0;
  text-align: center;
  font: 30px Arial;
  font-weight: 500;
  line-height: 68px;
}

.middle-cell {
  background-color: black;
  color: white;
}

.flash {
  background-color: greenyellow;
  color: black;
}
.hidden {
  display: none;
}

#guess {
  margin-top: 30px;
  padding: 2px;
  border: 2px solid #8842d5;
  border-radius: 5px;
}

#check {
  border-radius: 5px;
  color: #8842d5;
  border: 2px solid #8842d5;
}

#guessed-words {
  padding: 0px;
  height: 180px;
  width: 300px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

#guessed-words li {
  font-size: small;
  display: inline-block;
}

#errors {
  margin-top: 20px;
  color: red;
}

#numberOfWords {
  font-size:x-small;
  font-family: Arial;
  position: absolute;
  bottom: 0;
  right:0;
}
