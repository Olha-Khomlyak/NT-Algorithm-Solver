import React from 'react';
import { Text } from "react-native";
import { createMaterialTopTabNavigator, createAppContainer, createStackNavigator, createTabNavigator, tabBarOptions } from 'react-navigation';

import {
	HomeScreen,
	AlgorithmScreen,
	GCD,
	PrimeFactorization,
	Rooting,
	Exponentiation,
	ModularExponentiation,
	Logarithm,
	PrimeTest,
	LegendreSymbol,
	LCM,
	Euler,
	CRT,
	Euclid,
	Calculator,
} from '../screens';

const settingsNavigator = createStackNavigator({
	AlgorithmScreen,
	GCD,
	PrimeFactorization,
	Rooting,
	Exponentiation,
	ModularExponentiation,
	Logarithm,
	PrimeTest,
	LegendreSymbol,
	LCM,
	Euler,
	CRT,
	Euclid,
	
});

export default createAppContainer(settingsNavigator);

