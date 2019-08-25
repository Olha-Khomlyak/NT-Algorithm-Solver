import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Clipboard, ScrollView } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

export class PrimeTest extends React.Component {
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

	PrimeTest = () => {
		let n = this.state.input;

		if (n == '') {
			this.setState({ output: '' });
			return;
		}

		let prime = true;
		let r = '';
		let c = '';

		for (let i = 2; i <= Math.sqrt(n); i++) {
			if (n % i === 0) {
				prime = false;
				break;
			}
		}
		r = prime && (n > 1);
		if (r) {
			c = 'Prime';
		}
		else {
			c = 'Not Prime'
		}

		const res = "" + c;
		this.setState({ output: res });

	}

	render() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
				<View style={styles.containerStyle}>
					<View style={{ alignSelf: 'center' }}>
					</View>
					{/* 

INPUT

*/}
					<Text style={styles.titleStyle}>Input</Text>
					<Input
						placeholder="Enter your number N"
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
					<Button
						title="Apply"
						type="clear"
						containerStyle={{ width: 60 }}
						titleStyle={{ fontSize: 15, color: '#099a97' }}
						buttonStyle={{ borderWidth: 1, borderRadius: 7, marginLeft: 10, width: 100, marginBottom: 10, borderColor: '#099a97' }}
						onPress={this.PrimeTest}
					/>

					{/* 

OUTPUT

*/}

					<Text style={styles.titleStyle}>Is N prime?</Text>
					<View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
						<View style={styles.viewStyle}>
							<Input
								editable={false}
								selectTextOnFocus={false}
								placeholder="Prime/Not Prime"
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