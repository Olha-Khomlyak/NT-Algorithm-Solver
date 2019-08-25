import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Clipboard, ScrollView } from 'react-native'
import { Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

export class ModularExponentiation extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('title', 'Some default title'),
			headerTintColor: '#099a97',
			headerTitleStyle: { color: 'black' },
		};
	};

	state = {
		input: '',
		input2: '',
		input3: '',
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

	Exponentiation = () => {
		let a = this.state.input;
		let b = this.state.input2;
		let n = this.state.input3;

		let w = '';

		if (a == '' || b == '' || n == '') {
			this.setState({ output: w })
			return;
		}

		var res = 1;
		a = a % n;
		while (b > 0) {
			if (b % 2 === 1) {
				res = (res * a) % n;
			}
			b = b >> 1;
			a = (a * a) % n;
		}

		const res1 = "" + res;
		this.setState({ output: res1 });

	}

	render() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
				<View style={styles.containerStyle}>
					<View style={{ alignSelf: 'center' }}>
						<Image
							source={require('../images/modExpo.png')}
							style={{ width: 150, height: 30, resizeMode: 'contain' }}

						/>
					</View>

					{/* 

INPUT

*/}
					<Text style={styles.titleStyle}>Input</Text>
					<Input
						placeholder="Enter your base N"
						value={this.state.input}
						onChangeText={(text) => this.setState({ input: text })}
						containerStyle={{ paddingVertical: 7 }}
						inputContainerStyle={{ borderWidth: 1, borderRadius: 5, paddingHorizontal: 7 }}
						keyboardType='numeric'
						rightIcon={
							<Icon
								reverse
								name='times-circle'
								color='grey'
								size={25}
								onPress={() => { this.setState({ input: '', output: '' }) }}
							/>
						}
					/>
					<Input
						placeholder="Enter your exponent a"
						value={this.state.input2}
						onChangeText={(text1) => this.setState({ input2: text1 })}
						containerStyle={{ paddingBottom: 7 }}
						inputContainerStyle={{ borderWidth: 1, paddingHorizontal: 5, borderRadius: 7 }}
						keyboardType='numeric'
						rightIcon={
							<Icon
								reverse
								name='times-circle'
								color='grey'
								size={25}
								onPress={() => { this.setState({ input2: '', output: '' }) }}
							/>
						}
					/>
					<Input
						placeholder="Enter your base N"
						value={this.state.input3}
						onChangeText={(text1) => this.setState({ input3: text1 })}
						containerStyle={{ paddingVertical: 7 }}
						inputContainerStyle={{ borderWidth: 1, paddingHorizontal: 5, borderRadius: 7 }}
						keyboardType='numeric'
						rightIcon={
							<Icon
								reverse
								name='times-circle'
								color='grey'
								size={25}
								onPress={() => { this.setState({ input3: '', output: '' }) }}
							/>
						}
					/>
					<Button
						title="Apply"
						type="clear"
						containerStyle={{ width: 60 }}
						titleStyle={{ fontSize: 15, color: '#099a97' }}
						buttonStyle={{ borderWidth: 1, borderRadius: 7, marginLeft: 10, width: 100, marginBottom: 10, borderColor: '#099a97' }}
						onPress={this.Exponentiation}
					/>
					{/* 

OUTPUT

*/}
					<Text style={styles.titleStyle}>Modular Exponentiation</Text>
					<View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
						<View style={styles.viewStyle}>
							<Input
								editable={false}
								selectTextOnFocus={false}
								placeholder="a^b(mod n)"
								value={this.state.output}
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