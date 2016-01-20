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

var MortgageCalculator = React.createClass({
	componentDidMount: function() {
		this.calculateMortgage();
	},	
	getInitialState: function() {
		return {
			propertyPrice: 1000000,
			interestRate: 1.2,
			marginOfFinance: 80,
			loanTerm: 35,

			loanAmt: 0,
			monthlyPayment: 0,
			numOfPayments: 0,
			totalPayments: 0,
			totalInterests: 0
		};
	},
	render: function() {
		var sectionDesc = 'Buying a house is a huge investment. Use the following calculator to estimate your monthly payments';
		return (
			<View style={css.styles.container}>
				<ScrollView>
				<View style={css.styles.sectionHeader} >
					<Image style={css.styles.sectionLogo} source={require('./img/card.png')} />
					<Text style={css.styles.sectionDesc}>{sectionDesc}</ Text>
					</View>
					<View style={css.styles.headingWrapper}>
					<Text style={css.styles.heading}>CALCULATE MORTGAGE PAYMENTS</Text>
					</View>
					<View style={css.styles.row}>
						<Text style={css.styles.inputLabel}>Property Price </Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(price) => this.setState({propertyPrice: price})}
							 keyboardType='numeric'
							 placeholder = '1000000'
							 value={this.state.propertyPrice.toString()}
						/>
					</View>
					<View style={css.styles.row}>
						<Text style={css.styles.inputLabel}>Margin of Finance </Text>
						<TextInput style={css.styles.input} 
						keyboardType='numeric'
						placeholder='80'
						onChangeText={(marginOfFinance) => this.setState({marginOfFinance})}
						value={this.state.marginOfFinance.toString()}
						/>
					</View>
					<View style={css.styles.row}>
						<Text style={css.styles.inputLabel}>Interest Rate </Text>
						<TextInput style={css.styles.input} 
						keyboardType='numeric'
						placeholder='1.2'
						onChangeText={(interestRate) => this.setState({interestRate})}
						value={this.state.interestRate.toString()}
						/>
					</View>
					<View style={css.styles.row}>
						<Text style={css.styles.inputLabel}>Loan Term (Years) </Text>
						<TextInput style={css.styles.input} 
						keyboardType='numeric'
						placeholder='35'
						onChangeText={(loanTerm) => this.setState({loanTerm})}
						value={this.state.loanTerm.toString()}
						/>
					</View>
					<View style={css.styles.submitWrapper}>
						<TouchableHighlight
							style={css.styles.calculateButton}
							underlayColor= '#f4f4f4' 
							onPress={this.calculateMortgage}>
							<Text style={css.styles.buttonLabel}>Calculate</Text>
						</TouchableHighlight>
					</View> 
				

				<View>
					<View style={css.styles.headingWrapper}>
						<Text style={css.styles.heading}>RESULTS</Text>
					</View>
					<View style={css.styles.row}>
						<Text style={css.styles.resultLabel}>Monthly Payment</Text>
						<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.monthlyPayment)}</Text>
					</View>
					<View style={css.styles.row}>
						<Text style={css.styles.resultLabel}>Loan Amount</Text>
						<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.loanAmt)}</Text>
					</View>
					<View style={css.styles.row}>
						<Text style={css.styles.resultLabel}>Number of Payments</Text>
						<Text style={css.styles.resultOutput}>{aux.numberWithCommas(this.state.numOfPayments)}</Text>
					</View>
					<View style={css.styles.row}>
						<Text style={css.styles.resultLabel}>Total Payments</Text>
						<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.totalPayments)}</Text>
					</View>
					<View style={css.styles.row}>
						<Text style={css.styles.resultLabel}>Total Interest</Text>
						<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.totalInterests)}</Text>
					</View>
				</View>

				</ScrollView>
			</View>
		);
	},
	calculateMortgage: function() {
		var propertyPrice = aux.cleanInput(this.state.propertyPrice.toString());
		var interestRate = aux.cleanInput(this.state.interestRate.toString());
		var loanTerm = aux.cleanInput(this.state.loanTerm.toString());
		var marginOfFinance = aux.cleanInput(this.state.marginOfFinance.toString());

		var loanTermMonths = loanTerm * 12;   // convert term from years to months
        var loanAmountFinanceable = parseInt(marginOfFinance) * propertyPrice / 100;
        var monthlyInterest = interestRate / 100 / 12;
        var x = Math.pow(1 + monthlyInterest, loanTermMonths),
        monthlyPayment = (loanAmountFinanceable * x * monthlyInterest) / (x - 1);

        var output_numOfPayments = loanTermMonths;
        var output_totalPayments = loanTermMonths * monthlyPayment;
        var output_totalInterests = output_totalPayments - loanAmountFinanceable;

        this.setState({
        	monthlyPayment: Math.round(monthlyPayment),
        	loanAmt: Math.round(loanAmountFinanceable),
            numOfPayments: output_numOfPayments,
            totalPayments: Math.round(output_totalPayments),
            totalInterests: Math.round(output_totalInterests)
        });

	}
});

module.exports = MortgageCalculator;