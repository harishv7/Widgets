var exports = module.exports = {};

var React = require('react-native');

var {
	AppRegistry,
	StyleSheet,
	Text,
	ScrollView,
	TextInput,
	TouchableHighlight,
	SliderIOS,
	View,
	Image
} = React;


{ /* Global Number Formatter Function */ }
exports.numberWithCommas = function(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}


{/* Global Function to clean input string of commas */}
exports.cleanInput = function(input) {
    input = input.replace(/,/g, "");
    return input;
}