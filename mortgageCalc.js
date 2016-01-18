'use strict';

var React = require('react-native');
var Form = require('react-native-form');

var {
	AppRegistry,
	StyleSheet,
	Text,
	ScrollView,
	TextInput,
	TouchableHighlight,
	SliderIOS,
	View
} = React;

{ /* Global Number Formatter Function */ }
function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

{/* Global Function to clean input string of commas */}
function cleanInput(input) {
    input = input.replace(/,/g, "");
    return input;
}

var SliderExample = React.createClass({
  getInitialState() {
    return {
      value: 0,
    };
  },

  render() {
    return (
      <View>
        <Text style={styles.text} >
          {this.state.value}
        </Text>
        <SliderIOS
          {...this.props}
          onValueChange={(value) => this.setState({value: value})} />
      </View>
    );
  }
});


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
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.headingWrapper}>
					<Text style={styles.heading}>CALCULATE MORTGAGE PAYMENTS</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.inputLabel}>Property Price </Text>
						<TextInput style={styles.input} 
							 onChangeText={(price) => this.setState({propertyPrice: price})}
							 keyboardType='numeric'
							 placeholder = '1000000'
							 value={this.state.propertyPrice.toString()}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.inputLabel}>Margin of Finance </Text>
						<TextInput style={styles.input} 
						keyboardType='numeric'
						placeholder='80'
						onChangeText={(marginOfFinance) => this.setState({marginOfFinance})}
						value={this.state.marginOfFinance.toString()}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.inputLabel}>Interest Rate </Text>
						<TextInput style={styles.input} 
						keyboardType='numeric'
						placeholder='1.2'
						onChangeText={(interestRate) => this.setState({interestRate})}
						value={this.state.interestRate.toString()}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.inputLabel}>Loan Term (Years) </Text>
						<TextInput style={styles.input} 
						keyboardType='numeric'
						placeholder='35'
						onChangeText={(loanTerm) => this.setState({loanTerm})}
						value={this.state.loanTerm.toString()}
						/>
					</View>
					<View style={styles.submitWrapper}>
						<TouchableHighlight
							style={styles.calculateButton}
							underlayColor= '#f4f4f4' 
							onPress={this.calculateMortgage}>
							<Text style={styles.buttonLabel}>Calculate</Text>
						</TouchableHighlight>
					</View> 
				

				<View>
					<View style={styles.headingWrapper}>
						<Text style={styles.heading}>RESULTS</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.resultLabel}>Monthly Payment</Text>
						<Text style={styles.resultOutput}>{'$' + numberWithCommas(this.state.monthlyPayment)}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.resultLabel}>Loan Amount</Text>
						<Text style={styles.resultOutput}>{'$' + numberWithCommas(this.state.loanAmt)}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.resultLabel}>Number of Payments</Text>
						<Text style={styles.resultOutput}>{numberWithCommas(this.state.numOfPayments)}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.resultLabel}>Total Payments</Text>
						<Text style={styles.resultOutput}>{'$' + numberWithCommas(this.state.totalPayments)}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.resultLabel}>Total Interest</Text>
						<Text style={styles.resultOutput}>{'$' + numberWithCommas(this.state.totalInterests)}</Text>
					</View>
				</View>

				</ScrollView>
			</View>
		);
	},
	calculateMortgage: function() {
		var propertyPrice = cleanInput(this.state.propertyPrice.toString());
		var interestRate = cleanInput(this.state.interestRate.toString());
		var loanTerm = cleanInput(this.state.loanTerm.toString());
		var marginOfFinance = cleanInput(this.state.marginOfFinance.toString());

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

var styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		backgroundColor: 'white'
	},
	headingWrapper: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		flex: 1
	},
	heading: {
		fontSize: 12,
		padding: 10,
		color: '#8E8E93'
	},
	column: {
		flexDirection: 'column',
		padding: 10,
		borderBottomWidth: 1,
		justifyContent: 'space-around',
		alignItems: 'flex-start'
	},
	row: {
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		borderBottomWidth: 1,
		flex: 1,
		borderColor: '#f2f2f2',
		backgroundColor: 'white'
	},
	inputLabel: {
		flex: 1.5
	},
	input: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 14,
		backgroundColor: 'white'
	},
	slider: {
		height: 10,
		margin: 10
	},
	resultLabel: {
		flex: 1.5,
		fontSize: 14
	},
	resultOutput: {
		flex: 1,
		color: '007AFF',
		fontSize: 14,
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	submitWrapper: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonLabel: {
		fontSize: 16,
		color: '007AFF',
		paddingTop: 15
	}
});

module.exports = MortgageCalculator;