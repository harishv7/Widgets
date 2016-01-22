'use strict';

var React = require('react-native');

// include auxillary components or methods
var aux = require('./generalComponents.js');
var css = require('./styles.js');

var {
	AppRegistry,
	StyleSheet,
	Text,
	ScrollView,
	TextInput,
	TouchableHighlight,
	SliderIOS,
	View,
	Image,
	PickerIOS
} = React;

var PickerItemIOS = PickerIOS.Item;

var citizenships = ['Singaporean', 'Permanent Resident', 'Foreigner', 'Non-Individual'];
var propertiesOwned = [{
	key: 'zero',
	value: 'zero',
	label: '0'
}, {
	key: 'one',
	value: 'one',
	label: '1'
}, {
	key: 'twoOrMore',
	value: 'twoOrMore',
	label: '2 or more'
}];

var absdCalc = React.createClass({
	getInitialState: function() {
		return {
			citizenship: "Permanent Resident",
			numOfProperties: "one",
			propertyPrice: 350000,

			absdRate: 0,
			absdAmt: 0
		};
	},

	componentDidMount: function() {
		this.calculateAbsd();
	},

	render: function() {
		var sectionDesc = 'Use the calculator to calculate how much Additional Buyer Stamp Duty you have to pay on your next property purchase.';
	return (
	<View style={css.styles.container}>
		<ScrollView>
			<View style={css.styles.sectionHeader} >
				<Image style={css.styles.sectionLogo} source={require('./img/weight-icon.png')} />
				<Text style={css.styles.sectionDesc}>{sectionDesc}</ Text>
			</View>
			<View style={css.styles.headingWrapper}>
				<Text style={css.styles.heading}>CALCULATE ABSD</Text>
			</View>

			<View style={css.styles.row} >
				<Text style={css.styles.inputLabel}>Property Price </Text>
				<TextInput style={css.styles.input} 
					 onChangeText={(price) => this.setState({propertyPrice: price})}
					 keyboardType='numeric'
					 placeholder = '350000'
					 value={this.state.propertyPrice.toString()}
				/>
			</View>

			<View style={css.styles.pickerSectionColumn}>
				<View style={css.styles.pickerWrapper}>
				<Text style={css.styles.inputLabel}>Citizenship</Text>
					<PickerIOS
					selectedValue={this.state.citizenship}
					onValueChange={(citizenship) => this.setState({citizenship: citizenship})}>
					{citizenships.map(function(citizenship) {
						return (
						<PickerItemIOS
							key={citizenship}
							value={citizenship}
							label={citizenship} /> 
							);
					})}
					</PickerIOS>
				</View>

				<View style={[css.styles.pickerWrapper, css.styles.addPaddingTop]}>
				<Text style={css.styles.inputLabel}>Properties Currently Owned</Text>
					<PickerIOS
					selectedValue={this.state.numOfProperties}
					onValueChange={(num) => this.setState({numOfProperties: num})}>
					{propertiesOwned.map(function (option) {
						return (
							<PickerItemIOS
								key={option.key}
								value={option.value}
								label={option.label} />
						);
					})}
					
					</PickerIOS>
				</View>

				<View style={css.styles.submitWrapper}>
						<TouchableHighlight
							style={css.styles.calculateButton}
							underlayColor= '#f4f4f4' 
							onPress={this.calculateAbsd}>
							<Text style={css.styles.buttonLabel}>Calculate</Text>
						</TouchableHighlight>
					</View> 
			</View>

			<View style={css.styles.addMarginBottom}>
				<View style={[css.styles.headingWrapper, css.styles.addPaddingTop]}>
					<Text style={css.styles.heading}>RESULTS</Text>
				</View>
				<View style={css.styles.row}>
					<Text style={css.styles.resultLabel}>ABSD Rate</Text>
					<Text style={css.styles.resultOutput}>{aux.numberWithCommas(this.state.absdRate) + '%'}</Text>
				</View>
				<View style={css.styles.row}>
					<Text style={css.styles.resultLabel}>ABSD Amount</Text>
					<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.absdAmt)}</Text>
				</View>
			</View>

		</ScrollView>
	</View>
	);
},
calculateAbsd: function() {
	var citizenship = this.state.citizenship;
	var propertiesCurrentlyOwned = this.state.numOfProperties;
	var propertyPrice = this.state.propertyPrice;
	var ABSDRate = 0;

	if (citizenship == "Singaporean") {
        if (propertiesCurrentlyOwned == "one") {
            ABSDRate = 7;
        } else if (propertiesCurrentlyOwned == "twoOrMore") {
            ABSDRate = 10;
        }
    } else if (citizenship == "Permanent Resident") {
        if (propertiesCurrentlyOwned == "zero") {
            ABSDRate = 5;
        } else if (propertiesCurrentlyOwned == "one") {
            ABSDRate = 10;
        } else if (propertiesCurrentlyOwned == "twoOrMore") {
            ABSDRate = 10;
        }
    } else if (citizenship == "Foreigner" || citizenship == "Non-Individual") {
        ABSDRate = 15;
    }

    var ABSDAmount = ABSDRate * propertyPrice / 100;

    this.setState({
    	absdRate: ABSDRate,
    	absdAmt: ABSDAmount
    });
}
});

module.exports = absdCalc;