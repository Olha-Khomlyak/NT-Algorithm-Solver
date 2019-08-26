import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Clipboard, Keyboard, ScrollView } from 'react-native'
import { Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

export class Exponentiation extends React.Component {
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
		await Clipboard.setString(this.state.output);
		//alert('Copied to Clipboard!');
	};

	Exponentiation = () => {
		let a = this.state.input;
		let b = this.state.input2;
		let w = '';

		if (a == '' || b == '') {
			this.setState({ output: w })
			return;
		}

		const e = Math.pow(a, b)

		const res = "" + e;
		this.setState({ output: res });

	}

	render() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
				<View style={styles.containerStyle}>
					<View style={{ alignSelf: 'center' }}>
						<Image
							source={require('../images/exponentiation.png')}
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
						inputContainerStyle={{ borderWidth: 1, paddingHorizontal: 5, borderRadius: 7 }}
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
						containerStyle={{ paddingVertical: 7 }}
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

					<Text style={styles.titleStyle}>Exponentiation</Text>
					<View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
						<View style={styles.viewStyle}>
							<Input
								editable={false}
								selectTextOnFocus={false}
								placeholder="N^a"
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