import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, ScrollView } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'


Icon.loadFont();

export class CRT extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('title', 'Some default title'),
			headerTintColor: '#099a97',
			headerTitleStyle: { color: 'black' },
		};
	};

	state = {
		input1: [],
		input2: [],
		output: '',
		clipboardContent: null,
		error: '',
		shareholders: [{ name: "" }, { name: "" }]
	};

	handleShareholderNameChange = idx => evt => {
		const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
			if (idx !== sidx) return shareholder;
			return { ...shareholder, name: evt.target.value };
		});

		this.setState({ shareholders: newShareholders });
	};

	handleSubmit = evt => {
		const { name, shareholders } = this.state;
		alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
	};

	handleAddShareholder = () => {
		if (this.state.shareholders.length < 8) {
			this.setState({
				shareholders: this.state.shareholders.concat([{ name: "" }])
			});
		}

	};

	handleRemoveShareholder = idx => () => {
		if (this.state.shareholders.length > 2) {
			this.setState({
				shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
			});
		}
	};

	cleanFields = async () => {
		this.setState({
			input1: [],
			input2: [],
			output: '',
		})
	}
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

	CRT = () => {

		var rem = this.state.input1;
		var mod = this.state.input2;

		GCD = (a, b) => {

			a = Math.abs(a);
			b = Math.abs(b);
			while (b) {
				var t = b;
				b = a % b;
				a = t;

			}
			return a;
		}

		inverse = (a, m) => {

			[a, m] = [Number(a), Number(m)]
			if (Number.isNaN(a) || Number.isNaN(m)) {
				return NaN // invalid input
			}
			a = (a % m + m) % m
			if (!a || m < 2) {
				return NaN // invalid input
			}
			// find the gcd
			const s = []
			let b = m
			while (b) {
				[a, b] = [b, a % b]
				s.push({ a, b })
			}
			if (a !== 1) {
				return NaN // inverse does not exists
			}
			// find the inverse
			let x = 1
			let y = 0
			for (let i = s.length - 2; i >= 0; --i) {
				[x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)]
			}
			return (y % m + m) % m

		}
		var prod = 1;
		var k = mod.length;
		console.log(k);

		for (var i = 0; i < k; i++)
			prod = prod * mod[i]
		console.log(prod);
		var result = 0;
		for (var i = 0; i < k; i++) {
			var pp = prod / mod[i];
			result = result + rem[i] * (inverse(pp, mod[i])) * pp;
		}

		var x = result % prod;

		const res = "" + x;
		this.setState({ output: res });
	}

	render() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
				<View style={styles.containerStyle}>
					<View style={{ alignSelf: 'center' }}>
						<Image
							source={require('../images/CRT.png')}
							style={{ resizeMode: 'contain' }}
						/>
					</View>
					<Text style={styles.titleStyle}>Input</Text>

					{this.state.shareholders.map((shareholder, idx) => (
						<View key={idx + 'inputs'} style={{ flexDirection: 'row', alignItems: 'center', padding: 7 }}>
							<Text style={styles.titleStyle}>x≡</Text>
							<Input
								key={idx + '1'}
								inputStyle={{ textAlign: 'center' }}
								//placeholder="Enter your number N"
								value={this.state.input1[idx]}
								onChangeText={(value) => this.setState((prevState) => {
									const input1 = prevState.input1;
									input1[idx] = value;
									return { ...prevState, input1: input1 };
								})}
								containerStyle={{ marginRight: "-65%" }}
								inputContainerStyle={{ borderWidth: 1, borderRadius: 7, width: 100 }}
								keyboardType='numeric'
							/>
							<Text style={styles.titleStyle}>mod</Text>
							<Input
								key={idx + '2'}
								inputStyle={{ textAlign: 'center' }}
								//placeholder="Enter your number N"
								value={this.state.input2[idx]}
								onChangeText={(value) => this.setState((prevState) => {
									const input2 = prevState.input2;
									input2[idx] = value;
									return { ...prevState, input2: input2 };
								})}							//containerStyle={{ padding: 7 }}
								inputContainerStyle={{ borderWidth: 1, width: 100, borderRadius: 7 }}
								keyboardType='numeric'
							/>
						</View>
					))}
					<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

							<Icon.Button
								name='plus-circle'
								color='#099a97'
								size={40}
								backgroundColor='transparent'
								iconStyle={{marginRight:0}}
								onPress={this.handleAddShareholder} />
							<Icon.Button
								name='minus-circle'
								color='#099a97'
								size={40}
								backgroundColor='transparent'
								iconStyle={{marginRight:0}}
								onPress={this.handleRemoveShareholder(this.state.shareholders.length - 1)} />
					</View>


						<View style={{ flexDirection: "row" }}>
							<Button
								title="Apply"
								type="clear"
								raised={true}
								titleStyle={{ fontSize: 15, color: '#099a97' }}
								containerStyle={{ width: 100 }}
								buttonStyle={{ borderWidth: 1, borderRadius: 7, marginHorizontal: 10, marginBottom: 10, borderColor: '#099a97' }}
								onPress={this.CRT}
							/>

							<Button
								title="Clear"
								type="clear"
								raised={true}
								titleStyle={{ fontSize: 15, color: '#099a97' }}
								containerStyle={{ width: 100 }}
								buttonStyle={{ borderWidth: 1, borderRadius: 7, marginBottom: 10, borderColor: '#099a97' }}
								onPress={this.cleanFields}
							/>

						</View>
						<Text style={styles.titleStyle}>Solution</Text>
						<View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
							<View style={styles.viewStyle}>

								<Input
									key='output'
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