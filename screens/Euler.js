import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Clipboard, ScrollView } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

export class Euler extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('title', 'Some default title'),
			headerTintColor: '#099a97',
			headerTitleStyle: { color: 'black' },
		};
	};

	state = {
		input: '',
		output: '',
		clipboardContent: null,
		error: '',
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
	EULER = () => {
		let n = this.state.input;
		let result = n;
		for (var p = 2; p * p <= n; ++p) {


			if (n % p === 0) {
				while (n % p === 0)
					n = n / p;
				result = result - result / p;



			}
		}
		if (n > 1)
			result = result - result / n;
		const res = "" + result;
		this.setState({ output: res });
	}

	render() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
				<View style={styles.containerStyle}>
					<View style={{ alignSelf: 'center' }}>
						<Image
							source={require('../images/eulerFunction.png')}
							style={{ resizeMode: 'contain' }}
						/>
					</View>
					<Text style={styles.titleStyle}>Input</Text>
					<Input
						placeholder="Enter your number N"
						value={this.state.input}
						onChangeText={(text) => this.setState({ input: text })}
						containerStyle={{ padding: 7 }}
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
						raised={true}
						titleStyle={{ fontSize: 15, color: '#099a97' }}
						containerStyle={{ width: 60 }}
						buttonStyle={{ borderWidth: 1, borderRadius: 7, marginLeft: 10, width: 100, marginBottom: 10, borderColor: '#099a97' }}
						onPress={this.EULER}
					/>
					<Text style={styles.titleStyle}>Euler's Totient</Text>
					<View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
						<View style={styles.viewStyle}>

							<Input
								editable={false}
								selectTextOnFocus={false}
								//placeholder="Euler's Totient"
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
		flex: 1,
		flexDirection: 'row',


	}
});