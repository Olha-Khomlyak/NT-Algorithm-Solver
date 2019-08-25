import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Clipboard, ScrollView } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

export class Rooting extends React.Component {
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
		output2: '',
		output3: '',
		clipboardContent: null
	};

	readFromClipboard = async () => {
		//To get the text from clipboard
		const clipboardContent = await Clipboard.getString();
		this.setState({ clipboardContent });
	};
	writeToClipboard = async (value) => {
		//To copy the text to clipboard
		await Clipboard.setString(value);
		//alert('Copied to Clipboard!');
	};

	Rooting = () => {
		let n = this.state.input;
		let k = this.state.input2;

		let w = '';

		if (n == '') {
			this.setState({ output: w, output2: k, output3: k });
			return;
		}

		var r2 = Math.sqrt(n);

		const res = "" + r2;
		this.setState({ output: res });

		var r3 = Math.cbrt(n);

		const res2 = "" + r3;
		this.setState({ output2: res2 });

		var res3 = '';
		if (k == '') {
			this.setState({ output3: w })
		}
		else {
			res3 = Math.pow(n, 1 / k);
		}


		const resK = "" + res3;
		this.setState({ output3: resK });

	}

	render() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
				<View style={styles.containerStyle}>
					<View style={{ alignSelf: 'center' }}>
						<Image
							source={require('../images/rooting.png')}
							style={{ width: 250, height: 30, resizeMode: 'contain' }}

						/>
					</View>
					<Text style={styles.titleStyle}>Input</Text>
					<Input
						key='1'
						placeholder="Enter your number N"
						value={this.state.input}
						containerStyle={{ padding: 7 }}
						inputContainerStyle={{ borderWidth: 1, paddingHorizontal: 5, borderRadius: 7 }}
						onChangeText={(text) => this.setState({ input: text })}
						keyboardType='numeric'
						rightIcon={
							<Icon
								reverse
								name='times-circle'
								color='grey'
								size={25}
								onPress={() => { this.setState({ input: '', output: '', output2: '', output3: '' }) }}
							/>
						}
					/>
					<Input
						key='2'
						placeholder="Enter your k-th power"
						value={this.state.input2}
						containerStyle={{ padding: 7 }}
						inputContainerStyle={{ borderWidth: 1, paddingHorizontal: 5, borderRadius: 7 }} onChangeText={(text) => this.setState({ input2: text })}
						keyboardType='numeric'
						rightIcon={
							<Icon
								reverse
								name='times-circle'
								color='grey'
								size={25}
								onPress={() => { this.setState({ input2: '', output3: '' }) }}
							/>
						}
					/>
					<Button
						title="Apply"
						type="clear"
						containerStyle={{ width: 60 }}
						titleStyle={{ fontSize: 15, color: '#099a97' }}
						buttonStyle={{ borderWidth: 1, borderRadius: 7, marginLeft: 10, width: 100, marginBottom: 10, borderColor: '#099a97' }}
						onPress={this.Rooting}
					/>

					<Text style={styles.titleStyle}>Roots</Text>
					<Image
						source={require('../images/rooting2.png')}
						style={{ width: 100, height: 20, resizeMode: 'contain' }}

					/>
					<View style={{ flexDirection: 'row',paddingVertical:10,  alignItems: 'center' }}>
						<View style={styles.viewStyle}>
							<Input
								editable={false}
								selectTextOnFocus={false}
								placeholder="sqrt[2]{N}"
								value={this.state.output}
								inputContainerStyle={{ borderWidth: 1,borderRadius: 7, paddingHorizontal:7}}
							/>
						</View>
						<Button
							title="Copy"
							type="clear"
							titleStyle={{ fontSize: 15, color: '#099a97' }}
							buttonStyle={{ borderWidth: 1, borderRadius: 7, borderColor: '#099a97' }}
							onPress={() => this.writeToClipboard(this.state.output)}
						/>
					</View>
					<Image
						source={require('../images/rooting3.png')}
						style={{ width: 100, height: 20, resizeMode: 'contain' }}

					/>
					<View style={{ flexDirection: 'row', paddingVertical:10, alignItems: 'center' }}>
						<View style={styles.viewStyle}>
							<Input
								editable={false}
								selectTextOnFocus={false}
								placeholder="sqrt[3]{N}"
								value={this.state.output2}
								inputContainerStyle={{ borderWidth: 1,borderRadius: 7, paddingHorizontal:7}}
							/>
						</View>
						<Button
							title="Copy"
							type="clear"
							titleStyle={{ fontSize: 15, color: '#099a97' }}
							buttonStyle={{ borderWidth: 1, borderRadius: 7, borderColor: '#099a97' }}
							onPress={() => this.writeToClipboard(this.state.output2)}
						/>
					</View>
					<Image
						source={require('../images/rooting-k.png')}
						style={{ width: 100, height: 20, resizeMode: 'contain' }}

					/>
					<View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
						<View style={styles.viewStyle}>
						<Input
								editable={false}
								selectTextOnFocus={false}
								placeholder="sqrt[k]{N}"
								value={this.state.output2}
								inputContainerStyle={{ borderWidth: 1,borderRadius: 7, paddingHorizontal:7}}
							/>
						</View>
						<Button
							title="Copy"
							type="clear"
							titleStyle={{ fontSize: 15, color: '#099a97' }}
							buttonStyle={{ borderWidth: 1, borderRadius: 7, borderColor: '#099a97' }}
							onPress={() => this.writeToClipboard(this.state.output3)}
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