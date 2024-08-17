const mapping = {
    'A': '0', 'B': '1', 'C': '1', 'D': '1', 'E': '2',
    'F': '3', 'G': '3', 'H': '3', 'I': '4', 'J': '5',
    'K': '5', 'L': '5', 'M': '5', 'N': '5', 'O': '6',
    'P': '7', 'Q': '7', 'R': '7', 'S': '7', 'T': '7',
    'U': '8', 'V': '9', 'W': '9', 'X': '9', 'Y': '9',
    'Z': '9', 'a': '9', 'b': '8', 'c': '8', 'd': '8',
    'e': '7', 'f': '6', 'g': '6', 'h': '6', 'i': '5',
    'j': '4', 'k': '4', 'l': '4', 'm': '4', 'n': '4',
    'o': '3', 'p': '2', 'q': '2', 'r': '2', 's': '2',
    't': '2', 'u': '1', 'v': '0', 'w': '0', 'x': '0',
    'y': '0', 'z': '0', ' ': '0'
};

const reverseMapping = Object.keys(mapping).reduce((acc, key) => {
  const value = mapping[key];
  if (!acc[value]) acc[value] = [];
  acc[value].push(key);
  return acc;
}, {});

function convertString() {
  const input = document.getElementById("inputString").value;
  let output = "";

  for (let char of input) {
    if (mapping[char] !== undefined) {
      output += mapping[char];
    }
  }

  document.getElementById("outputNumber").innerText = output;

  return output;
}

function applyPattern() {
  const input = convertString();
  let calculation = "";
  let result = parseInt(input[0]);

  for (let i = 1; i < input.length; i++) {
    if (i % 2 === 1) {
      calculation += ` + ${input[i]}`;
      result += parseInt(input[i]);
    } else {
      calculation += ` - ${input[i]}`;
      result -= parseInt(input[i]);
    }
  }

  document.getElementById("outputSum").innerText =
    input[0] + calculation + " = " + result;
  return result;
}

function convertToAplhabet() {
  const input = Math.abs(applyPattern());

  let sum = 0;
  let sequence = [];
  let num = 0;

  while (sum < input) {
    if (sum + num > input) {
      num = 0;
    }
    sequence.push(num);
    sum += num;
    num++;
  }

  if (sum > input) {
    const excess = sum - input;
    sequence[sequence.length - 1] -= excess;
  }

  const result = sequence.map((num) => reverseMapping[num][0]);

  document.getElementById("outputConvertAlphabet").innerText =
    input + " = " + sequence.join(" ") + " = " + result;

  return result;
}

function splitLastTwoIndex() {
  const input = convertToAplhabet();

  const numberSequence = input.map((char) => mapping[char]);

  const numberLength = numberSequence.length;
  const first = numberSequence.slice(
    numberLength - numberLength,
    numberLength - 2
  );
  let last = numberSequence.slice(numberLength - 2);
  last = last.map((num) => (num = parseInt(num) + 1));

  const newNumberSequence = first.concat(last);

  const result = newNumberSequence.map((num) => reverseMapping[num][0]);

  document.getElementById("outputConvertAlphabet2").innerHTML =
    input +
    " dikonversi ke bilangan = " +
    numberSequence +
    "<br> <br>  dari bilangan tersebut, split 2 index bilangan terakhir dan + 1 = " +
    newNumberSequence +
    "<br><br> dari hasil tersebut konversi kembali ke huruf besar = " +
    result;

  return result;
}

function addPlusOneOnEven() {
  const input = splitLastTwoIndex();

  const numberSequence = input.map((char) => mapping[char]);

  let result = [];

  numberSequence.map((val) => {
    if (val % 2 === 0) {
      result.push(parseInt(val) + 1);
    } else {
      result.push(val);
    }
  });

  document.getElementById("outputConvertAlphabet3").innerHTML =
    input +
    " dikonversi ke bilangan = " +
    numberSequence +
    "<br> <br> dari bilangan tersebut, tambah +1 untuk bilangan genap = " +
    result;
}

function runConverter(){
    const input = document.getElementById("inputString").value;
    const regex = /^[A-Za-z\s]+$/;

    if (regex.test(input)) {
        document.getElementById("answer").style.display = "block";
        document.getElementById("error").style.display = "none";
        addPlusOneOnEven();
    } else {
        document.getElementById("answer").style.display = "none";
        document.getElementById("error").style.display = "block";
    }

    
}
