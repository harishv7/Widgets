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
	PickerIOS,
	Image
} = React;

var PickerItemIOS = PickerIOS.Item;

var CompoundInterestCalculator = React.createClass({
	getInitialState: function() {
		return {
			startingPrincipal: 5000,
			annualInterestRate: 5,
			annualAddition: 100,
			period: 2,
			compoundInterval: 'Yearly',
			inflationRate: 3,

			futureValue: 0,
			afterInflationAdj: 0,
			totalPrincipal: 0,
			totalInterest: 0
		};
	},
	componentDidMount: function() {
		this.calculateCompoundInterest();
	},
	render: function() {
		var sectionDesc = 'Use the calculator to calculate your return from compound interests.';
		var compoundIntervals = ['Daily', "Monthly", "Quarterly", "Half-Yearly", 'Yearly'];
		return (
			<View style={css.styles.container}>
				<ScrollView>
					<View style={css.styles.sectionHeader} >
						<Image style={css.styles.sectionLogo} source={require('./img/like-icon.png')} />
						<Text style={css.styles.sectionDesc}>{sectionDesc}</ Text>
					</View>
					<View style={css.styles.headingWrapper}>
						<Text style={css.styles.heading}>CALCULATE COMPOUND INTEREST</Text>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Starting Principal</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(startingPrincipal) => this.setState({startingPrincipal: startingPrincipal})}
							 keyboardType='numeric'
							 placeholder = '5000'
							 value={this.state.startingPrincipal.toString()}
						/>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Annual Interest Rate</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(annualInterestRate) => this.setState({annualInterestRate: annualInterestRate})}
							 keyboardType='numeric'
							 placeholder = '5'
							 value={this.state.annualInterestRate.toString()}
						/>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Annual Addition</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(annualAddition) => this.setState({annualAddition: annualAddition})}
							 keyboardType='numeric'
							 placeholder = '100'
							 value={this.state.annualAddition.toString()}
						/>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Period (Years)</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(period) => this.setState({period: period})}
							 keyboardType='numeric'
							 placeholder = '2'
							 value={this.state.period.toString()}
						/>
					</View>


					<View style={css.styles.pickerSectionColumn}>
						<View style={css.styles.pickerWrapper}>
						<Text style={css.styles.inputLabel}>Compound Interval</Text>
							<PickerIOS
							selectedValue={this.state.compoundInterval}
							onValueChange={(compoundInterval) => this.setState({compoundInterval: compoundInterval})}>
							{compoundIntervals.map(function(interval) {
								return (
								<PickerItemIOS
									key={interval}
									value={interval}
									label={interval} /> 
								);
							})}
							</PickerIOS>
						</View>
					</View>

					<View style={css.styles.row} >
						<Text style={css.styles.inputLabel}>Inflation Rate (%)</Text>
						<TextInput style={css.styles.input} 
							 onChangeText={(inflationRate) => this.setState({inflationRate: inflationRate})}
							 keyboardType='numeric'
							 placeholder = '3'
							 value={this.state.inflationRate.toString()}
						/>
					</View>

					<TouchableHighlight
							style={css.styles.calculateButton}
							underlayColor= '#f4f4f4' 
							onPress={this.calculateCompoundInterest}>
					<View style={css.styles.submitWrapper}>
						
							<Text style={css.styles.buttonLabel}>Calculate</Text>
						
					</View>
					</TouchableHighlight>

					<View>
						<View style={[css.styles.headingWrapper]}>
							<Text style={css.styles.heading}>RESULTS</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Future Value</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.futureValue)}</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>After Inflation Adjustment</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.afterInflationAdj)}</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Total Principal</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.totalPrincipal)}</Text>
						</View>
						<View style={css.styles.row}>
							<Text style={css.styles.resultLabel}>Total Interest</Text>
							<Text style={css.styles.resultOutput}>{'$' + aux.numberWithCommas(this.state.totalInterest)}</Text>
						</View>
					</View>

				</ScrollView>
			</View>
		);
	},
	calculateCompoundInterest: function() {
		var startingPrincipal = this.state.startingPrincipal;
		var annualInterestRate = this.state.annualInterestRate;
		var annualAddition = this.state.annualAddition;
		var period = this.state.period;
		var compoundInterval = this.state.compoundInterval;
		var inflationRate = this.state.inflationRate;

		var numOfCompoundingPerYear = {'Daily':365,'Monthly':12,'Quarterly':4,'Half-Yearly':2,'Yearly':1};
		var numOfCompounding = numOfCompoundingPerYear[compoundInterval];
		console.log(numOfCompounding * 1);

		var nt = numOfCompounding * period;
		var startNoInflation = parseFloat(startingPrincipal);
		var startInflation = parseFloat(startingPrincipal);
		var fvInflation = startNoInflation;
		var fvNoInflation = startNoInflation;
		console.log(typeof(startNoInflation) + ' ' + typeof(fvInflation));
		var keepCountInflation=0;
		var keepCountNoInflation=0;
		var totalPrincipal = startNoInflation;
		inflationRate = parseFloat(inflationRate);
		annualAddition = parseFloat(annualAddition);

		{/* COMPUTE WITHOUT INFLATION */}
		for(var j = 0; j < nt; j++) {
		    fvNoInflation = startNoInflation * (1 + (annualInterestRate / 100 / numOfCompounding));
		    keepCountNoInflation++;   

		    switch(compoundInterval) {
		        case "Daily":
		        if(keepCountNoInflation == 365) {
		            fvNoInflation += annualAddition;
		            keepCountNoInflation = 0;
		        }
		        break;
		        case "Monthly":
		        if(keepCountNoInflation == 12) {
		            fvNoInflation += annualAddition;
		            keepCountNoInflation = 0;
		        }
		        break;
		        case "Quarterly":
		        if(keepCountNoInflation == 4) {
		            fvNoInflation += annualAddition;
		            keepCountNoInflation = 0;
		        }
		        break;
		        case "Half-Yearly":
		        if(keepCountNoInflation == 2) {
		            fvNoInflation += annualAddition;
		            keepCountNoInflation = 0;
		        }
		        break;
		        case "Yearly":
		        fvNoInflation += annualAddition;
		        break;
		        default:
		        break;
		    }
		    startNoInflation = fvNoInflation;
		    console.log(fvNoInflation);
		}

		{/* COMPUTE WITH INFLATION */}
		for(var i = 0; i < nt; i++) {
		    fvInflation = startInflation * (1 + (annualInterestRate / 100 / numOfCompounding));
		    keepCountInflation++;
		    
		    switch(compoundInterval) {
		        case "Daily":
		        if(keepCountInflation == 365) {
		            fvInflation += annualAddition;
		            fvInflation = ((fvInflation / (inflationRate + 100)) * 100);
		            totalPrincipal += annualAddition;
		            keepCountInflation = 0;
		        }
		        break;
		        case "Monthly":
		        if(keepCountInflation == 12) {
		            fvInflation += annualAddition;
		            fvInflation = ((fvInflation / (inflationRate + 100)) * 100);
		            totalPrincipal += annualAddition;
		            keepCountInflation = 0;
		        }
		        break;
		        case "Quarterly":
		        if(keepCountInflation == 4) {
		            fvInflation += annualAddition;
		            fvInflation = ((fvInflation / (inflationRate + 100)) * 100); 
		            totalPrincipal += annualAddition;
		            keepCountInflation = 0;
		        }
		        break;
		        case "Half-Yearly":
		        if(keepCountInflation == 2) {
		            fvInflation += annualAddition;
		            fvInflation = ((fvInflation / (inflationRate + 100)) * 100);    
		            totalPrincipal += annualAddition;
		            keepCountInflation = 0;
		        }
		        break;
		        case "Yearly":
		        fvInflation += annualAddition;
		        fvInflation = ((fvInflation / (inflationRate + 100)) * 100); 
		        totalPrincipal += annualAddition;
		        break;
		        default:
		        break;
		    }
		    startInflation = fvInflation;

		    this.setState({
		    	futureValue: Math.round(fvNoInflation),
		    	afterInflationAdj: Math.round(fvInflation),
		    	totalPrincipal: Math.round(totalPrincipal),
		    	totalInterest: Math.round(fvNoInflation - totalPrincipal)
		    });
	}
}
});
module.exports = CompoundInterestCalculator;