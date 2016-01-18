'use strict';

var React = require('react-native');
var MortgageCalculator = require('./mortgageCalc.js');

var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	ListView,
	TouchableHighlight,
	Image
} = React;

var  calculatorsList = [
{
	title: 'Mortgage Calculator'
}, {
	title: 'Affordability Calculator'
}, {
	title: 'ABSD Calculator'
}, {
	title: 'Compound Interest Calculator'
}, {
	title: 'Housing Payment Calculator'
}, {
	title: 'Investment Calculator'
}
];

var CalculatorBox = React.createClass({
	render: function() {
		return (
			<TouchableHighlight
				underlayColor = '#f2f2f2'
				onPress={this.props.onPress} >
			<View style={styles.calculatorBox}>
			<Image style={styles.calculatorIcon}
			source={require('./img/icon-building.png')} />
			<Text style={styles.calculatorTitle}>{this.props.title}</Text>
			</View>
			</TouchableHighlight>
			);
	}
});

var HomePage = React.createClass({
	render: function() {
		return (
			<View style={styles.wrapper}>
				<ScrollView>
					<View style={styles.logoWrapper} >
					<Image style={styles.logo}
					source={require('./img/moneysmart.jpg')} />
					</View>
					<View style={styles.row}>
						<CalculatorBox title={calculatorsList[0].title} key={0} onPress = {this.pushMortgage} />
						<CalculatorBox title={calculatorsList[1].title} key={1} onPress = {this.pushAffordability} />
					</View>

					<View style={styles.row}>
						<CalculatorBox title={calculatorsList[2].title} key={2} onPress = {this.pushAbsd} />
						<CalculatorBox title={calculatorsList[3].title} key={3} onPress = {this.pushCompoundInterest} />
					</View>

					<View style={styles.row}>
						<CalculatorBox title={calculatorsList[4].title} key={4} onPress = {this.pushHousingPayment} />
						<CalculatorBox title={calculatorsList[5].title} key={5} onPress = {this.pushInvestment} />
					</View>
				</ScrollView>
			</View>
		);
	},
	pushMortgage: function() {
		this.props.navigator.push({
			title: 'Mortgage Calculator',
			component: MortgageCalculator
		})
	},
	pushAffordability: function() {
		this.props.navigator.push({
			title: 'Mortgage Calculator',
			component: MortgageCalculator
		})
	},
	pushAbsd: function() {
		this.props.navigator.push({
			title: 'Mortgage Calculator',
			component: MortgageCalculator
		})
	},
	pushCompoundInterest: function() {
		this.props.navigator.push({
			title: 'Mortgage Calculator',
			component: MortgageCalculator
		})
	},	
	pushHousingPayment: function() {
		this.props.navigator.push({
			title: 'Mortgage Calculator',
			component: MortgageCalculator
		})
	},
	pushInvestment: function() {
		this.props.navigator.push({
			title: 'Mortgage Calculator',
			component: MortgageCalculator
		})
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#5151f4',
		padding: 10
	},
	logo: {
		resizeMode: 'contain',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10
	},
	calculatorBox: {
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0.5,
		borderRadius: 10,
		borderColor: '#3498db',
		padding: 10,
		height: 150,
		width: 150
	},
	calculatorTitle: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
		padding: 5,
		flex: 1,
		textAlign: 'center'
	},
	calculatorIcon: {
		flex: 3
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		flex: 1,
		padding: 10
	},
	wrapper: {
		flex: 1,
		paddingTop: 5
	},
	button: {
		height: 36,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#123456',
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 18,
		color:"#fff",
		marginTop:6
	}
});

module.exports = HomePage;