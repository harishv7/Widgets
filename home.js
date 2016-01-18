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
	title: 'Mortgage Calculator',
	desc: 'Calculate your mortgage payments with this calculator'
}, {
	title: 'Affordability Calculator',
	desc: 'Calculator your loan affordability and find the maximum loan you can get'
}, {
	title: 'ABSD Calculator',
	desc: 'Calculate Additional Buyer Stamp Duty on your property purchase'
}, {
	title: 'Compound Interest Calculator',
	desc: 'Calculate compound interest with inflation accounted for'
}, {
	title: 'Housing Payment Calculator',
	desc: 'Calculate monthly payment for your property'
}, {
	title: 'Investment Calculator',
	desc: 'Calculate expected monthly revenue and breakdown of your property investment'
}
];

var CalculatorBox = React.createClass({
	render: function() {
		return (
			<TouchableHighlight
				underlayColor = 'gray'
				onPress={this.props.onPress} >
				<View style={styles.calculatorBox}>
					{this.props.image}					
					<View style={styles.calculatorBoxColumn}>
						<Text style={styles.calculatorTitle}>{this.props.title}</Text>
						<Text style={styles.calculatorDescription}>{this.props.desc}</Text>
					</View>
					<Image style={styles.rightButton}
					source={require('./img/right.png')} />
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
					
						<CalculatorBox title={calculatorsList[0].title} desc={calculatorsList[0].desc} key={0} onPress = {this.pushMortgage} image={<Image style={styles.calculatorIcon} source={require('./img/card.png')} />} />
						<CalculatorBox title={calculatorsList[1].title} desc={calculatorsList[1].desc} key={1} onPress = {this.pushAffordability} image={<Image style={styles.calculatorIcon} source={require('./img/weight-icon.png')} />} />
					

					
						<CalculatorBox title={calculatorsList[2].title} desc={calculatorsList[2].desc} key={2} onPress = {this.pushAbsd} image={<Image style={styles.calculatorIcon} source={require('./img/umbrella-icon.png')} />} />
						<CalculatorBox title={calculatorsList[3].title} desc={calculatorsList[3].desc} key={3} onPress = {this.pushCompoundInterest} image={<Image style={styles.calculatorIcon} source={require('./img/like-icon.png')} />} />
					

					
						<CalculatorBox title={calculatorsList[4].title} desc={calculatorsList[4].desc} key={4} onPress = {this.pushHousingPayment} image={<Image style={styles.calculatorIcon} source={require('./img/check-icon.png')} />} />
						<CalculatorBox title={calculatorsList[5].title} desc={calculatorsList[5].desc} key={5} onPress = {this.pushInvestment}  image={<Image style={styles.calculatorIcon} source={require('./img/card.png')} />} />
						
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
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		margin: 10,
		borderRadius: 10,
		flex: 1
	},
	calculatorBox: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderTopWidth: 0.5,
		borderBottomWidth: 0.5,
		borderColor: '#DBDDDE',
		padding: 10,
		backgroundColor: 'white',
		flexDirection: 'row'
	},
	rightButton: {
		flex: 1,
		width: 20,
		height: 20,
		justifyContent: 'space-around',
		alignItems: 'center',
		resizeMode: 'contain'
	},
	calculatorBoxColumn: {
		flex: 5,
		flexDirection: 'column',
		paddingLeft: 7
	},
	calculatorTitle: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: 'transparent',
		padding: 5
	},
	calculatorDescription: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: 'transparent',
		padding: 5,
		color: 'gray',
		fontSize: 12
	},
	calculatorIcon: {
		flex: 1,
		resizeMode: 'contain',
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
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