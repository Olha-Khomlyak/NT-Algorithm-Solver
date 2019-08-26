import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Clipboard, ScrollView } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

export class Euclid extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('title', 'Some default title'),
			headerTintColor: '#099a97',
			headerTitleStyle: { color: 'black' },
			headerForceInset: {vercical: 'never'},
		};
	};

	state = {
		input: '',
		input2: '',
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
		await Clipboard.setString(this.state.output4);
		//alert('Copied to Clipboard!');
	};

	EUCLID = () => {
		let a = this.state.input;
		let b = this.state.input2;
		var quot, a1 = 1, b1 = 0, a2 = 0, b2 = 1, aneg = 1, bneg = 1, result = new Array;
		if (a < 0) { a = -a; aneg = -1; };
		if (b < 0) { b = -b; bneg = -1; };
		if (b > a) { temp = a; a = b; b = temp; };
		while (b > 0) {
			quot = -Math.floor(a / b);
			a %= b;
			a1 += quot * a2; b1 += quot * b2;
			if (a == 0) { result[0] = b2; result[1] = a2; result[2] = b * bneg; }
			quot = -Math.floor(b / a);
			b %= a;
			a2 += quot * a1; b2 += quot * b1;
			if (b == 0) { result[0] = b1; result[1] = a1; result[2] = a * aneg; }
		}

		const res = "" + result[0];
		const res2 = "" + result[1];
		const res3 = "" + result[2];
		const res4="" + result;
		const output = this.state.input + " * (" + res2 + ") + " + this.state.input2 + " * (" + res + ") = " + res3;
		this.setState({ output: output });
		this.setState({ output1: res2 });
		this.setState({ output2: res });
		this.setState({ output3: res3 });
		this.setState({ output4: res4 });
		return result;
	}

	render() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
				<View style={styles.containerStyle}>
					<View style={{ alignSelf: 'center' }}>
						<Image
							source={require('../images/euclid.png')}
							style={{  width:300, resizeMode: 'contain' }}

						/>
					</View>
					{/* 
				
				INPUT
				
				*/}
					<Text style={styles.titleStyle}>Input</Text>

					<Input
						placeholder="Enter your number x"
						value={this.state.input}
						onChangeText={(text) => this.setState({ input: text })}
						containerStyle={{ paddingVertical: 7 }}
						inputContainerStyle={{ borderWidth: 1, paddingHorizontal: 5, borderRadius: 7 }}
						keyboardType='numeric'
						rightIcon={
							<Icon
								reverse
								name='times-circle'
								color='grey'
								size={25}
								onPress={() => { this.setState({ input: '', output: '', output1:'',output2:'',output3:''}) }}
							/>
						}
					/>
					<Input
						placeholder="Enter your number y"
						value={this.state.input2}
						onChangeText={(text1) => this.setState({ input2: text1 })}
						containerStyle={{ paddingVertical: 7 }}
						inputContainerStyle={{ borderWidth: 1, paddingHorizontal: 5, borderRadius: 7 }}
						keyboardType='numeric'
						rightIcon={
							<Icon
								reverse
								name='times-circle'
								color='grey'
								size={25}
								onPress={() => { this.setState({ input2: '', output: '', output1:'',output2:'',output3:'' }) }}
							/>
						}
					/>

					<Button
						title="Apply"
						type="clear"
						containerStyle={{ width: 60 }}
						titleStyle={{ fontSize: 15, color: '#099a97' }}
						buttonStyle={{ borderWidth: 1, borderRadius: 7, marginLeft: 10, width: 100, marginBottom: 10, borderColor: '#099a97' }}
						onPress={this.EUCLID}
					/>
					{/* 

OUTPUT

*/}
					<Text style={styles.titleStyle}>Coefficients of Bézout's identity</Text>

					<View style={{ flexDirection: 'row', alignItems: 'center', padding: 7 }}>
						<Text style={styles.titleStyle}>a=</Text>
						<Input
							editable={false}
							selectTextOnFocus={false}
							value={this.state.output1}
							inputStyle={{ textAlign: 'center' }}
							containerStyle={{ marginRight: "-66%" }}
							inputContainerStyle={{ borderWidth: 1, borderRadius: 7, width: 100, alignItems: 'center' }}
							keyboardType='numeric'
						/>
						<Text style={styles.titleStyle}>b=</Text>
						<Input
							editable={false}
							selectTextOnFocus={false}
							inputStyle={{ textAlign: 'center' }}
							value={this.state.output2}
							containerStyle={{ marginRight: "-76%" }}
							inputContainerStyle={{ borderWidth: 1, width: 100, borderRadius: 7 }}
							keyboardType='numeric'
						/>
					</View>
					<Text style={styles.titleStyle}>Greatest Common Divisor</Text>
					<View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
						<View style={styles.viewStyle}>
							<Input
								editable={false}
								selectTextOnFocus={false}
								placeholder="GCD(x,y)"
								value={this.state.output3}
								inputContainerStyle={{ borderWidth: 1, borderRadius: 7, paddingHorizontal: 7 }}
							/>
						</View>
						<Button
							title="Copy"
							type="clear"
							titleStyle={{ fontSize: 15, color: '#099a97' }}
							buttonStyle={{ borderWidth: 1, borderRadius: 7, borderColor: '#099a97' }}

							onPress={this.writeToClipboard}
						/>
					</View>
				</View>
			</ScrollView>


		)
	}
}

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		justifyContent: 'flex-start',
		flexDirection: 'column',
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
		flex: 1

	}
});