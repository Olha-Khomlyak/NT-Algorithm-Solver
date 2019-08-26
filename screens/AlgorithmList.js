import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Avatar } from "react-native-elements";
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { withNavigation } from 'react-navigation';

export class Algorithms extends React.Component {
	
  
	render() {

		const list = [
			{
				title: 'Prime Factorization',
				screen: 'PrimeFactorization',
				image: require('../logos/prime-factor.png')
			},
			{
				title: 'Greatest Common Divisor',
				screen: 'GCD',
				image: require('../logos/gcd.png')
			},
			{
				title: 'Least Common Multiple',
				screen: 'LCM',
				image: require('../logos/LCM.png')

			},
			{
				title: 'Rooting',
				screen: 'Rooting',
				image: require('../logos/rooting.png')
			},
			{
				title: 'Exponentiation',
				screen: 'Exponentiation',
				image: require('../logos/expo.png')
			},
			{
				title: 'Modular Exponentiation',
				screen: 'ModularExponentiation',
				image: require('../logos/mod-expo.png')
			},
			{
				title: 'Logarithm',
				screen: 'Logarithm',
				image: require('../logos/log.png')
			},
			{
				title: 'Prime Test',
				screen: 'PrimeTest',
				image: require('../logos/prime-test.png')

			},
			{
				title:"Euler's Totient Function",
				screen: 'Euler',
				image: require('../logos/euler.png')
			},
			{
				title:'Chinese Remainder Theorem',
				screen:'CRT',
				image:require('../logos/crt.png')
			},
			{
				title:'Extended Euclidean Algorithm',
				screen:'Euclid',
				image:require('../logos/eea.png')
			},
		]
		return (
			<ScrollView contentContainerStyle={{paddingBottom:50}}>
				{
					list.map((item, i) => (
						<ListItem
							key={i}
							title={item.title}
							titleStyle={{fontFamily:'verdana', fontWeight:"normal" }}
							subtitle={item.subtitle}
							leftAvatar={{ source: item.image }}
							onPress={() => this.props.navigation.navigate(item.screen, {title:item.title} )}
						/>
					))
				}
			</ScrollView >
		)
	}
}

