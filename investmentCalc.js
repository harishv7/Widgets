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

var InvestmentCalculator = React.createClass({
	getInitialState: function() {
		return {
			propertyPrice: 300000,
			downPayment: 20,
			yearlyLoanInterest: 1.5,
			annualPropertyTax: 100,
			monthlyPropertyMaintenanceCost: 200,
			expectedMonthlyRentalIncome: 2000,

			expectedMonthlyRevenue: 0,
			downPaymentAmt: 0,
			stampDuty: 0,
			totalCashOutlay: 0,
			expectedYearlyRevenue: 0,
			annualPropertyYield: 0,
			roic: 0
		};
	},
	render: function() {
		var sectionDesc = 'Use the calculator to calculate your return from investments.';
		return (
			<View style={css.styles.container}>
				<ScrollView>
					<View style={css.styles.sectionHeader} >
						<Image style={css.styles.sectionLogo} source={require('./img/card.png')} />
						<Text style={css.styles.sectionDesc}>{sectionDesc}</ Text>
					</View>
					<View style={css.styles.headingWrapper}>
						<Text style={css.styles.heading}>CALCULATE YOUR INVESTMENTS</Text>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Property Price</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(propertyPrice) => this.setState({propertyPrice: propertyPrice})}
							 keyboardType='numeric'
							 placeholder = '300000'
							 value={this.state.propertyPrice.toString()}
						/>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Down Payment</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(downPayment) => this.setState({downPayment: downPayment})}
							 keyboardType='numeric'
							 placeholder = '20'
							 value={this.state.downPayment.toString()}
						/>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Yearly Loan Interest Rate</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(yearlyLoanInterest) => this.setState({yearlyLoanInterest: yearlyLoanInterest})}
							 keyboardType='numeric'
							 placeholder = '1.5'
							 value={this.state.yearlyLoanInterest.toString()}
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
						<Text style={css.styles.inputLabel}>Monthly Property Maintenance Cost</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(monthlyPropertyMaintenanceCost) => this.setState({monthlyPropertyMaintenanceCost: monthlyPropertyMaintenanceCost})}
							 keyboardType='numeric'
							 placeholder = '200'
							 value={this.state.monthlyPropertyMaintenanceCost.toString()}
						/>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Expected Monthly Rental Income</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(expectedMonthlyRentalIncome) => this.setState({expectedMonthlyRentalIncome: expectedMonthlyRentalIncome})}
							 keyboardType='numeric'
							 placeholder = '2000'
							 value={this.state.expectedMonthlyRentalIncome.toString()}
						/>
					</View>

					<View style={css.styles.submitWrapper}>
						<TouchableHighlight
							style={css.styles.calculateButton}
							underlayColor= '#f4f4f4' 
							onPress={this.calculateInvestment}>
							<Text style={css.styles.buttonLabel}>Calculate</Text>
						</TouchableHighlight>
					</View>

					<View>
						<View style={[css.styles.headingWrapper]}>
							<Text style={css.styles.heading}>RESULTS</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Expected Monthly Revenue</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.expectedMonthlyRevenue)}</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Down Payment Amount</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.downPaymentAmt)}</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Stamp Duty</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.stampDuty)}</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Total Cash Outlay</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.totalCashOutlay)}</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Expected Yearly Revenue</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.expectedYearlyRevenue)}</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Annual Property Yield</Text>
							<Text style={css.styles.resultOutput}>{aux.numberWithCommas(this.state.annualPropertyYield) + '%'}</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Annual Returns On Invested Capital (ROIC)</Text>
							<Text style={css.styles.resultOutput}>{aux.numberWithCommas(this.state.roic) + '%'}</Text>
						</View>
					</View>

				</ScrollView>
			</View>
		);
	},
	calculateInvestment: function() {
		var propertyPrice = this.state.propertyPrice;
		var downPaymentRate = this.state.downPayment;
		var yearlyLoanInterest = this.state.yearlyLoanInterest;
		var annualPropertyTax = this.state.annualPropertyTax;
		var monthlyPropertyMaintenanceCost = this.state.monthlyPropertyMaintenanceCost;
		var expectedMonthlyRentalIncome = this.state.expectedMonthlyRentalIncome;

		var downPaymentAmount = downPaymentRate * propertyPrice / 100;

		var stampDuty = 0;
		if (propertyPrice > 180000) {
		    stampDuty = (0.01 * 180000);
		    if(propertyPrice > (180000 + 180000)) {
		        stampDuty += (0.02 * 180000) + (0.03 * (propertyPrice - 180000 - 180000));
		    } else {
		        stampDuty += (0.02 * (propertyPrice - 180000));
		    }
		} else {
		    stampDuty = 0.01 * propertyPrice;
		}

		var totalCashOutlay = downPaymentAmount + stampDuty;

		var expectedYearlyRevenue = ((expectedMonthlyRentalIncome - monthlyPropertyMaintenanceCost) * 12) - annualPropertyTax - ((yearlyLoanInterest / 100) * (propertyPrice - downPaymentAmount));
		
		var expectedMonthlyRevenue = expectedYearlyRevenue / 12;

		var annualPropertyYield = (expectedMonthlyRentalIncome * 12) / propertyPrice * 100;

		var annualROIC = expectedYearlyRevenue / totalCashOutlay * 100;

		this.setState({
			downPaymentAmt: Math.round(downPaymentAmount),
			stampDuty: Math.round(stampDuty),
			totalCashOutlay: Math.round(totalCashOutlay),
			expectedYearlyRevenue: Math.round(expectedYearlyRevenue),
			expectedMonthlyRevenue: Math.round(expectedMonthlyRevenue),
			annualPropertyYield: Math.round(annualPropertyYield),
			roic: Math.round(annualROIC)
		});
	}
});
module.exports = InvestmentCalculator;