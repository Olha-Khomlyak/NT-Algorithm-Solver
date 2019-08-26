import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Clipboard } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements';

export class LegendreSymbol extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('title', 'Some default title'),
			headerTintColor: '#099a97',
			headerTitleStyle: {color:'black'},
			headerForceInset: {vercical: 'never'},
		};
	};

	state = {
		input: '',
		input2:'',
		output: '',
		clipboardContent: null
	};

	readFromClipboard = async () => {
		//To get the text from clipboard
		const clipboardContent = await Clipboard.getString();
		this.setState({ clipboardContent });
	};
	writeToClipboard = async () => {
		//To copy the text to clipboard
		await Clipboard.setString(this.state.output);
		//alert('Copied to Clipboard!');
	};

	LegendreSymbol = () => {
		let n=this.state.input;
		let k;
		if (k == undefined) {
      var sum=0;
      for (var i=1; i<=n; i++) {
         sum += LegendreSymbol(n,i);
      }
      return sum;
   }
   if ((n == 0) || (n == 1)) { return 1; } // base cases, {0} and {1}
   if ((k == 1) || (n == k)) { return 1; } // base cases, {1+1+...} and {n}
   var sum = 0;
   for (var i=1; i<=Math.min(k,n-k); i++) {
      sum += LegendreSymbol(n-k,i);
   }
	

		const res = "" + sum;
		this.setState({ output: res });

	}

	render() {
		return (
			<View style={styles.containerStyle}>
				<View style={{ alignSelf: 'center' }}>
					<Image
						source={require('../images/legendre.png')}
						style={{ width: 150,height:30, resizeMode:'contain'}}
						
					/>
				</View>
				<Text style={styles.titleStyle}>Input</Text>
				<View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
					<View style={styles.viewStyle}>
						<TextInput
							placeholder="Enter your numerator a"
							value={this.state.input}
							onChangeText={(text) => this.setState({ input: text })}
							style={{ height: 30, borderColor: 'gray', width: 220, padding: 5, marginHorizontal: 10, fontSize: 15 }}
							keyboardType='numeric'
						/>
						<Icon
							reverse
							//containerStyle={{marginRight:10}}
							name='x'
							type='octicon'
							size={10}
							color='grey'
							onPress={() => { this.setState({ input: '', output: '' }) }}
						/>
					</View>
				</View>

				<View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
					<View style={styles.viewStyle}>
						<TextInput
							placeholder="Enter your denominator p"
							value={this.state.input2}
							onChangeText={(text1) => this.setState({ input2: text1 })}
							style={{ height: 30, borderColor: 'gray', width: 220, padding: 5, marginHorizontal: 10, fontSize: 15 }}
							keyboardType='numeric'
						/>
						<Icon
							reverse
							//containerStyle={{marginRight:10}}
							name='x'
							type='octicon'
							size={10}
							color='grey'
							onPress={() => { this.setState({ input2: '', output: '' }) }}
						/>
					</View>
				</View>

				<Button
					title="Apply"
					type="clear"
					titleStyle={{ fontSize: 15, color:'#099a97'}}
					buttonStyle={{ borderWidth: 1, borderRadius: 7, marginLeft: 10, width: 100, marginBottom: 10, borderColor:'#099a97' }}
					onPress={this.LegendreSymbol}
				/>

				<Text style={styles.titleStyle}>Legendre Symbol</Text>
				<View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
					<View style={styles.viewStyle}>
						<TextInput
							placeholder="+1/-1"
							value={this.state.output}
							style={{ width: 258, padding: 5, marginHorizontal: 10, fontSize: 15 }}
							keyboardType='numeric'
						/>
					</View>
					<Button
						title="Copy"
						type="clear"
						titleStyle={{ fontSize: 15 }}
						buttonStyle={{ borderWidth: 1, borderRadius: 7, marginLeft: 10 }}

						onPress={this.writeToClipboard}
					/>
				</View>
			</View>


		)
	}
}

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		justifyContent: 'flex-start',
		flexDirection: 'column',
		borderWidth: 1,
		position: 'relative',
		padding: 5
	},
	titleStyle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginLeft: 5
	},
	viewStyle: {
		flexDirection: 'row',
		borderWidth: 1,
		borderRadius: 7,
		alignItems: 'center',
		height: 35,
		borderColor: 'grey',


	}
});