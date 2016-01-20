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
	Image
} = React;

var AffordabilityCalculator = React.createClass({
	getInitialState: function() {
		return {
			monthlyBudget: 2000,
			loanTenure: 30,
			interestRate: 3.5,

			maxLoan: 0,
			maxPurchasePrice: 0

		}
	},
	componentDidMount: function() {
		this.calculateAffordability();
	},
	render: function() {
		var sectionDesc = 'Use the calculator to calculate how much loan you can obtain for your next property purchase.';
		return (
			<View style={css.styles.container}>
				<ScrollView>
					<View style={css.styles.sectionHeader} >
						<Image style={css.styles.sectionLogo} source={require('./img/weight-icon.png')} />
						<Text style={css.styles.sectionDesc}>{sectionDesc}</ Text>
					</View>
					<View style={css.styles.headingWrapper}>
						<Text style={css.styles.heading}>CALCULATE LOAN AFFORDABILITY</Text>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Monthly Budget</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(monthlyBudget) => this.setState({monthlyBudget: monthlyBudget})}
							 keyboardType='numeric'
							 placeholder = '2000'
							 value={this.state.monthlyBudget.toString()}
						/>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Loan Tenure (Years) </Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(loanTenure) => this.setState({loanTenure: loanTenure})}
							 keyboardType='numeric'
							 placeholder = '30'
							 value={this.state.loanTenure.toString()}
						/>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Interest Rate </Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(interestRate) => this.setState({interestRate: interestRate})}
							 keyboardType='numeric'
							 placeholder = '3.5'
							 value={this.state.interestRate.toString()}
						/>
					</View>

					<View style={css.styles.submitWrapper}>
						<TouchableHighlight
							style={css.styles.calculateButton}
							underlayColor= '#f4f4f4' 
							onPress={this.calculateAffordability}>
							<Text style={css.styles.buttonLabel}>Calculate</Text>
						</TouchableHighlight>
					</View>

					<View>
						<View style={[css.styles.headingWrapper]}>
							<Text style={css.styles.heading}>RESULTS</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Maximum Loan</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.maxLoan)}</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Maximum Purchase Price</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.maxPurchasePrice)}</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	},
	calculateAffordability: function() {
		var monthlyBudget = this.state.monthlyBudget;
		var loanTenure = this.state.loanTenure;
		var interestRate = this.state.interestRate;

		var monthlyInterestRate = interestRate / 100 / 12;
        var numOfMonths = loanTenure * 12;
        var x = Math.pow((1 + monthlyInterestRate), numOfMonths);

        var maxLoan = (monthlyBudget * (x - 1)) / (x * monthlyInterestRate);
        var maxPurchasePrice = maxLoan / 80 * 100;

        this.setState({
            maxLoan: Math.round(maxLoan),
            maxPurchasePrice: Math.round(maxPurchasePrice)
        });
	}
});
module.exports = AffordabilityCalculator;