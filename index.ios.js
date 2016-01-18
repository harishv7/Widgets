/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var HomePage = require('./home');
var MortgageCalculator = require('./mortgageCalc.js');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  ScrollView
} = React;

var routes = {
  home: HomePage,
  mortgageCalc: MortgageCalculator
};

var Widgets = React.createClass({
  renderScene: function(route, navigator) {
    var Component = routes[route.name];
    return <Component route={route} name={route.name} navigator={navigator} />;
  },
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
            title: 'MoneySmart Calculators',
            component: HomePage
        }} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  myPage: {
    flex: 1,
    backgroundColor: 'orange',
    paddingTop: 0
  }
});

AppRegistry.registerComponent('Widgets', () => Widgets);
