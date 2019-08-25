import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Clipboard, ScrollView } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

export class Logarithm extends React.Component {
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
		output4: '',
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

	Logarithm = () => {
		let a = this.state.input;
		let b = this.state.input2;

		let w = '';


		var base2 = Math.log2(a);

		const res = "" + base2;
		this.setState({ output: res });

		var basee = Math.log(a);

		const res2 = "" + basee;
		this.setState({ output2: res2 });

		var base10 = Math.log10(a);

		const res3 = "" + base10;
		this.setState({ output3: res3 });

		var basen = '';
		if (b == '') {
			this.setState({ output4: w });
		}
		else {
			basen = Math.log(a) / Math.log(b);
		}
		const res4 = "" + basen;
		this.setState({ output4: res4 });



	}

	render() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
				<View style={styles.containerStyle}>
					<View style={{ alignSelf: 'center' }}>
						<Image
							source={require('../images/logarithm.png')}
							style={{ width: 250, height: 30, resizeMode: 'contain' }}

						/>
					</View>
					{/* 

INPUT

*/}
					<Text style={styles.titleStyle}>Input</Text>
					<Input
						key='1'
						placeholder="Enter your number a"
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
								onPress={() => { this.setState({ input: '', output: '', output2: '', output3: '', output4: '' }) }}
							/>
						}
					/>

					<Input
						key='2'
						placeholder="Enter your base b"
						value={this.state.input2}
						onChangeText={(text) => this.setState({ input2: text })}
						containerStyle={{ paddingBottom: 7 }}
						inputContainerStyle={{ borderWidth: 1, paddingHorizontal: 5, borderRadius: 7 }}
						keyboardType='numeric'
						rightIcon={
							<Icon
								reverse
								name='times-circle'
								color='grey'
								size={25}
								onPress={() => { this.setState({ input2: '', output4: '' }) }}
							/>
						}
					/>

					<Button
						title="Apply"
						type="clear"
						containerStyle={{ width: 60 }}
						titleStyle={{ fontSize: 15, color: '#099a97' }}
						buttonStyle={{ borderWidth: 1, borderRadius: 7, marginLeft: 10, width: 100, marginBottom: 10, borderColor: '#099a97' }}
						onPress={this.Logarithm}
					/>

					{/* 

OUTPUT

*/}

					<Text style={styles.titleStyle}>Logarithms</Text>
					<Image
						source={require('../images/logarithm-b2.png')}
						style={{ width: 100, height: 20, resizeMode: 'contain' }}

					/>
					<View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
						<View style={styles.viewStyle}>
							<Input
								editable={false}
								selectTextOnFocus={false}
								placeholder="log _{2} a"
								value={this.state.output}
								inputContainerStyle={{ borderWidth: 1, borderRadius: 7, paddingHorizontal: 7 }}
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
						source={require('../images/logarithm-be.png')}
						style={{ width: 100, height: 20, resizeMode: 'contain' }}

					/>
					<View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
						<View style={styles.viewStyle}>
							<Input
								editable={false}
								selectTextOnFocus={false}
								placeholder="log _{e} a"
								value={this.state.output2}
								inputContainerStyle={{ borderWidth: 1, borderRadius: 7, paddingHorizontal: 7 }}
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
						source={require('../images/logarithm-b10.png')}
						style={{ width: 100, height: 20, resizeMode: 'contain' }}

					/>
					<View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
						<View style={styles.viewStyle}>
							<Input
								editable={false}
								selectTextOnFocus={false}
								placeholder="log _{10} a"
								value={this.state.output3}
								inputContainerStyle={{ borderWidth: 1, borderRadius: 7, paddingHorizontal: 7 }}
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
					<Image
						source={require('../images/logarithm.png')}
						style={{ width: 100, height: 20, resizeMode: 'contain' }}

					/>
					<View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
						<View style={styles.viewStyle}>
							<Input
								editable={false}
								selectTextOnFocus={false}
								placeholder="log _{b} a"
								value={this.state.output4}
								inputContainerStyle={{ borderWidth: 1, borderRadius: 7, paddingHorizontal: 7 }}
							/>
						</View>
						<Button
							title="Copy"
							type="clear"
							titleStyle={{ fontSize: 15, color: '#099a97' }}
							buttonStyle={{ borderWidth: 1, borderRadius: 7, borderColor: '#099a97' }}
							onPress={() => this.writeToClipboard(this.state.output4)}
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