const formatMoney = (theFormat) => {
    return function (thePrice) {
      const formatPattern = /\{\{\s*(\w+)\s*\}\}/;
      theFormat = (theFormat || this.money_format);

      if (typeof thePrice == 'string') {
        thePrice = thePrice.replace(/[^0-9]/g, '');
      }
      thePrice = parseInt(thePrice);
      thePrice = thePrice.toString();

      switch (thePrice.length) {
        case 0:
          thePrice = '000';
          break;

        case 1:
          thePrice = '00' + thePrice;
          break;

        case 2:
          thePrice = '0' + thePrice;
          break;

        default:
          break;
      }

      const unitsString = thePrice.substr(0, thePrice.length - 2);
      let decimalsString = thePrice.substr(thePrice.length - 2);
      let separator = ',';
      let decimalsSeparator = '.';

      function addSeparator(moneyString, separator) {
        separator = (separator || ',');
        return moneyString.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator);
      }

      switch (theFormat.match(formatPattern)[1]) {
        case 'amount_no_decimals':
          decimalsString = '';
          decimalsSeparator = '';
          break;

        case 'amount_with_comma_separator':
          separator = '.';
          decimalsSeparator = ',';
          break;

        case 'amount_no_decimals_with_comma_separator':
          separator = '.';
          decimalsString = '';
          decimalsSeparator = '';
          break;

        case 'amount_without_trailing_zeros':
          decimalsString = decimalsString.replace(/0*$/, '');
          if (!decimalsString) {
            decimalsSeparator = '';
          }
          break;

        default:
          break;

      }

      const output1 = addSeparator(unitsString, separator) + decimalsSeparator + decimalsString;
      const output2 = theFormat.replace(formatPattern, output1);

      return output2;
    }
  };

window.moneyFormat = formatMoney;

// Usage:
// The price must be multiplied by 100. IE: 29.45 = 2945; 200 = 20000
// window.moneyFormat = ('${{ amount }} USD')(2350000);
// Returns = $23,500 USD
