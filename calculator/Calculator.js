import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

nums = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], [".", '0', "="]]
operations = [ '+', '-', '*', '/']

export default class Calculator extends Component {
	constructor() {
		super()
		this.state = {
			expression: '0',
			currentInput: '',
			calculationText: "",
			isDotPressedBefore: false,
			clipboardContent: null
		}
	}

	calculateResult() {
		const text = this.state.expression
		console.log(text, eval(text))
		console.log('res==>', text)
		let res = + eval(text)
		console.log('result==>', res)
		this.setState({
			calculationText: res
		})
	}
	readFromClipboard = async () => {
		//To get the text from clipboard
		const clipboardContent = await Clipboard.getString();
		this.setState({ clipboardContent });
	};
	writeToClipboard = async () => {
		//To copy the text to clipboard
		await Clipboard.setString(this.state.calculationText);
		console.log('i copy')
		//alert('Copied to Clipboard!');
	};

	validate() {
		const text = this.state.expression
		switch (text.slice(-1)) {
			case '+':
			case '-':
			case '*':
			case '/':
				return false

		}
		return true
	}

	validateInput(num) {
		console.log('buttonPressed=>', num)
		console.log('currentstate', this.state.expression);
		const { expression } = this.state;
		const len = expression.length;
		let currentInput = len? expression[len-1]: "";

		if(!currentInput) {
			currentInput = num;
			const expression = this.state.expression + num;

			console.log('new expression=>', currentInput);
			this.setState({ currentInput, expression })
		}



		switch (num) {
			case '.':
				console.log('dot pressed')
				if (currentInput.includes('.')) {
					console.log('Dot pressed again!')
					break;
				} else {
					console.log('Dot pressed 1st time!')
					const currentInput = this.state.currentInput + num;
					const expression = this.state.expression + num;

					console.log('new expression=>', currentInput);
					this.setState({ currentInput, expression })
				}
				break;
			case '=':
				return this.validate() && this.calculateResult();
			case '0':
				if (this.state.currentInput === '0') {
					break;
				} else {
					const expression = this.state.expression + num;
					const currentInput = this.state.currentInput + num;

					console.log('new expression=>', expression);
					this.setState({ currentInput, expression });
				}
			default:
				console.log('default case');
				if (this.state.expression === '0') {
					this.setState({ expression: num, currentInput: num });
				} else {
					const expression = this.state.expression + num;
					const currentInput = this.state.currentInput + num;
					console.log('new expression=>', expression);
					this.setState({ currentInput, expression });
				}
				break;

		}

	}



	operate(operation) {
	
		switch (operation) {
			case 'del':
				let text = this.state.expression.split('')
				text.pop()
				this.setState({
					expression: text.join('')
				})
				break;
			case '+':
			case '-':
			case '*':
			case '/':

				const lastChar = this.state.expression.split('').pop()
				console.log('lastchar===>', lastChar)
				if (this.operations.indexOf(lastChar) > 0) return

				if (this.state.text == "") return
				this.setState({
					expression: this.state.expression + operation
				})
		}

	}

	DELETE = () => {
		const { expression, currentInput } = this.state;
		const lastChar = expression.pop();
		if(number) {
			this.setState({
				expression,
				currentInput: currentInput.pop()
			})
		 } else {
				const index = this.state.expression.lastIndexOf(lastChar);
				this.setState({
					currentInput: this.state.expression.substring(index)
				})
			}

		this.setState({ currentInput: '' });
	
		let text = this.state.expression.split('')
				let dot = text.pop();

				if (dot === '.') this.setState({ isDotPressedBefore: false })

				this.setState({
					expression: text.join('')
				})
	}




	render() {
		let rows = []
	//	let nums = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], [".", '0', "="]]

		for (let i = 0; i < 4; i++) {
			let row = []
			for (let j = 0; j < 3; j++) {
				row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.validateInput(nums[i][j])} style={styles.btn}>
					<Text style={styles.bnttext}>{nums[i][j]}</Text>
				</TouchableOpacity>)
			}
			rows.push(<View key={i} style={styles.row}>{row}</View>)
		}


		let ops = []
		for (let i = 0; i < operations.length; i++) {
			ops.push(
				<TouchableOpacity key={operations[i]} onPress={() => this.operate(operations[i])} style={styles.btn}>
					<Text style={[styles.bnttext, styles.white]}>{operations[i]}</Text>
				</TouchableOpacity>
			)
		}

		return (
			<View style={styles.container}>
				<View style={styles.result}>
					<Text style={styles.expression}>
						{this.state.expression}
					</Text>
				</View>
				<View style={styles.calculation}>
					<Text style={styles.calculationText}>{this.state.calculationText}</Text>
				</View>
				<View style={{flexDirection:'row', justifyContent:'space-evenly',backgroundColor:'#099a97', borderBottomWidth:0.5}}>
						<Button 
							title="Copy" 
							buttonStyle={{height:50,width:125,backgroundColor:'#005f5d', borderRadius:0,borderRightWidth:0.5, borderColor:'black'}}
							onPress={this.writeToClipboard}
						 />
						 	<Button 
						title="Clear" 
						buttonStyle={{height:50, width:125,backgroundColor:'#005f5d', borderRadius:0,borderRightWidth:0.5, borderColor:'black'}}
						onPress={() => { this.setState({ expression: '', calculationText: '' }) }}
						 />
						 	<Button 
						title="DEL" 
						buttonStyle={{height:50, width:125,backgroundColor:'#005f5d', borderRadius:0}}
						onPress={this.DELETE}
						 />
						</View>
				<View style={styles.buttons}>
					<View style={styles.numbers}>
						{rows}
					</View>
					<View style={styles.operations}>
						{ops}
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	row: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
	
	},
	bnttext: {
		fontSize: 30,
		color:'white',

	},
	white: {
		color: 'white'
	},
	btn: {
		flex: 1,
		alignItems: 'center',
		alignSelf: 'stretch',
		justifyContent: 'center',
		borderLeftWidth:0.5,
		borderBottomWidth:0.5
	},
	expression: {
		fontSize: 30,
		color: '#4d5561',
	},
	calculationText: {
		fontSize: 35,
		color: 'black',
	},
	result: {
		flex: 2,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	calculation: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	buttons: {
		flex: 6,
		flexDirection: 'row',

		
	},
	numbers: {
		flex: 3,
		backgroundColor: '#099a97'
	},
	operations: {
		flex: 1,
		backgroundColor: '#4d5561',
		alignItems: 'center',
		justifyContent: "space-around",
		borderBottomWidth:0.5

	}
})