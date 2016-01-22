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

var HousingPaymentCalculator = React.createClass({
	getInitialState: function() {
		return {
			loanAmt: 300000,
			yearlyLoanInterest: 1.5,
			loanTerm: 30,
			annualPropertyTax: 100,
			annualPropertyInsurance: 100,

			monthlyPayment: 0,
			monthlyTaxAmt: 0,
			monthlyInsuranceCost: 0,
			totalMonthlyPayment: 0
		}
	},
	componentDidMount: function() {
		this.calculateHousingPayment();
	},
	render: function() {
		var sectionDesc = 'Use the calculator to calculate the monthly payment for your property.';
		return (
			<View style={css.styles.container}>
				<ScrollView>
					<View style={css.styles.sectionHeader} >
						<Image style={css.styles.sectionLogo} source={require('./img/check-icon.png')} />
						<Text style={css.styles.sectionDesc}>{sectionDesc}</ Text>
					</View>
					<View style={css.styles.headingWrapper}>
						<Text style={css.styles.heading}>CALCULATE HOUSING PAYMENT</Text>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Loan Amount</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(loanAmt) => this.setState({loanAmt: loanAmt})}
							 keyboardType='numeric'
							 placeholder = '300000'
							 value={this.state.loanAmt.toString()}
						/>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Yearly Interest Rate</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(yearlyLoanInterest) => this.setState({yearlyLoanInterest: yearlyLoanInterest})}
							 keyboardType='numeric'
							 placeholder = '1.5'
							 value={this.state.yearlyLoanInterest.toString()}
						/>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Loan Term (Years)</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(loanTerm) => this.setState({loanTerm: loanTerm})}
							 keyboardType='numeric'
							 placeholder = '30'
							 value={this.state.loanTerm.toString()}
						/>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Annual Property Tax</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(annualPropertyTax) => this.setState({annualPropertyTax: annualPropertyTax})}
							 keyboardType='numeric'
							 placeholder = '100'
							 value={this.state.annualPropertyTax.toString()}
						/>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Annual Property Insurance</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(annualPropertyInsurance) => this.setState({annualPropertyInsurance: annualPropertyInsurance})}
							 keyboardType='numeric'
							 placeholder = '100'
							 value={this.state.annualPropertyInsurance.toString()}
						/>
					</View>

					<View style={css.styles.submitWrapper}>
						<TouchableHighlight
							style={css.styles.calculateButton}
							underlayColor= '#f4f4f4' 
							onPress={this.calculateHousingPayment}>
							<Text style={css.styles.buttonLabel}>Calculate</Text>
						</TouchableHighlight>
					</View>

					<View>
						<View style={[css.styles.headingWrapper]}>
							<Text style={css.styles.heading}>RESULTS</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Monthly Payment</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.monthlyPayment)}</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Monthly Tax Amount</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.monthlyTaxAmt)}</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Monthly Insurance Cost</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.monthlyInsuranceCost)}</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Total Monthly Payment</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.totalMonthlyPayment)}</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	},
	calculateHousingPayment: function() {
		var loanAmt = this.state.loanAmt;
		var yearlyLoanInterest = this.state.yearlyLoanInterest;
		var loanTerm = this.state.loanTerm;
		var annualPropertyTax = this.state.annualPropertyTax;
		var annualPropertyInsurance = this.state.annualPropertyInsurance;

		var monthlyInterestRate = yearlyLoanInterest / 12 / 100;
		var numOfMonths = loanTerm * 12;
		var x = Math.pow((1 + monthlyInterestRate), numOfMonths);
		var monthlyPayment = (loanAmt * (monthlyInterestRate * x)) / (x - 1);

		var monthlyPrincipalWithInterest = monthlyPayment;
		var monthlyPropertyTax = annualPropertyTax / 12;
		var monthlyInsuranceCost = annualPropertyInsurance / 12;
		var totalMonthlyPayment = monthlyPrincipalWithInterest + monthlyPropertyTax + monthlyInsuranceCost;

		this.setState({
			monthlyPayment: monthlyPrincipalWithInterest.toFixed(2),
			monthlyTaxAmt: monthlyPropertyTax.toFixed(2),
			monthlyInsuranceCost: monthlyInsuranceCost.toFixed(2),
			totalMonthlyPayment: totalMonthlyPayment.toFixed(2)
		});
	}
});
module.exports = HousingPaymentCalculator;