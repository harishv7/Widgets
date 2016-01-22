var React = require('react-native');

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

var exports = module.exports = {};
exports.styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		backgroundColor: 'white'
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		flex: 1,
		padding: 10
	},
	sectionLogo: {
		flex: 1,
		resizeMode: 'contain',
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	sectionDesc: {
		flex: 3,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: 'transparent',
		padding: 5,
		color: 'gray',
		fontSize: 16,
		flexWrap: 'wrap',
		textAlign: 'left'
	},
	headingWrapper: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		flex: 1
	},
	heading: {
		fontSize: 14,
		fontWeight: 'bold',
		padding: 10,
		color: '#8E8E93'
	},
	column: {
		flexDirection: 'column',
		padding: 10,
		borderBottomWidth: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		borderColor: '#f2f2f2',
		backgroundColor: 'white'
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
		flex: 1.5,
		padding: 7
	},
	pickerWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
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
		alignItems: 'flex-end',
		padding: 7
	},
	submitWrapper: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonLabel: {
		fontSize: 16,
		color: '007AFF',
		paddingTop: 15
	},
	pickerSectionColumn: {
		flexDirection: 'column',
		padding: 10,
		borderBottomWidth: 1,
		borderColor: '#f2f2f2',
		flex: 1
	},
	addPaddingTop: {
		paddingTop: 10
	},
	addMarginBottom: {
		marginBottom: 10
	},
	pickerWrapper: {
		flex: 1,
		borderBottomWidth: 1,
		borderColor: '#f2f2f2'
	}
});