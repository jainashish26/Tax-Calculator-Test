//TaxSlab - Income Tax Upper Limit, Income Tax Rate, Carry (Keep it 0, it will be calculated later)
var taxSlab = [
  [ 0, 0, 0 ],
  [ 18200, 0.19, 0 ],
  [ 37000, 0.325, 0 ],
  [ 87000, 0.37, 0 ],
  [ 180000, 0.45, 0 ]
];

//ExpenseModel - A matrix based upon incomeSlab and number of Children in a family.
//First Column represents number of kids and First Row represents Income Slab limit.
const expenseModel = [
      [-1, 21000, 35000, 75000, 150000, 200000, 1000000],
      [0, 26123.5714285714, 28574.2857142857, 31755, 34466.4285714286, 38533.5714285714, 40254.2857142857],
      [1, 28782.8571428571, 31181.4285714286, 34205.7142857143, 36812.8571428571, 40723.5714285714, 42392.1428571429],
      [2, 33840.7142857143, 36395.7142857143, 39680.7142857143, 42496.4285714286, 46720, 48492.8571428571],
      [3, 38116.4285714286, 40775.7142857143, 44217.1428571429, 47189.2857142857, 51569.2857142857, 53446.4285714286],
      [4, 42392.1428571429, 45155.7142857143, 48753.5714285714, 51882.1428571429, 56418.5714285714, 58400],
      [5, 46667.8571428571, 49535.7142857143, 53290, 56575, 61267.8571428571, 63353.5714285714],
      [6, 50943.5714285714, 53915.7142857143, 57826.4285714286, 61267.8571428571, 66117.1428571429, 68307.1428571429],
      [7, 55219.2857142857, 58295.7142857143, 62362.8571428571, 65960.7142857143, 70966.4285714286, 73260.7142857143],
      [8, 59495, 62675.7142857143, 66899.2857142857, 70653.5714285714, 75815.7142857143, 78214.2857142857],
      [9, 63770.7142857143, 67055.7142857143, 71435.7142857143, 75346.4285714286, 80665, 83167.8571428571],
      [10, 16790, 19449.2857142857, 22838.5714285714, 25758.5714285714, 30138.5714285714, 31963.5714285714]
];

//Test Script to test the FinCalculator.js library child/unit functions.
var testScript = function(){
    console.log('INPUT #1  : ' + [100000.00, 20000.00, 2]);
    console.log('ACTUAL OUTPUT #1 : ' + getTaxParameters(100000, 20000.00, 2));
    console.log('EXPECTED OUTPUT #1 : Income Tax: $24632.00,Rental Income: $16000.00,Total Income: $91368.00,Expense: $42496.43,Surplus: $48871.57 \n\n')

    console.log('INPUT #2  : ' + [75000.00, 30000.00, 4]);
    console.log('ACTUAL OUTPUT #2 : ' + getTaxParameters(75000.00, 30000.00, 4));
    console.log('EXPECTED OUTPUT #2 : Income Tax: $15382.00,Rental Income: $24000.00,Total Income: $83618.00,Expense: $51882.14,Surplus: $31735.86 \n\n')

    console.log('INPUT #3  : ' + [180000.00, 36000.00, 1]);
    console.log('ACTUAL OUTPUT #3 : ' + getTaxParameters(180000.00, 36000.00, 1));
    console.log('EXPECTED OUTPUT #3 : Income Tax: $54232.00,Rental Income: $28800.00,Total Income: $154568.00,Expense: $42392.14,Surplus: $112175.86 \n\n')

}

//Parent Function encapsulating calculation of all tax parameters.
var getTaxParameters = function(gIncome, rIncome, cCount){
    var rIncomeTaxFree = parseFloat(getRentalIncomeTaxFree(rIncome)).toFixed(2);
    var expenses = getExpense(expenseModel,gIncome, cCount).toFixed(2);

    //Calculate the 'Carry' Column of taxSlab array
    taxSlab.reduce(function(previousValue, currentValue, currentIndex, array) {
      array[currentIndex][2] = ((currentValue[0] - previousValue[0])*previousValue[1])+previousValue[2];
      return currentValue;
    });

    var incomeTax = parseFloat(getIncomeTax(taxSlab, gIncome)).toFixed(2);
    var netIncome = (parseFloat(gIncome) + parseFloat(rIncomeTaxFree) - incomeTax).toFixed(2);
    var surplus = (netIncome - expenses).toFixed(2);

    return ['Income Tax: $' + incomeTax, 'Rental Income: $' + rIncomeTaxFree,'Total Income: $' + netIncome,'Expense: $' +  expenses, 'Surplus: $' + surplus];
}

//Get TaxFree Rental Income
var getRentalIncomeTaxFree = function(rIncome){
    var x = (parseFloat(rIncome) * 0.8).toFixed(2);
      if (isNaN(x) || x <= 0 || typeof(x) === 'undefined') {
        return 0;
      }
      else {
        return x;
      }
};

//Locate the Expense from [Expense Matrix] using [Income Slab] and [Kids in the family]
var getExpense = function(expenseMatrix,gIncome,childCount){
  incomeSlab = findClosest(gIncome,expenseMatrix[0],1);
  indexIncome = expenseMatrix[0].indexOf(incomeSlab);
  totalExpense = expenseMatrix[parseInt(childCount)+1][indexIncome];
  return parseFloat(totalExpense);
}

//Calculate the income Tax using [Tax Limit Slab] and [Gross Income]
var getIncomeTax = function(taxLimits,gIncome){
  firstColumn = taxLimits.map(x => x[0]);
  indexIncome = firstColumn.indexOf(findClosest(gIncome,firstColumn,0));
  if (isNaN(gIncome) || gIncome<= 0 || (typeof gIncome) == 'undefined'){
    return 0;
  }
  else {
    return parseFloat((gIncome - taxLimits[indexIncome][0])*taxLimits[indexIncome][1] + taxLimits[indexIncome][2]);
  }
}

//Alternative to Excel's VLOOKUP function
//x is the Lookup value
//arr is the Lookup Range
//pos is to get Next(1) or Previous(0) element if there is NO Exact Match.
var findClosest = function (x, arr, pos) {
    //Create an array with difference of x and array value and choose the minimum difference element from array.
    var indexArr = arr.map(function(k) { return Math.abs(k - x) });
    var min = Math.min.apply(Math, indexArr);
    if (pos == 0){
      closestValue = arr[indexArr.indexOf(min)];
    }
    else {
      closestValue = arr[indexArr.indexOf(min) + pos];
      if (isNaN(closestValue) || typeof closestValue == 'undefined'){
        closestValue = arr[indexArr.indexOf(min)];
      }
    }
    return closestValue;
}
