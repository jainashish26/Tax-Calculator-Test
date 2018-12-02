# Income Tax Calculator (Test)
A Financial Javascript library aimed for project transformation from a legacy Excel Application.


----
## What is it?

> It is a light-weight progressive web app (*See Below) developed to bring online an offline [income tax calculator] application (primarily developed in Excel). 


----
## Usage
1. Open the [Live app](https://jainashish.com/test).
2. Provide the input values on the left side (desktop view) / top side (mobile view).
3. Click the button 'Calculate Tax' to view the output.

![](preview.png?raw=true)

----
## Project Quick Reference
### Progressive Web App
Progressive web apps could be the next big thing for the mobile web. Originally proposed by Google in 2015, they have already attracted a lot of attention because of the relative ease of development and the almost instant wins for the application’s user experience. 
>Think of it as a website built using web technologies but that acts and feels like an app. 

It's important features are:

* to allow users to install web apps to their home screen, 
* to receive push notifications and 
* to even work offline (*try putting your cellphone on airplane mode and re-open the [test live link](https://jainashish.com/test/)*).

[Click Here](https://developers.google.com/web/progressive-web-apps/) to know more about the Progressive Web Apps.

----
## Change Log
* 2-Dec-2018 Initial Version

----
## Files
* FinCalculator.js - Comprehensive javascript library for Income Tax related functions. It primarily contains the below functions:
 - getRentalIncomeTaxFree() - returns 80% of provided rent;

 - getExpense() - returns the total expense based on income slab, number of kids and an existing Expense Model;

 - getIncomeTax() - returns the income tax based on taxable income and defined income tax slab model;

 - getTotalIncome() - returns Income deducting Income-Tax;

 - getSurplus() - returns the surplus amount left after paying income tax and expenses;

 - findClosest() - mimicks the functionality of Excel's Vlookup with more features when an exact match is not found.


----
## Links
* [LIVE](https://jainashish.com/test/)  : https://jainashish.com/test/
