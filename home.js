'use strict';

var React = require('react-native');
var MortgageCalculator = require('./files/mortgageCalc.js');
var ABSDCalculator = require('./files/absdCalc.js');
var AffordabilityCalculator = require('./files/affordabilityCalc');
var HousingPaymentCalculator = require('./files/housingPaymentCalc');
var InvestmentCalculator = require('./files/investmentCalc');
var CompoundInterestCalculator = require('./files/compoundInterestCalc');

var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	ListView,
	TouchableHighlight,
	Image,
	LinkingIOS
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
					source={require('./files/img/right.png')} />
				</View>
			</TouchableHighlight>
			);
	}
});

var ContactBox = React.createClass({
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
					source={require('./files/img/right.png')} />
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
					source={require('./files/img/moneysmart.jpg')} />
					</View>
						<View style={styles.section}>
						<Text style={styles.sectionHeading}>Calculators</Text>
						</View>
						<CalculatorBox title={calculatorsList[0].title} desc={calculatorsList[0].desc} key={0} onPress = {this.pushMortgage} image={<Image style={styles.calculatorIcon} source={require('./files/img/card.png')} />} />
						<CalculatorBox title={calculatorsList[1].title} desc={calculatorsList[1].desc} key={1} onPress = {this.pushAffordability} image={<Image style={styles.calculatorIcon} source={require('./files/img/weight-icon.png')} />} />
					
						<CalculatorBox title={calculatorsList[2].title} desc={calculatorsList[2].desc} key={2} onPress = {this.pushAbsd} image={<Image style={styles.calculatorIcon} source={require('./files/img/umbrella-icon.png')} />} />
						<CalculatorBox title={calculatorsList[3].title} desc={calculatorsList[3].desc} key={3} onPress = {this.pushCompoundInterest} image={<Image style={styles.calculatorIcon} source={require('./files/img/like-icon.png')} />} />
							
						<CalculatorBox title={calculatorsList[4].title} desc={calculatorsList[4].desc} key={4} onPress = {this.pushHousingPayment} image={<Image style={styles.calculatorIcon} source={require('./files/img/check-icon.png')} />} />
						<CalculatorBox title={calculatorsList[5].title} desc={calculatorsList[5].desc} key={5} onPress = {this.pushInvestment}  image={<Image style={styles.calculatorIcon} source={require('./files/img/card.png')} />} />

						<View style={styles.section}>
						<Text style={styles.sectionHeading}>Feedback</Text>
						</View>
						<CalculatorBox title={'MoneySmart.sg'} desc={'Visit our website to get the best deals on loans, insurance and credit cards. '} key={6} onPress={this.pressWebsite} image={<Image style={styles.calculatorIcon} source={require('./files/img/website.png')} />} />
						<CalculatorBox title={'Email'} desc={'Send us an email with your feedback'} key={7} onPress={this.pressFeedback} image={<Image style={styles.calculatorIcon} source={require('./files/img/email.png')} />} />
						
				</ScrollView>
			</View>
		);
	},
	pressWebsite: function() {
		return (
			LinkingIOS.openURL('http://www.moneysmart.sg/')
		);
	},
	pressFeedback: function() {
		return (
			LinkingIOS.openURL('mailto:admin@moneysmart.sg')
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
			title: 'Affordability Calculator',
			component: AffordabilityCalculator
		})
	},
	pushAbsd: function() {
		this.props.navigator.push({
			title: 'ABSD Calculator',
			component: ABSDCalculator
		})
	},
	pushCompoundInterest: function() {
		this.props.navigator.push({
			title: 'Compound Interest Calculator',
			component: CompoundInterestCalculator
		})
	},	
	pushHousingPayment: function() {
		this.props.navigator.push({
			title: 'Housing Payment Calculator',
			component: HousingPaymentCalculator
		})
	},
	pushInvestment: function() {
		this.props.navigator.push({
			title: 'Investment Calculator',
			component: InvestmentCalculator
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
	logoWrapper: {
		flex: 1
	},
	logo: {
		resizeMode: 'contain',
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
	sectionHeading: {
		fontSize: 18,
		flex:1,
		fontWeight: '300',
		color: 'gray',
		backgroundColor: '#f4f4f4',
		paddingLeft: 5
	},
	section: {
		
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